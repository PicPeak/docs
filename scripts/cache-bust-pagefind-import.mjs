import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'

const outDir = 'out'
const chunksDir = join(outDir, '_next', 'static', 'chunks')
const importPath = '/_pagefind/pagefind.js'

function walk(dir) {
  const entries = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) entries.push(...walk(fullPath))
    else entries.push(fullPath)
  }
  return entries
}

function gitShortSha() {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch {
    return String(Date.now())
  }
}

if (!existsSync(chunksDir)) {
  throw new Error(`${chunksDir} does not exist`)
}

const cacheBust = process.env.PAGEFIND_CACHE_BUST || gitShortSha()
const chunkFiles = walk(chunksDir).filter((file) => {
  return file.endsWith('.js') && readFileSync(file, 'utf8').includes(importPath)
})

if (chunkFiles.length === 0) {
  throw new Error(`Could not find a built chunk importing ${importPath}`)
}

const replacements = new Map()

for (const chunkFile of chunkFiles) {
  const ext = extname(chunkFile)
  const oldBase = basename(chunkFile)
  const newBase = oldBase.replace(ext, `.pagefind-${cacheBust}${ext}`)
  const newPath = join(dirname(chunkFile), newBase)
  const patched = readFileSync(chunkFile, 'utf8').replaceAll(importPath, `${importPath}?v=${cacheBust}`)

  writeFileSync(newPath, patched)
  replacements.set(oldBase, newBase)
}

for (const file of walk(outDir)) {
  const stat = statSync(file)
  if (stat.size > 5_000_000) continue

  let contents
  try {
    contents = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  let next = contents
  for (const [oldBase, newBase] of replacements) {
    next = next.replaceAll(oldBase, newBase)
  }

  if (next !== contents) {
    writeFileSync(file, next)
  }
}

console.log(`[pagefind-cache-bust] cacheBust=${cacheBust} chunks=${chunkFiles.length}`)

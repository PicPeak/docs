# Contributing to PicPeak Documentation

Thanks for considering a contribution. This repo holds the source for [docs.picpeak.app](https://docs.picpeak.app) — any landed change ships to the live docs site.

For application code contributions (backend, frontend, API), see the main repo: [`PicPeak/picpeak`](https://github.com/PicPeak/picpeak). This guide covers **documentation contributions only**.

## What kinds of contributions are welcome

- **Typo / clarity fixes** — small, single-purpose PRs are perfect
- **Missing examples** — concrete `docker-compose.yml` snippets, command sequences, screenshots
- **New pages** — coverage gaps for existing features
- **Outdated content fixes** — links, version numbers, screenshots that no longer match the UI
- **Restructuring proposals** — open an issue first to discuss scope before opening a large PR

## Branch model

- **`main`** is the published branch. Merging to `main` ships to docs.picpeak.app.
- **Feature branches** are named freely (e.g. `docs/customer-accounts`, `fix/api-events-typo`). Open a PR against `main`.
- There's no separate `stable` branch here — docs roll forward continuously alongside the application's beta channel.

## Running the docs locally

Requires Node.js 22+.

```bash
git clone https://github.com/PicPeak/docs.git
cd docs
npm install
npm run dev          # http://localhost:3000, hot reload on save
```

Hit any page you're editing in the browser; Nextra rerenders on save.

To produce the same static export the deploy hook builds:

```bash
npm run build
```

Output lives in `./out/`. If your edit breaks the build (e.g. broken MDX), `npm run build` is the loudest signal.

## File organization

```
app/
├── page.mdx                              # / (the homepage)
├── _meta.js                              # top-level nav: order + labels
├── getting-started/
│   ├── _meta.js                          # section nav
│   ├── quick-start/page.mdx              # /getting-started/quick-start
│   └── ...
├── features/
├── deployment/
├── guides/
├── api/
└── contributing/                         # in-site contributing page (different from THIS file)
```

**Routing rule:** the file path under `app/` (minus `page.mdx`) is the URL. `app/deployment/docker/page.mdx` → `/deployment/docker`.

**Navigation control:** every directory needs an `_meta.js` listing its pages in display order. Without it, Nextra falls back to alphabetical, which is rarely what you want.

```js
// app/<section>/_meta.js — example
export default {
  'quick-start': 'Quick Start',
  'first-login': 'First Login',
  'installation': 'Installation',
}
```

## MDX style notes

- **Headings**: sentence case (`## Customer accounts`, not `## Customer Accounts`).
- **Code blocks**: always tag the language for syntax highlighting:
  ```` ```yaml ```` for compose / k8s, ```` ```bash ```` for shell, ```` ```js ```` for code, ```` ```sql ```` for SQL.
- **Inline code**: backticks for `commands`, `paths/to/files`, environment variables like `DATABASE_URL`, and field names like `customer_email`.
- **Links to other docs pages**: use relative paths from the current page, e.g. `[deployment](/deployment/docker)`.
- **External links**: open in same tab (Nextra handles `target="_blank"` for `http*` URLs automatically when needed).
- **Callouts**: GitHub-flavored alerts work — `> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`.
- **Images**: place in `public/images/`, reference as `/images/filename.png`. Always include an `alt` attribute.

## Images and screenshots

- Drop into `public/images/`. The build copies everything in `public/` to the site root.
- Prefer PNG for screenshots (lossless, crisp UI text). JPEG only for photos.
- Keep widths reasonable — most docs pages render in a column ~720 px wide, so 1440 px max width is plenty (2x for retina). Anything wider just bloats the page weight.
- Reference: `<img src="/images/your-screenshot.png" alt="Descriptive alt text" />`. Nextra inlines images cleanly.

## PR process

1. Fork the repo on GitHub.
2. Create a branch from `main`. Name it after the change — `docs/customer-accounts-page`, `fix/typo-quick-start`, etc.
3. Make your edits. Run `npm run build` locally to catch broken MDX before you push.
4. Open a PR against `PicPeak/docs:main`. Use the PR template to describe what changed and link any related issue.
5. A maintainer reviews. Documentation PRs are usually fast to merge if they're focused.
6. On merge, the deploy hook republishes docs.picpeak.app automatically.

### What makes a good docs PR

- **One change per PR.** A typo fix and a new page should be two PRs.
- **Clear before/after**, if you're correcting outdated content.
- **Screenshots updated** if you've changed text in the UI. Old screenshots showing renamed buttons are the worst kind of stale docs.
- **Built locally without errors** before you push. `npm run build` is the gate.

## Reporting issues (without a PR)

You don't have to write the fix yourself — opening an issue is also a contribution. Use the templates at [issues/new/choose](https://github.com/PicPeak/docs/issues/new/choose):

- **Doc bug / outdated** — something wrong, missing, or out of date
- **New topic / page request** — a feature or workflow that should be documented but isn't

For **bugs in the PicPeak application** (the backend or frontend, not the docs themselves), file on the main repo: [PicPeak/picpeak/issues](https://github.com/PicPeak/picpeak/issues/new/choose).

## Code of Conduct

This project follows the [PicPeak Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, assume good faith, focus on the work.

## License

Documentation contributions are accepted under the [MIT license](LICENSE), the same license that covers the PicPeak software itself. By opening a PR you confirm you have the right to license the contribution under MIT.

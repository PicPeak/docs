# PicPeak Documentation

> [!NOTE]
> **This repository is the source for [docs.picpeak.app](https://docs.picpeak.app).**
> Anything that lands on `main` here is published to the public docs site.

This is the docs site for **[PicPeak](https://github.com/PicPeak/picpeak)** — an open-source, self-hosted photo sharing platform for events. The site itself is a [Next.js](https://nextjs.org/) + [Nextra](https://nextra.site/) static export that builds to plain HTML and ships to docs.picpeak.app.

For the PicPeak application's source code, see [`PicPeak/picpeak`](https://github.com/PicPeak/picpeak). This repo is **content only** — no application logic.

## Run locally

Requires Node.js 22+ and npm.

```bash
git clone https://github.com/PicPeak/docs.git picpeak-docs
cd picpeak-docs
npm install
npm run dev          # http://localhost:3000 with live reload
```

Build the static site the way docs.picpeak.app does:

```bash
npm run build        # produces ./out/
```

`out/` is the static export — that's what the deploy hook publishes.

## Repository layout

```
.
├── app/                          # Next.js App Router — every page is MDX
│   ├── page.mdx                  # docs.picpeak.app homepage
│   ├── _meta.js                  # top-level nav order + labels
│   ├── getting-started/
│   ├── features/
│   ├── deployment/
│   ├── guides/
│   ├── api/
│   └── contributing/             # in-site contributing page (for PicPeak app contributors)
├── public/                       # images, favicons, static assets
├── mdx-components.jsx            # custom MDX component overrides
├── next.config.mjs               # Nextra config (static export mode)
└── package.json
```

Each subdirectory has its own `_meta.js` controlling order + labels of pages within that section.

## Where things live

| To edit... | Open... |
|---|---|
| Homepage hero / quick links | `app/page.mdx` |
| Top-level nav order or labels | `app/_meta.js` |
| Section nav (e.g. order under Deployment) | `app/<section>/_meta.js` |
| A specific guide / reference page | `app/<section>/<slug>/page.mdx` |
| Add an image | drop in `public/images/`, reference as `/images/foo.png` |

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full PR workflow, MDX style notes, and review process.

TL;DR: fork → branch from `main` → edit MDX → open PR against `main`. Lands live on docs.picpeak.app after merge.

## Reporting issues

- **Documentation bugs / outdated info / typos** — file here: [issues on this repo](https://github.com/PicPeak/docs/issues/new/choose)
- **Bugs in the PicPeak application itself** — file on the main repo: [PicPeak/picpeak issues](https://github.com/PicPeak/picpeak/issues/new/choose)

## License

[MIT](LICENSE) — same as the parent PicPeak project.

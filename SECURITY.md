# Security Policy

This repository contains **documentation only** — no application code, no runtime, no servers. The most a security-relevant issue can look like here is published content with a misleading instruction (e.g., a docs example with an insecure default).

## Reporting

- **Misleading or insecure example in the docs** — open a [doc bug issue](https://github.com/PicPeak/docs/issues/new/choose) describing what's wrong and the safer alternative. Public is fine; docs corrections aren't sensitive.
- **Vulnerabilities in the PicPeak application** (backend, frontend, API) — report to the main repo following the policy at [`PicPeak/picpeak/SECURITY.md`](https://github.com/PicPeak/picpeak/blob/main/SECURITY.md). Those reports may need to stay private until a fix ships, so the main repo's process applies.

## What this repo is not

Static documentation pages served from `docs.picpeak.app`. There's no auth, no user data, no database, no API. If you find a behaviour issue on `docs.picpeak.app` itself (e.g. broken navigation, a redirect loop, an XSS in user-supplied content — there isn't any), it's a content/build bug, not a security vulnerability — file as a regular issue.

## This project

Personal site for paulmarinos.com — Astro + Starlight, deployed to GitHub Pages via
`.github/workflows/deploy.yml` on every push to `main`. Custom domain: `www.paulmarinos.com`
(`public/CNAME`).

- **`site-structure.md`** is the content architecture and the source of truth for what gets
  written. Read it before adding content.
- **Seven pillars**, each a directory under `src/content/docs/`: `threat-intel`, `iam`,
  `appsec`, `grc`, `pentest`, `ai-automation`, `detection-eng`. The sidebar in
  `astro.config.mjs` autogenerates from these directories.
- **Frontmatter is validated** in `src/content.config.ts`. Articles must declare `pillar`,
  `contentType`, `maturity`, `updated`, and at least one `relatedTo` slug pointing *outside*
  their own pillar — the build fails otherwise. This is deliberate: it enforces the
  cross-link discipline. Pillar overview pages use `contentType: landing` and are exempt.
- **Node 22** (see `.nvmrc`). Astro 7 will not run on the system Node 18.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

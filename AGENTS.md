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

### Theme and graph plugins

- **`starlight-theme-black`** owns the design system (Geist, neutral scale, monochrome
  accent). It overrides `Head`, `Hero`, `MobileMenuToggle`, `PageTitle`, `Pagination`,
  `Sidebar`, `SiteTitle`, `ThemeSelect`. Do not override those in `astro.config.mjs` — the
  theme skips its own override and warns if you do.
- **`starlight-site-graph`** supplies the graph view and backlinks, and overrides only
  `PageSidebar`, so it composes with the theme. Graph edges are parsed from real links in
  page content, so the "How this connects" prose links *are* the edge list. Node colour and
  tags are driven per pillar from the `pillars` table in `astro.config.mjs`.
- **`patches/starlight-site-graph+0.5.0.patch`** is load-bearing. The plugin's `deepMerge`
  treats a `Map` as a plain object and flattens it to `{}`, so its own `styleRules` default
  fails validation under Astro 7 / zod v4 — the plugin does not build at all without this,
  even with empty config. Applied via `patch-package` on `postinstall`; do not remove it
  without checking whether upstream (last published Aug 2025, targeting Astro 5) has fixed it.
- **Known caveat — base paths containing a dot.** The plugin slugifies the base path when
  building node keys (`/paulmarinos.com` → `paulmarinoscom`) but not when resolving links,
  which splits the graph into two disconnected halves. This only affects the temporary
  github.io preview build; at `base: '/'` (the custom domain, and `npm run dev`) the graph is
  correct. Do not patch around it — it disappears with the custom domain.

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

## This project

Personal site for paulmarinos.com — Astro + Starlight, deployed to GitHub Pages via
`.github/workflows/deploy.yml` on every push to `main`. Custom domain: `www.paulmarinos.com`
(`public/CNAME`).

- **`site-structure.md`** is the content architecture and the source of truth for what gets
  written. Read it before adding content.
- **Ten pillars**, each a directory under `src/content/docs/`: `threat-intel`, `iam`,
  `appsec`, `grc`, `pentest`, `ai-automation`, `detection-eng`, `cloud-infra`, `dfir`, `data-privacy`. The sidebar in
  `astro.config.mjs` autogenerates from these directories.
- **`relatedTo` is enforced in two places, for two different reasons.**
  `src/content.config.ts` checks the *shape* — at least one entry outside the article's own
  pillar. `src/components/RelatedArticles.astro` checks that each target *exists* and throws
  at build time otherwise. The second check is not redundant:
  `starlight-links-validator` only inspects links written in markdown, so it never sees
  links emitted by a component.
- **Broken internal links fail the build** via `scripts/check-graph-links.mjs`, wired into
  the `build` script. The graph plugin already resolves every link and marks unmatched
  targets as sitemap nodes with `exists: false`, with `backlinks` naming the offending
  pages — so this reads that back rather than re-implementing a link checker. It is what
  actually covers relative links; see the next point for why the plugin cannot.
- **Link depth is the easiest mistake to make.** Links are relative, so depth follows page
  depth: from a pillar page (`/iam/`) use `../appsec/`; from an article (`/iam/foo/`) use
  `../../appsec/`, and `../bar/` for a sibling article. Getting this wrong silently creates
  phantom graph nodes instead of 404ing loudly — which is what `check-graph-links` catches.
- **Chrome must be excluded from graph edges.** Edges come from links in generated HTML, so
  any navigation rendered into the page body becomes a false edge. `ignoreLinksInSelectors`
  in `astro.config.mjs` therefore extends the plugin's defaults with `.slsg-backlinks-panel`
  (inbound links were being counted as outbound), `.mobile-nav` (theme-black re-renders the
  entire sidebar as a `<div>`, not a `<nav>`, so every page gained an edge to every pillar)
  and `.nav-buttons` (pagination prev/next). All three were invisible while only pillar
  pages existed, because those already link to each other. Re-check this list when adding
  any component that renders links.
- **Prose links are currently unvalidated by the plugin, and that is a known gap.** All internal links are
  written relative (`../iam/`) because markdown links are not base-prefixed by Astro and
  absolute ones would 404 under the temporary `/paulmarinos.com` base. Measured: with
  `errorOnRelativeLinks: false` the validator skips relative links; with it `true` it
  rejects them for being relative whether or not they resolve. Either way relative links go
  unchecked. Absolute links are checked. Resolve this by switching prose links to absolute
  and enabling the option once the custom domain makes base `/`.
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
- **Sidebar groups are collapsible only because of `sidebar.useDropdowns: true`** in the
  theme's options. Without it the theme renders each group as a static label with its
  children permanently expanded, and Starlight's own `collapsed: true` is silently ignored.
  With it, groups honour `collapsed` and auto-expand the one containing the current page.
  Nested subdirectories under a pillar become nested disclosures automatically.
- **The mobile menu is a separate component and does not share that behaviour.** The theme
  renders it flat via SiteTitle -> MobileNavTrigger -> MobileNav, none of which are
  importable (only `./overrides/*` is exported), so it is upgraded in place by a script in
  `src/components/Banner.astro` — Banner is claimed by neither plugin and renders on every
  page. Without JS the menu stays fully expanded and usable.
  Known limitation: the theme's MobileNav renders only `type === 'link'` children, so a
  *nested* sub-group under a pillar will not appear in the mobile menu at all. Nothing is
  nested yet; revisit when the first sub-group lands.
- **`starlight-site-graph`** supplies the graph view and backlinks, and overrides only
  `PageSidebar`, so it composes with the theme. Graph edges are parsed from real links in
  page content, so the "How this connects" prose links *are* the edge list. Node colour and
  tags are driven per pillar from the `pillars` table in `astro.config.mjs`.
- **`patches/starlight-site-graph+0.5.0.patch`** is load-bearing. The plugin's `deepMerge`
  treats a `Map` as a plain object and flattens it to `{}`, so its own `styleRules` default
  fails validation under Astro 7 / zod v4 — the plugin does not build at all without this,
  even with empty config. Applied via `patch-package` on `postinstall`; do not remove it
  without checking whether upstream (last published Aug 2025, targeting Astro 5) has fixed it.
  The same patch also fixes base-path slugification: the plugin slugified the base when
  building node keys (`/paulmarinos.com` → `paulmarinoscom`) but not when resolving link
  targets, so under the dotted preview base the graph split into two disconnected halves and
  rendered empty. Node keys and link targets now both keep the base verbatim, matching
  Astro's `BASE_URL`. Both hunks are in `sitemap/build.ts`.
  A third hunk fixes the graph rendering as an empty box: `components/graph/
  preprocess-sitemap.ts` runs on the *client* but imported `micromatch`, which is
  Node-only and reads `process.platform` at import time. That threw "process is not
  defined" and killed the graph script before it could draw, leaving the skeleton
  placeholder visible. It was there for two glob tests, so it is replaced with a small
  browser-safe glob-to-RegExp compiler (also drops a Node library from the client bundle).
  A fifth hunk changes `updateCenterTransform` in `components/graph/simulator.ts` to centre
  the graph's bounding box instead of the current page's node. The stock behaviour pins the
  current node to the middle, which leaves the cluster leaning whenever that node is not
  itself central — 48px of lean on a 608px box, with lopsided margins. Margins are now
  symmetric to the pixel on every page, and the current node keeps its own highlight.
  A fourth hunk lowers the Pixi `resolution` in `components/graph/renderer.ts` from 4 to 2.
  At 4 the backing store is 16x the CSS area, so a content-width graph runs to several
  megapixels and silently fails to draw on software renderers and low-end GPUs — which is
  what made every attempt to widen the graph produce a blank canvas. At 2 it is still beyond
  retina density for this content.
- **Pillar colours run out at nine.** The plugin exposes only `nodeColor1..9` for ten
  pillars. The tenth uses the `nodeColorExternal` slot, which nothing else can claim because
  external nodes only exist when `includeExternalLinks` is on and it is off. Its value is
  redefined per theme in `src/styles/custom.css`, continuing the palette's red -> purple ramp
  into pink — pushed well past `nodeColor9` deliberately, since adjacent ramp steps are
  indistinguishable at node size. Every pillar is a circle; do not encode a pillar as a shape.
  An eleventh pillar would need `nodeColorTag` or `nodeColorUnresolved` given the same
  treatment. Enabling external links would take this slot back.
- **Graph layout knobs.** `linkDistance` is set to 150 in `astro.config.mjs`; the plugin
  defaults it to 0, which leaves layout to repulsion alone and clumps nodes with
  overlapping labels. There is no fit-to-bounds — zoom is pinned at `scale` and centred on
  the current node — so nodes can fall outside the box as content grows. Measured with
  synthetic sitemaps: at 40 nodes, `linkDistance` 0 vs 150 keeps 75% vs 73% of nodes in
  view, and at 88 nodes 68% vs 59%. `depth` dominates, so that is the lever as content grows,
  not `linkDistance`.
- **`depth` is 1.** Set while the pillars still form a complete mesh, where depth 1 and 2 are
  measurably identical (11 of 11 nodes either way) — so it was a no-op at the time and cannot
  have regressed anything. It starts mattering the moment articles land: at 4 articles per
  pillar, depth 1 shows 18 nodes with 94% on screen against depth 2's 50 with 74%. Readers can
  still raise it with the graph's depth control.
  Not measured: the view from an *article* page, because `currentPage` is read once in the
  component constructor and cannot be repointed at runtime. Depth 1 from an article may be
  sparse (its pillar plus its `relatedTo` targets). Check that when the first article lands.
- **Graph placement.** The graph renders at the bottom of the content column at every width
  (`src/components/Footer.astro`), spanning the full content measure via
  `--slsg-graph-width: 100%`. It is deliberately not in the right sidebar — at ~250px the
  node labels overlap and clip. Backlinks are the mirror image: right sidebar on wide
  screens (`PageSidebar.astro`), footer below 72rem. The splash landing page renders its own
  graph inline as "The map" in `index.mdx`, and `Footer.astro` skips both blocks there via
  `template === 'splash'` — at render time rather than in CSS, so that page does not boot a
  second WebGL context only to hide it.
  Invariant: exactly one graph and one backlinks panel visible at any width. Verify in a
  headless browser, not by grep — this class of bug is invisible in the HTML.
- **Panel placement is ours, not the plugin's.** `overridePageSidebar: false` disables the
  plugin's own right-sidebar override. `src/components/PageSidebar.astro` renders the table
  of contents first, then graph, then backlinks. `src/components/Footer.astro` renders a
  second copy that CSS shows only below 72rem (Starlight's right-sidebar breakpoint), since
  the sidebar is hidden on mobile. The splash landing page has no sidebar at any width, so it
  renders its own `<PageGraph>` inline in `index.mdx` and suppresses the footer copy via
  `:root[data-has-hero]`. Exactly one copy is visible at any width — check that invariant if
  you touch any of the three.

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

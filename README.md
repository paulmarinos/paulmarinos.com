# paulmarinos.com

Personal site — security engineering across eight pillars: threat intelligence, identity &
access management, application security, GRC, penetration testing & red teaming, AI &
automation engineering, detection engineering & SecOps, and cloud & infrastructure security.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build),
deployed to GitHub Pages.

**Live:** https://www.paulmarinos.com

## Content architecture

[`site-structure.md`](./site-structure.md) is the plan of record — the eight pillars, their
subsections, the cross-cutting threads, and the build order.

## Local development

Requires Node 22 (see `.nvmrc`).

```sh
nvm use
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # serve the build locally
```

## Structure

```
astro.config.mjs              Starlight config; sidebar = the 7 pillars
src/
  content.config.ts           Frontmatter schema + cross-link enforcement
  content/docs/
    index.mdx                 Landing page
    <pillar>/index.mdx        Pillar overview
    <pillar>/*.md(x)          Articles
  components/                 Overrides and interactive islands
  styles/custom.css           Design token overrides
public/CNAME                  Custom domain
.github/workflows/deploy.yml  Build + deploy to Pages
```

## Frontmatter

Articles are validated at build time. Required:

```yaml
title: string
description: string
pillar: threat-intel | iam | appsec | grc | pentest | ai-automation | detection-eng | cloud-infra
contentType: deep-dive | cheatsheet | template | walkthrough | glossary
maturity: foundational | practitioner | advanced
updated: YYYY-MM-DD
relatedTo: [ ... ]   # ≥1 slug outside this article's own pillar
```

Optional: `cloud` (`aws`/`azure`/`gcp`/`multi`), `frameworks`, `attack` (ATT&CK technique IDs).

The `relatedTo` rule is enforced — a build fails if an article has no cross-pillar link.
Pillar overview pages use `contentType: landing` and are exempt.

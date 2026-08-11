// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';
import starlightSiteGraph from 'starlight-site-graph';

// The ten pillars. Order here is the order in the sidebar; `color` is the graph
// node colour, following the plugin's red -> purple ramp in sidebar order.
// nodeColor1..9 are the only numbered slots, so the tenth pillar takes
// `nodeColorExternal` — a slot nothing else can claim, because external nodes
// only exist when `includeExternalLinks` is on, and it is off. Its value is
// redefined in src/styles/custom.css to continue the ramp into magenta.
const pillars = [
	{ label: 'Threat Intelligence', dir: 'threat-intel', color: 'nodeColor1' },
	{ label: 'Identity & Access Management', dir: 'iam', color: 'nodeColor2' },
	{ label: 'Application Security', dir: 'appsec', color: 'nodeColor3' },
	{ label: 'Governance, Risk & Compliance', dir: 'grc', color: 'nodeColor4' },
	{ label: 'Penetration Testing & Red Teaming', dir: 'pentest', color: 'nodeColor5' },
	{ label: 'AI & Automation Engineering', dir: 'ai-automation', color: 'nodeColor6' },
	{ label: 'Detection Engineering & SecOps', dir: 'detection-eng', color: 'nodeColor7' },
	{ label: 'Cloud & Infrastructure Security', dir: 'cloud-infra', color: 'nodeColor8' },
	{ label: 'Incident Response & Digital Forensics', dir: 'dfir', color: 'nodeColor9' },
	{ label: 'Data Security & Privacy Engineering', dir: 'data-privacy', color: 'nodeColorExternal' },
];

// Deploy target. Defaults to the custom domain, which serves at the root path.
// While the custom domain is still being provisioned, the deploy workflow sets
// these to the github.io project URL so the preview renders with its assets.
// Once DNS is live, drop the `env:` block from .github/workflows/deploy.yml.
const site = process.env.SITE_URL ?? 'https://www.paulmarinos.com';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: 'Paul Marinos',
			description:
				'Threat intelligence, identity, application security, GRC, penetration testing, AI engineering, detection engineering, cloud security, incident response, and data privacy — and the connective tissue between them.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/paulmarinos' },
			],
			customCss: ['./src/styles/custom.css'],
			components: {
				PageSidebar: './src/components/PageSidebar.astro',
				Footer: './src/components/Footer.astro',
				// Not a banner — a global hook for the mobile-nav enhancement.
				Banner: './src/components/Banner.astro',
			},
			plugins: [
				starlightThemeBlack({
					sidebar: {
						// Without this the theme renders each pillar as a static label
						// with its children always expanded — `collapsed: true` below
						// has no effect. With it, each pillar becomes a <details>
						// disclosure that honours `collapsed` and auto-opens the group
						// containing the current page.
						useDropdowns: true,
					},
					docs: {
						// Off by default here: the stock behaviour puts
						// "Open in ChatGPT / Claude / v0 / Scira" buttons on every page.
						showMarkdownActions: false,
					},
				}),
				starlightSiteGraph({
					// Edges come from real links in page content — the "How this
					// connects" sections are already the cross-pillar edge list.
					// Nav, header, footer and the right sidebar are excluded by
					// default, so only editorial links become edges.
					//
					// We render the panels ourselves (src/components/PageSidebar.astro
					// and Footer.astro) so the graph sits *below* the table of contents
					// and still appears on mobile, where the right sidebar is hidden.
					overridePageSidebar: false,
					graphConfig: {
						// Depth 1 shows only direct neighbours; 2 makes the
						// cross-pillar structure legible, which is the point.
						depth: 2,
						renderArrows: true,
						// The plugin defaults `linkDistance` to 0, so layout is driven
						// only by repulsion and nodes clump with overlapping labels.
						linkDistance: 150,
					},
					sitemapConfig: {
						// One colour per pillar, driven by the table above.
						// Globs are written both bare and `**/`-prefixed so they match
						// whether or not a base path is prepended to the node key.
						styleRules: new Map(
							pillars.map(({ dir, color }) => [
								[`${dir}/**`, `**/${dir}/**`],
								{ shapeColor: color },
							]),
						),
						// Tag each page with its pillar so the graph can be filtered.
						tagRules: Object.fromEntries(
							pillars.map(({ dir }) => [dir, [`${dir}/**`, `**/${dir}/**`]]),
						),
					},
				}),
			],
			editLink: {
				baseUrl: 'https://github.com/paulmarinos/paulmarinos.com/edit/main/',
			},
			lastUpdated: true,
			sidebar: pillars.map(({ label, dir }) => ({
				label,
				collapsed: true,
				items: [{ autogenerate: { directory: dir } }],
			})),
		}),
	],
});

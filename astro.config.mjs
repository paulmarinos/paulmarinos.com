// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';

// The seven pillars. Order here is the order in the sidebar.
const pillars = [
	{ label: 'Threat Intelligence', dir: 'threat-intel' },
	{ label: 'Identity & Access Management', dir: 'iam' },
	{ label: 'Application Security', dir: 'appsec' },
	{ label: 'Governance, Risk & Compliance', dir: 'grc' },
	{ label: 'Pentesting', dir: 'pentest' },
	{ label: 'AI & Automation Engineering', dir: 'ai-automation' },
	{ label: 'Detection Engineering & SecOps', dir: 'detection-eng' },
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
				'Threat intelligence, identity, application security, GRC, pentesting, AI engineering, and detection engineering — and the connective tissue between them.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/paulmarinos' },
			],
			customCss: ['./src/styles/custom.css'],
			plugins: [
				starlightThemeBlack({
					docs: {
						// Off by default here: the stock behaviour puts
						// "Open in ChatGPT / Claude / v0 / Scira" buttons on every page.
						showMarkdownActions: false,
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

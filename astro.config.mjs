// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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

// https://astro.build/config
export default defineConfig({
	site: 'https://www.paulmarinos.com',
	integrations: [
		starlight({
			title: 'Paul Marinos',
			description:
				'Threat intelligence, identity, application security, GRC, pentesting, AI engineering, and detection engineering — and the connective tissue between them.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/paulmarinos' },
			],
			customCss: ['./src/styles/custom.css'],
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

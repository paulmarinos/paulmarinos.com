/**
 * Fails the build on broken internal links.
 *
 * `starlight-links-validator` cannot cover this site: every internal link is
 * written relative (because markdown links are not base-prefixed by Astro, and
 * absolute ones would 404 under the temporary preview base), and the plugin
 * either skips relative links or rejects them for being relative. Neither
 * resolves them.
 *
 * The graph plugin already does resolve them. Any link target it could not match
 * to a real page becomes a sitemap node with `exists: false`, and its
 * `backlinks` name the pages that pointed at it. That is a link report we are
 * already paying for, so this reads it back.
 *
 * Runs after `astro build` — see the `build` script in package.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const sitemapPath = path.join('dist', 'sitegraph', 'sitemap.json');

if (!fs.existsSync(sitemapPath)) {
	console.error(`[check-graph-links] ${sitemapPath} not found — did the build emit the graph sitemap?`);
	process.exit(1);
}

const sitemap = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));
const broken = Object.entries(sitemap).filter(([, node]) => node.exists === false);

if (broken.length === 0) {
	const count = Object.keys(sitemap).length;
	console.log(`[check-graph-links] ${count} pages, no broken internal links.`);
	process.exit(0);
}

console.error(`\n[check-graph-links] ${broken.length} broken internal link target(s):\n`);
for (const [target, node] of broken) {
	const sources = node.backlinks?.length ? node.backlinks : ['(unknown)'];
	console.error(`  ${target}`);
	for (const source of sources) console.error(`      linked from  ${source}`);
}
console.error(
	`\n  Links are relative, so depth matters: from a pillar page (/iam/) use "../appsec/",\n` +
		`  from an article (/iam/foo/) use "../../appsec/" and "../bar/" for a sibling.\n`,
);
process.exit(1);

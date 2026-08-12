/**
 * Fails the build on broken internal links.
 *
 * This used to be the *only* link check that worked, back when every internal
 * link was written relative and `starlight-links-validator` either skipped
 * relative links or rejected them for being relative. Prose links are absolute
 * now and the validator covers them, so this is no longer the primary net.
 *
 * It is kept because it still catches what the validator structurally cannot:
 * the validator only inspects links written in markdown, so links emitted by a
 * component are invisible to it. The graph plugin parses generated HTML, which
 * means it sees those too. Any link target it could not match to a real page
 * becomes a sitemap node with `exists: false`, with `backlinks` naming the
 * pages that pointed at it — a link report we are already paying for, so this
 * reads it back.
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
	`\n  Internal links are absolute and depth-independent: write "/iam/appsec/" style paths\n` +
		`  with a leading slash from anywhere. A target listed above is one no page matched,\n` +
		`  so check the slug rather than the link's depth.\n`,
);
process.exit(1);

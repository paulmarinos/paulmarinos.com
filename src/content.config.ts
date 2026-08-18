import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { ExtendDocsSchema } from 'starlight-theme-black/schema';

export const PILLARS = [
	'threat-intel',
	'iam',
	'appsec',
	'grc',
	'pentest',
	'ai-automation',
	'detection-eng',
	'cloud-infra',
	'dfir',
	'data-privacy',
] as const;

// 'landing' is the pillar overview page; 'essay' is personal writing under
// src/content/docs/essays/, outside the pillars; everything else is an article.
export const CONTENT_TYPES = [
	'landing',
	'deep-dive',
	'cheatsheet',
	'template',
	'walkthrough',
	'glossary',
	'essay',
] as const;

export const MATURITY = ['foundational', 'practitioner', 'advanced'] as const;

export const CLOUDS = ['aws', 'azure', 'gcp', 'multi'] as const;

const taxonomy = z.object({
	/** Required on articles. Optional only on the site root, which sits above the pillars. */
	pillar: z.enum(PILLARS).optional(),
	contentType: z.enum(CONTENT_TYPES),
	maturity: z.enum(MATURITY).optional(),
	cloud: z.array(z.enum(CLOUDS)).optional(),
	frameworks: z.array(z.string()).default([]),
	attack: z.array(z.string()).default([]),
	/**
	 * Cross-pillar links. Every article must point at least one article in a
	 * different pillar — this is the cross-link discipline, enforced at build time.
	 * Values are slugs relative to the docs root, e.g. 'iam/aws-identity'.
	 */
	relatedTo: z.array(z.string()).default([]),
	updated: z.coerce.date().optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// `extend` is a single hook, so the theme's frontmatter fields
			// (hero.layout, hero.announcement, showMarkdownActions) have to be
			// merged in here explicitly — installing the plugin does not add them.
			extend: (context) =>
				taxonomy.merge(ExtendDocsSchema).superRefine((value, ctx) => {
					if (value.contentType === 'landing') return;

					// Essays sit outside the pillars, so neither the pillar/maturity
					// requirements nor the cross-link discipline apply. They still date
					// themselves, and any `relatedTo` they do declare gets referential
					// integrity from RelatedArticles.astro like everything else.
					if (value.contentType === 'essay') {
						if (!value.updated) {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								path: ['updated'],
								message: 'Essays must declare an `updated` date.',
							});
						}
						return;
					}

					if (!value.pillar) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: ['pillar'],
							message: 'Articles must declare a pillar.',
						});
						// Without a pillar the cross-link check below is meaningless.
						return;
					}
					if (!value.maturity) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: ['maturity'],
							message: 'Articles must declare a maturity level.',
						});
					}
					if (!value.updated) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: ['updated'],
							message: 'Articles must declare an `updated` date.',
						});
					}
					// Cross-link discipline: at least one link outside this article's pillar.
					const outside = value.relatedTo.filter(
						(slug) => !slug.startsWith(`${value.pillar}/`),
					);
					if (outside.length === 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							path: ['relatedTo'],
							message:
								`Every article needs at least one \`relatedTo\` entry outside its own ` +
								`pillar ("${value.pillar}/..."). Found: ${
									value.relatedTo.length ? value.relatedTo.join(', ') : 'none'
								}.`,
						});
					}
				}),
		}),
	}),
};

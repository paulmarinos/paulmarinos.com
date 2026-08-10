import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const PILLARS = [
	'threat-intel',
	'iam',
	'appsec',
	'grc',
	'pentest',
	'ai-automation',
	'detection-eng',
] as const;

// 'landing' is the pillar overview page; everything else is an article.
export const CONTENT_TYPES = [
	'landing',
	'deep-dive',
	'cheatsheet',
	'template',
	'walkthrough',
	'glossary',
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
			extend: (context) =>
				taxonomy.superRefine((value, ctx) => {
					if (value.contentType === 'landing') return;

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

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    summary: z.string(),
    challenge: z.string(),
    contribution: z.string(),
    approach: z.array(z.string()),
    outcomes: z.array(
      z.object({
        metric: z.string(),
        value: z.string(),
        period: z.string().optional(),
        evidence: z.string().optional(),
      }),
    ),
    published: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    audience: z.string(),
    published: z.boolean().default(false),
  }),
});

export const collections = { work, insights };

import { getCollection, type CollectionEntry } from 'astro:content';

// ponytail: drafts visible in dev only; PROD build never emits unpublished entries.
const visible = (e: { data: { published: boolean } }) => e.data.published || import.meta.env.DEV;

export async function getWork(): Promise<CollectionEntry<'work'>[]> {
  const all = await getCollection('work', visible);
  return all.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getInsights(): Promise<CollectionEntry<'insights'>[]> {
  const all = await getCollection('insights', visible);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

import { getCollection } from 'astro:content';

export const PAGE_SIZE = 12;

export async function getPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

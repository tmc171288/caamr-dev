/// <reference lib="deno.unstable" />
// Use Deno KV for permanent storage on Deno Deploy
const kv = await Deno.openKv();

const VIEWS_KEY = "views";

export async function getViews(slug: string): Promise<number> {
  const res = await kv.get<number>([VIEWS_KEY, slug]);
  return res.value || 0;
}

export async function getAllViews(): Promise<{ [slug: string]: number }> {
  const entries = kv.list<number>({ prefix: [VIEWS_KEY] });
  const views: { [slug: string]: number } = {};
  for await (const entry of entries) {
    const slug = entry.key[1] as string;
    views[slug] = entry.value;
  }
  return views;
}

export async function incrementView(slug: string): Promise<void> {
  const current = await getViews(slug);
  await kv.set([VIEWS_KEY, slug], current + 1);
}

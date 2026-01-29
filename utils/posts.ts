import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";
import { getAllViews, getViews } from "./views.ts";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  thumbnail?: string;
  author?: string;
  views?: number;
}

const POSTS_DIR = "./posts";

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  const allViews = await getAllViews();

  for await (const entry of Deno.readDir(POSTS_DIR)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      try {
        const filePath = join(POSTS_DIR, entry.name);
        const content = await Deno.readTextFile(filePath);
        const { attrs, body } = extract<{
          title: string;
          date: string;
          excerpt?: string;
          tags?: string[];
          thumbnail?: string;
          author?: string;
        }>(content);

        const slug = entry.name.replace(".md", "");
        posts.push({
          slug,
          title: attrs.title || "Untitled",
          date: attrs.date || new Date().toISOString(),
          excerpt: attrs.excerpt || body.substring(0, 150) + "...",
          content: body,
          tags: attrs.tags,
          thumbnail: attrs.thumbnail,
          author: attrs.author || "Caamr",
          views: allViews[slug] || 0,
        });
      } catch (err) {
        console.error(`Error parsing post ${entry.name}:`, err);
        // Continue to the next post
      }
    }
  }

  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = join(POSTS_DIR, `${slug}.md`);
    const content = await Deno.readTextFile(filePath);
    const { attrs, body } = extract<{
      title: string;
      date: string;
      excerpt?: string;
      tags?: string[];
      thumbnail?: string;
      author?: string;
    }>(content);

    const views = await getViews(slug);

    return {
      slug,
      title: attrs.title,
      date: attrs.date,
      excerpt: attrs.excerpt || body.substring(0, 150) + "...",
      content: body,
      tags: attrs.tags,
      thumbnail: attrs.thumbnail,
      author: attrs.author || "Caamr",
      views,
    };
  } catch {
    return null;
  }
}

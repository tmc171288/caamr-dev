import { Handlers } from "$fresh/server.ts";
import { getPosts } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = await getPosts();
    const baseUrl = "https://caamr.dev";

    const staticPages = [
      { url: "", priority: "1.0", changefreq: "daily" },
      { url: "/blog", priority: "0.9", changefreq: "daily" },
      { url: "/about", priority: "0.8", changefreq: "monthly" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${
      staticPages.map((page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("")
    }
  ${
      posts.map((post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("")
    }
</urlset>`;

    return new Response(xml.trim(), {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  },
};

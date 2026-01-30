import { Handlers } from "$fresh/server.ts";
import { getPosts } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = await getPosts();
    const baseUrl = "https://caamr.dev";

    const items = posts.slice(0, 20).map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      ${
      post.thumbnail
        ? `<enclosure url="${post.thumbnail}" type="image/jpeg"/>`
        : ""
    }
    </item>`).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Caamr.Dev Blog</title>
    <link>${baseUrl}</link>
    <description>Blog về công nghệ, lập trình và cuộc sống - Thầy Sư Viết Code</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    return new Response(xml.trim(), {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    });
  },
};

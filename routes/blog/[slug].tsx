import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, type Post } from "../../utils/posts.ts";
import { incrementView } from "../../utils/views.ts";

interface PostData {
  post: Post;
}

export const handler: Handlers<PostData> = {
  async GET(_req, ctx) {
    const { slug } = ctx.params;
    await incrementView(slug);
    const post = await getPost(slug);

    if (!post) {
      return ctx.renderNotFound();
    }

    return ctx.render({ post });
  },
};

function parseMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(
    /^### (.*$)/gm,
    '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>',
  );
  html = html.replace(
    /^## (.*$)/gm,
    '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>',
  );
  html = html.replace(
    /^# (.*$)/gm,
    '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>',
  );

  // Bold and italic
  html = html.replace(
    /\*\*\*(.*?)\*\*\*/g,
    '<strong class="font-bold text-gray-900 dark:text-white"><em>$1</em></strong>',
  );
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>',
  );
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Code blocks (Handle CRLF and leading/trailing spaces)
  html = html.replace(/```(\w+)?\r?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm border border-gray-200 dark:border-gray-700">$1</code>',
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 my-8 mx-auto hover:scale-[1.02] transition-transform duration-300" />',
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-green-600 dark:text-green-400 hover:underline font-medium">$1</a>',
  );

  // Unordered lists
  html = html.replace(
    /^\- (.*$)/gm,
    '<li class="ml-4 text-gray-800 dark:text-gray-200">$1</li>',
  );
  html = html.replace(
    /(<li.*<\/li>\r?\n?)+/g,
    '<ul class="list-disc list-inside my-4 space-y-2 text-gray-800 dark:text-gray-200">$&</ul>',
  );

  // Ordered lists
  html = html.replace(
    /^\d+\. (.*$)/gm,
    '<li class="ml-4 text-gray-800 dark:text-gray-200">$1</li>',
  );

  // Paragraphs (Only wrap lines that don't start with <)
  html = html.split(/\r?\n\r?\n/).map((block) => {
    if (block.trim().startsWith("<")) return block;
    return `<p class="my-4 text-gray-800 dark:text-gray-200 leading-relaxed">${block.trim()}</p>`;
  }).join("\n");

  return html;
}

export default function PostPage({ data }: PageProps<PostData>) {
  const { post } = data;
  const html = parseMarkdown(post.content);

  return (
    <article class="py-8 max-w-3xl mx-auto">
      {/* Post Header */}
      <header class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <a
          href="/blog"
          class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4"
        >
          ← Quay lại Blog
        </a>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <div class="flex items-center gap-2">
            <span>👤</span>
            <span class="font-medium">{post.author || "Caamr"}</span>
          </div>
          <div class="hidden md:block">•</div>
          <time dateTime={post.date} class="flex items-center gap-2">
            <span>📅</span>
            {new Date(post.date).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          <div class="hidden md:block">•</div>
          <div class="flex items-center gap-2">
            <span>👁️</span>
            <span>{post.views || 0} lượt xem</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <>
              <div class="hidden md:block">•</div>
              <div class="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Post Content */}
      <div
        class="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

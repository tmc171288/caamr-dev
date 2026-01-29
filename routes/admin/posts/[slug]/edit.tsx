import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../../../../utils/posts.ts";
import { isValidSession } from "../../../../utils/auth.ts";

interface EditPostData {
  post: Post | null;
  error?: string;
}

export const handler: Handlers<EditPostData> = {
  async GET(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }

    const post = await getPost(ctx.params.slug);
    if (!post) {
      return new Response("Not found", { status: 404 });
    }

    return ctx.render({ post });
  },

  async POST(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }

    const form = await req.formData();
    const title = form.get("title")?.toString() || "";
    const date = form.get("date")?.toString() || "";
    const excerpt = form.get("excerpt")?.toString() || "";
    const tags = form.get("tags")?.toString() || "";
    const thumbnail = form.get("thumbnail")?.toString() || "";
    const content = form.get("content")?.toString() || "";
    const author = form.get("author")?.toString() || "Caamr";
    const slug = ctx.params.slug;

    if (!title || !content) {
      const post = await getPost(slug);
      return ctx.render({ post, error: "Vui lòng điền đầy đủ thông tin" });
    }

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    // Helper to escape quotes in YAML values
    const escapeYAML = (str: string) => str.replace(/"/g, '\\"');

    let frontmatter = `---
title: "${escapeYAML(title)}"
date: "${date}"
excerpt: "${escapeYAML(excerpt)}"
author: "${escapeYAML(author)}"`;

    if (tagsArray.length > 0) {
      frontmatter += `
tags:
${tagsArray.map((t) => `  - "${escapeYAML(t)}"`).join("\n")}`;
    }

    if (thumbnail) {
      frontmatter += `
thumbnail: "${escapeYAML(thumbnail)}"`;
    }

    frontmatter += `
---

${content}`;

    try {
      await Deno.writeTextFile(`./posts/${slug}.md`, frontmatter);
      return new Response("", {
        status: 303,
        headers: { Location: "/admin" },
      });
    } catch {
      const post = await getPost(slug);
      return ctx.render({ post, error: "Không thể lưu bài viết" });
    }
  },
};

export default function EditPostPage({ data }: PageProps<EditPostData>) {
  const { post, error } = data;

  if (!post) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <a
                href="/admin"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900"
              >
                ← Quay lại
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sửa bài viết
        </h1>

        {error && (
          <div class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form method="POST" class="space-y-6">
          <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                name="title"
                required
                value={post.title}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tác giả
              </label>
              <input
                type="text"
                name="author"
                value={post.author || "Caamr"}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ngày giờ đăng
              </label>
              <input
                type="datetime-local"
                name="date"
                value={new Date(post.date).toISOString().slice(0, 16)}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mô tả ngắn
              </label>
              <input
                type="text"
                name="excerpt"
                value={post.excerpt}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                name="tags"
                value={post.tags?.join(", ") || ""}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={post.thumbnail || ""}
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nội dung (Markdown)
              </label>
              <textarea
                name="content"
                rows={15}
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                required
              >
                {post.content}
              </textarea>
              <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Mẹo: Dùng <code>![Mô tả](link-ảnh)</code> để chèn hình ảnh.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
            >
              Lưu thay đổi
            </button>
            <a
              href="/admin"
              class="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 text-gray-900 dark:text-white px-6 py-2 rounded-lg"
            >
              Hủy
            </a>
          </div>
        </form>
      </main>
    </div>
  );
}

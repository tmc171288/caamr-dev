import { Handlers, PageProps } from "$fresh/server.ts";
import { isValidSession } from "../../../utils/auth.ts";

interface NewPostData {
  error?: string;
}

export const handler: Handlers<NewPostData> = {
  GET(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }
    return ctx.render({});
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
    const slug = form.get("slug")?.toString() || "";
    const excerpt = form.get("excerpt")?.toString() || "";
    const tags = form.get("tags")?.toString() || "";
    const thumbnail = form.get("thumbnail")?.toString() || "";
    const content = form.get("content")?.toString() || "";
    const author = form.get("author")?.toString() || "Caamr";
    const dateInput = form.get("date")?.toString();

    // Use provided date or current ISO string
    const date = dateInput || new Date().toISOString(); // Keep full ISO string for precise time

    if (!title || !slug || !content) {
      return ctx.render({ error: "Vui lòng điền đầy đủ thông tin" });
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
      return ctx.render({ error: "Không thể tạo bài viết" });
    }
  },
};

export default function NewPostPage({ data }: PageProps<NewPostData>) {
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
          Tạo bài viết mới
        </h1>

        {data?.error && (
          <div class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">
            {data.error}
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
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                name="slug"
                required
                pattern="[a-z0-9-]+"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="vd: bai-viet-moi"
              />
              <p class="mt-1 text-xs text-gray-500">
                Lưu ý: Slug chỉ chứa chữ cái thường (a-z), số và dấu gạch ngang
                (-). Không dán cả đường link vào đây.
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tác giả
              </label>
              <input
                type="text"
                name="author"
                value="Caamr"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thời gian đăng
              </label>
              <input
                type="datetime-local"
                name="date"
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
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="vd: Deno, Web, Tutorial"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://example.com/image.jpg"
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
              Lưu bài viết
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

import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../../utils/posts.ts";
import {
  deleteSession,
  getSessionToken,
  isValidSession,
  removeSession,
} from "../../utils/auth.ts";
import DeleteButton from "../../islands/DeleteButton.tsx";

interface AdminData {
  posts: Post[];
}

export const handler: Handlers<AdminData> = {
  async GET(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }

    const posts = await getPosts();
    return ctx.render({ posts });
  },

  async POST(req, _ctx) {
    const form = await req.formData();
    const action = form.get("action")?.toString();

    if (action === "logout") {
      const token = getSessionToken(req);
      if (token) {
        removeSession(token);
      }
      const headers = new Headers();
      deleteSession(headers);
      headers.set("Location", "/admin/login");
      return new Response("", {
        status: 303,
        headers,
      });
    }

    return new Response("", { status: 400 });
  },
};

export default function AdminDashboard({ data }: PageProps<AdminData>) {
  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white mr-8">
                Admin Dashboard
              </h1>
              <a
                href="/admin/profile"
                class="text-primary-600 hover:text-primary-700 font-medium"
              >
                ⚙️ Cấu hình cá nhân
              </a>
            </div>
            <div class="flex items-center gap-4">
              <a
                href="/"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Xem Blog
              </a>
              <form method="POST">
                <input type="hidden" name="action" value="logout" />
                <button
                  type="submit"
                  class="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Đăng xuất
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Bài viết ({data.posts.length})
          </h2>
          <a
            href="/admin/posts/new"
            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            + Tạo bài viết mới
          </a>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {data.posts.length === 0
            ? (
              <div class="p-8 text-center text-gray-500 dark:text-gray-400">
                Chưa có bài viết nào. Hãy tạo bài viết đầu tiên!
              </div>
            )
            : (
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tiêu đề
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tags
                    </th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.posts.map((post) => (
                    <tr key={post.slug}>
                      <td class="px-6 py-4">
                        <a
                          href={`/blog/${post.slug}`}
                          class="text-gray-900 dark:text-white hover:text-primary-600"
                        >
                          {post.title}
                        </a>
                      </td>
                      <td class="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td class="px-6 py-4">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            class="inline-block bg-gray-200 dark:bg-gray-600 rounded px-2 py-1 text-xs mr-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a
                          href={`/admin/posts/${post.slug}/edit`}
                          class="text-primary-600 hover:text-primary-800 mr-4"
                        >
                          Sửa
                        </a>
                        <DeleteButton slug={post.slug} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </main>
    </div>
  );
}

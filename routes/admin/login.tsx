import { Handlers, PageProps } from "$fresh/server.ts";
import {
  addSession,
  createSession,
  isValidSession,
  verifyPassword,
} from "../../utils/auth.ts";

interface LoginData {
  error?: string;
}

export const handler: Handlers<LoginData> = {
  GET(req, ctx) {
    if (isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin" },
      });
    }
    return ctx.render({});
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const password = form.get("password")?.toString() || "";

    if (verifyPassword(password)) {
      const headers = new Headers();
      const token = createSession(headers);
      addSession(token);
      headers.set("Location", "/admin");
      return new Response("", {
        status: 303,
        headers,
      });
    }

    return ctx.render({ error: "Mật khẩu không đúng" });
  },
};

export default function LoginPage({ data }: PageProps<LoginData>) {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Admin Login
        </h1>

        {data?.error && (
          <div class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">
            {data.error}
          </div>
        )}

        <form method="POST">
          <div class="mb-4">
            <label
              htmlFor="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Nhập mật khẩu admin"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Đăng nhập
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <a href="/" class="text-primary-600 hover:underline">
            ← Quay lại trang chủ
          </a>
        </p>
      </div>
    </div>
  );
}

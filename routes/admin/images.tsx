import { Handlers, PageProps } from "$fresh/server.ts";
import { isValidSession } from "../../utils/auth.ts";
import ImageUploader from "../../islands/ImageUploader.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }
    return ctx.render({});
  },
};

export default function ImagesPage() {
  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center gap-6">
              <a
                href="/admin"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900"
              >
                ← Quay lai
              </a>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                Quan ly anh
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <ImageUploader />
        </div>
      </main>
    </div>
  );
}

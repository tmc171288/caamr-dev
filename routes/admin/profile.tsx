import { Handlers, PageProps } from "$fresh/server.ts";
import { getProfile, ProfileData, updateProfile } from "../../utils/profile.ts";
import { isValidSession } from "../../utils/auth.ts";

export const handler: Handlers<ProfileData> = {
  async GET(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("", {
        status: 303,
        headers: { Location: "/admin/login" },
      });
    }
    const profile = await getProfile();
    return ctx.render(profile);
  },
  async POST(req, _ctx) {
    if (!isValidSession(req)) {
      return new Response("", { status: 403 });
    }
    const form = await req.formData();

    const avatar = form.get("avatar")?.toString() || "";
    const title1 = form.get("title1")?.toString() || "";
    const title2 = form.get("title2")?.toString() || "";
    const title3 = form.get("title3")?.toString() || "";
    const bio1 = form.get("bio1")?.toString() || "";
    const bio2 = form.get("bio2")?.toString() || "";
    const bio3 = form.get("bio3")?.toString() || "";

    await updateProfile({
      avatar,
      titles: [title1, title2, title3].filter(Boolean),
      bio: [bio1, bio2, bio3].filter(Boolean),
    });

    return new Response("", {
      status: 303,
      headers: { Location: "/admin/profile" },
    });
  },
};

export default function AdminProfile({ data }: PageProps<ProfileData>) {
  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                Cấu hình cá nhân
              </h1>
            </div>
            <div class="flex items-center gap-4">
              <a
                href="/admin"
                class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Quay lại Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <form method="POST" class="space-y-6">
            {/* Avatar Section */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ảnh đại diện (URL)
              </label>
              <div class="flex items-center gap-4">
                <img
                  src={data.avatar}
                  alt="Current Avatar"
                  class="w-16 h-16 rounded-full object-cover border"
                />
                <input
                  type="text"
                  name="avatar"
                  defaultValue={data.avatar}
                  class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border"
                  placeholder="https://..."
                />
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Copy link ảnh từ trang Image Hosting dán vào đây.
              </p>
            </div>

            <hr class="border-gray-200 dark:border-gray-700" />

            {/* Titles Section */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chữ chạy tiêu đề (Typewriter Titles)
              </label>
              <div class="grid gap-4">
                <input
                  type="text"
                  name="title1"
                  defaultValue={data.titles[0]}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="Dòng 1 (ví dụ: Xin chào...)"
                />
                <input
                  type="text"
                  name="title2"
                  defaultValue={data.titles[1]}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="Dòng 2 (ví dụ: Hay còn gọi là...)"
                />
                <input
                  type="text"
                  name="title3"
                  defaultValue={data.titles[2]}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="Dòng 3 (tùy chọn)"
                />
              </div>
            </div>

            <hr class="border-gray-200 dark:border-gray-700" />

            {/* Bio Section */}
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mô tả giới thiệu (Bio)
              </label>
              <div class="grid gap-4">
                <textarea
                  name="bio1"
                  rows={2}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="Mô tả tiếng Việt..."
                >
                  {data.bio[0]}
                </textarea>
                <textarea
                  name="bio2"
                  rows={2}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="English description..."
                >
                  {data.bio[1]}
                </textarea>
                <textarea
                  name="bio3"
                  rows={2}
                  class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 border w-full"
                  placeholder="Dòng bổ sung (tùy chọn)..."
                >
                  {data.bio[2]}
                </textarea>
              </div>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

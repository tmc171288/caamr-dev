import { Handlers, PageProps } from "$fresh/server.ts";
import { getProfile, ProfileData } from "../utils/profile.ts";
import Typewriter from "../islands/Typewriter.tsx";

interface AboutData {
  profile: ProfileData;
}

export const handler: Handlers<AboutData> = {
  async GET(_req, ctx) {
    const profile = await getProfile();
    return ctx.render({ profile });
  },
};

export default function About({ data }: PageProps<AboutData>) {
  const { profile } = data;

  return (
    <div class="py-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Về tôi
      </h1>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        {/* Dynamic Hero Section */}
        <section class="mb-12">
          <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="flex-shrink-0">
              <div class="w-40 h-40 rounded-full overflow-hidden shadow-2xl shadow-green-500/50 dark:shadow-green-400/30 border-4 border-white dark:border-gray-800">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mt-0 mb-4 h-[3.5rem] flex items-center">
                <Typewriter
                  strings={profile.titles}
                  typeSpeed={50}
                  delayBeforeDelete={2500}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-md"
                />
              </h2>
              <div class="text-gray-600 dark:text-gray-400 text-lg">
                🧘Thầy Sư Viết Code{"  "}
                <strong>Đạo Hạnh Fullstack, Tâm Tịnh Debug</strong>. Ngày xưa,
                thầy vốn là người tu hành, sống ẩn dật giữa rừng sâu… cho đến
                một ngày, khi đang thiền dưới gốc bồ đề, thầy nghe tiếng gọi từ
                vũ trụ:
              </div>
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 hover:from-primary-600 hover:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-400">
                “npm install enlightenment”.
              </div>
              <br />
              <div class="text-gray-600 dark:text-gray-400 text-lg">
                Từ đó, thầy bước vào con đường lập trình giác ngộ, chuyên trị
                bugs, hóa giải lỗi 500, và truyền đạo lý clean code cho chúng
                sinh. Thầy không chỉ gõ phím, thầy niệm code. Mỗi dòng đều mang
                năng lượng tích cực và cú pháp thanh tịnh.
              </div>

              <div class="text-gray-600 dark:text-gray-400 text-lg">
                💻 Thầy tu theo trường phái Fullstack Zen, am hiểu cả frontend
                lẫn backend, nhưng không bao giờ để ego lấn át logic.
              </div>
              <br />
              <div class="text-gray-600 dark:text-gray-400 text-lg">
                🧠 Thầy tin rằng:{" "}
                <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 hover:from-primary-600 hover:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-400">
                  “Muốn code chạy, trước tiên tâm phải tĩnh.”
                </div>
              </div>
              <div class="text-gray-600 dark:text-gray-400 text-lg">
                Thầy thường chia sẻ giáo lý tại ngôi chùa GitHub, giảng pháp qua
                các dự án open-source, và ban phước lành cho những ai lỡ tay xóa
                nhầm production.
              </div>
              {/* Signature */}
              <div class="mt-8 flex justify-end">
                <div class="text-right">
                  <div
                    class="font-['Brush_Script_MT','cursive'] text-2xl text-gray-700 dark:text-gray-300 italic"
                    style="font-family: 'Brush Script MT', 'Bradley Hand', cursive;"
                  >
                    CaamrDev
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Kỹ năng
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "TypeScript",
              "JavaScript",
              "Deno",
              "Node.js",
              "React",
              "Tailwind CSS",
              "Python",
              "Git",
              "Docker",
            ].map((skill) => (
              <a
                key={skill}
                href={`/blog?tag=${skill}`}
                class="block px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-700 dark:text-gray-300 font-medium hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1 no-underline"
              >
                {skill}
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Liên hệ
          </h2>
          <div class="flex flex-wrap gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 no-underline
                     bg-white text-gray-900 shadow-md hover:shadow-green-500/50 hover:text-green-600
                     dark:bg-gray-900 dark:text-white dark:hover:shadow-green-500/30 dark:hover:text-green-400 dark:border dark:border-gray-700"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 no-underline
                     bg-white text-gray-900 shadow-md hover:shadow-green-500/50 hover:text-green-600
                     dark:bg-gray-900 dark:text-white dark:hover:shadow-green-500/30 dark:hover:text-green-400 dark:border dark:border-gray-700"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 no-underline
                     bg-white text-gray-900 shadow-md hover:shadow-green-500/50 hover:text-green-600
                     dark:bg-gray-900 dark:text-white dark:hover:shadow-green-500/30 dark:hover:text-green-400 dark:border dark:border-gray-700"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              Twitter
            </a>
            <a
              href="mailto:hello@caamr.dev"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-1 no-underline
                     bg-white text-gray-900 shadow-md hover:shadow-green-500/50 hover:text-green-600
                     dark:bg-gray-900 dark:text-white dark:hover:shadow-green-500/30 dark:hover:text-green-400 dark:border dark:border-gray-700"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

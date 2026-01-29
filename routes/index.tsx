import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, type Post } from "../utils/posts.ts";
import { getProfile, ProfileData } from "../utils/profile.ts"; // Import profile utils
import BlogCard from "../components/BlogCard.tsx";
import Typewriter from "../islands/Typewriter.tsx";

interface HomeData {
  posts: Post[];
  profile: ProfileData; // Add profile to data
}

export const handler: Handlers<HomeData> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    const profile = await getProfile(); // Fetch profile
    return ctx.render({ posts: posts.slice(0, 5), profile });
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  const { posts, profile } = data;

  return (
    <div>
      {/* Hero Section */}
      <section class="py-12 md:py-20">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-shrink-0">
            <div class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl shadow-green-200/50 dark:shadow-green-400/30 border-4 border-gray-800 dark:border-white">
              <img
                src={profile.avatar}
                alt="Avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Xin chào, tôi là:
            </h1>
            <div class="text-xl md:text-3xl lg:text-4xl font-bold min-h-[3rem] md:min-h-[3.5rem]">
              <Typewriter
                strings={profile.titles}
                typeSpeed={50}
                delayBeforeDelete={2500}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg"
              />
            </div>
            <div class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl min-h-[4rem]">
              <Typewriter
                strings={profile.bio}
                typeSpeed={50}
                delayBeforeDelete={5000}
                loop
              />
            </div>
            <div class="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="/blog"
                class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Đọc Blog
              </a>
              <a
                href="/about"
                class="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
              >
                Về tôi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section class="py-12 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Bài viết mới nhất
          </h2>
          <a
            href="/blog"
            class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            Xem tất cả →
          </a>
        </div>
        {posts.length > 0
          ? (
            <div class="grid gap-6 grid-cols-1">
              {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          )
          : (
            <div class="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p class="text-gray-600 dark:text-gray-400">
                Chưa có bài viết nào. Hãy tạo file markdown trong thư mục{" "}
                <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  posts/
                </code>
              </p>
            </div>
          )}
      </section>
    </div>
  );
}

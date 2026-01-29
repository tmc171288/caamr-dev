import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, type Post } from "../../utils/posts.ts";
import BlogCard from "../../components/BlogCard.tsx";

interface BlogData {
  posts: Post[];
  tag?: string;
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
}

export const handler: Handlers<BlogData> = {
  async GET(req, ctx) {
    const posts = await getPosts();
    const url = new URL(req.url);
    const tag = url.searchParams.get("tag");
    const page = parseInt(url.searchParams.get("page") || "1");
    const postsPerPage = 8;

    const filteredPosts = tag
      ? posts.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      : posts;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + postsPerPage,
    );

    return ctx.render({
      posts: paginatedPosts,
      tag: tag || undefined,
      currentPage,
      totalPages,
      postsPerPage,
    });
  },
};

export default function BlogIndex({ data }: PageProps<BlogData>) {
  const { posts, tag, currentPage, totalPages } = data;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    params.set("page", page.toString());
    return `/blog?${params.toString()}`;
  };

  return (
    <div>
      <section class="py-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {tag
            ? (
              <>
                Bài viết về{" "}
                <span class="text-primary-600 dark:text-primary-400">
                  {tag}
                </span>
              </>
            )
            : "Blog"}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {tag
            ? `Danh sách các bài viết liên quan đến ${tag}`
            : "Những bài viết về công nghệ, lập trình và cuộc sống."}
        </p>
      </section>

      <section>
        {posts.length > 0
          ? (
            <>
              <div class="grid gap-6 grid-cols-1">
                {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div class="mt-12 flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  {currentPage > 1 && (
                    <a
                      href={buildPageUrl(currentPage - 1)}
                      class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-colors"
                    >
                      ← Trước
                    </a>
                  )}

                  {/* Page Numbers */}
                  <div class="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((
                      page,
                    ) => (
                      <a
                        key={page}
                        href={buildPageUrl(page)}
                        class={`px-4 py-2 rounded-lg border transition-colors ${
                          page === currentPage
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        {page}
                      </a>
                    ))}
                  </div>

                  {/* Next Button */}
                  {currentPage < totalPages && (
                    <a
                      href={buildPageUrl(currentPage + 1)}
                      class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-colors"
                    >
                      Tiếp →
                    </a>
                  )}
                </div>
              )}
            </>
          )
          : (
            <div class="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="text-5xl mb-4">📝</div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Chưa có bài viết nào
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Hãy tạo file markdown trong thư mục{" "}
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

import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, type Post } from "../../utils/posts.ts";
import BlogCard from "../../components/BlogCard.tsx";

interface BlogData {
  posts: Post[];
  tag?: string;
}

export const handler: Handlers<BlogData> = {
  async GET(req, ctx) {
    const posts = await getPosts();
    const url = new URL(req.url);
    const tag = url.searchParams.get("tag");

    const filteredPosts = tag
      ? posts.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      )
      : posts;

    return ctx.render({ posts: filteredPosts, tag: tag || undefined });
  },
};

export default function BlogIndex({ data }: PageProps<BlogData>) {
  const { posts, tag } = data;

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
            <div class="grid gap-6 grid-cols-1">
              {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
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

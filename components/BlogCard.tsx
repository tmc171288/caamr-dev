import type { Post } from "../utils/posts.ts";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article class="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary-600 dark:hover:border-primary-400">
      <a href={`/blog/${post.slug}`} class="block">
        {post.thumbnail && (
          <div class="md:hidden aspect-video overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div class="p-6">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <div class="flex items-center gap-1">
              <span>•</span>
              <span>👁️ {post.views || 0}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <span class="text-primary-600 dark:text-primary-400">
                  {post.tags[0]}
                </span>
              </>
            )}
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
            {post.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>
          <div class="mt-4 text-primary-600 dark:text-primary-400 font-medium text-sm">
            Đọc thêm →
          </div>
        </div>
      </a>
    </article>
  );
}

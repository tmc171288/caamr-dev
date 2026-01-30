import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Trang không tồn tại | Caamr.Dev</title>
        <meta name="description" content="Trang bạn tìm kiếm không tồn tại." />
      </Head>
      <div class="min-h-[60vh] flex items-center justify-center">
        <div class="text-center px-4">
          <img
            src="http://103.185.184.164:8080/logo-su-thay-dev.png"
            alt="Caamr.Dev Logo"
            class="w-32 h-32 mx-auto mb-6"
          />
          <h1 class="text-4xl md:text-5xl font-bold text-primary-600 dark:text-white mb-4">
            404
          </h1>
          <h2 class="text-2xl text-gray-600 dark:text-gray-400 mb-6">
            Trang này đã giác ngộ và rời khỏi thế gian...
          </h2>
          <p class="text-gray-500 dark:text-gray-500 mb-8">
            Có vẻ như bạn đã lạc đường. Hãy quay về con đường chính đạo.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <a
              href="/"
              class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Về trang chủ
            </a>
            <a
              href="/blog"
              class="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
            >
              Đọc Blog
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

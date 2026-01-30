import { type PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Caamr.Dev - Thầy Sư Viết Code</title>
        <meta
          name="description"
          content="Blog về công nghệ, lập trình và cuộc sống - Thầy Sư Viết Code, Đạo Hạnh Fullstack, Tâm Tịnh Debug"
        />

        {/* SEO */}
        <meta name="author" content="CaamrDev" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://caamr.dev" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Caamr.Dev" />
        <meta property="og:title" content="Caamr.Dev - Thầy Sư Viết Code" />
        <meta
          property="og:description"
          content="Blog về công nghệ, lập trình và cuộc sống - Thầy Sư Viết Code"
        />
        <meta
          property="og:image"
          content="http://103.185.184.164:8080/thay-dev"
        />
        <meta property="og:url" content="https://caamr.dev" />
        <meta property="og:locale" content="vi_VN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Caamr.Dev - Thầy Sư Viết Code" />
        <meta
          name="twitter:description"
          content="Blog về công nghệ, lập trình và cuộc sống"
        />
        <meta
          name="twitter:image"
          content="http://103.185.184.164:8080/thay-dev"
        />

        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          href="http://103.185.184.164:8080/logo-su-thay-dev.png"
        />
        <link
          rel="apple-touch-icon"
          href="http://103.185.184.164:8080/logo-su-thay-dev.png"
        />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Caamr.Dev RSS"
          href="/rss.xml"
        />

        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="font-sans antialiased">
        <Layout>
          <Component />
        </Layout>
      </body>
    </html>
  );
}

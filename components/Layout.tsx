import { type ComponentChildren } from "preact";
import Header from "../islands/Header.tsx";

interface LayoutProps {
  children: ComponentChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main class="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer class="border-t border-gray-200 dark:border-gray-800">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} caamr.dev. All rights reserved.
            </p>
            <div class="flex gap-4">
              <a
                href="https://github.com/tmc171288"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/caamr-dev-ab2ba627b/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:minhcam806@gmail.com"
                class="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

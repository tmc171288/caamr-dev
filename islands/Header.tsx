import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function Header() {
  const isMenuOpen = useSignal(false);
  const isDark = useSignal(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme &&
        globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches)
    ) {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a href="/" class="flex items-center gap-2">
            <div class="relative inline-block">
              {/* Nón lá decoration on "Dev" */}
              <img
                src="http://103.185.184.164:8080/non-la-su-thay.png"
                alt="Nón lá"
                class="absolute -top-1 right-2 w-6 h-6 object-contain z-10 transform rotate-12"
              />
              <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 hover:from-primary-600 hover:to-primary-600 dark:hover:from-primary-400 dark:hover:to-primary-400">
                Caamr.Dev
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div class="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              class="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden border border-gray-200 dark:border-gray-700"
              aria-label="Toggle theme"
            >
              <div class="relative w-5 h-5">
                {isDark.value
                  ? (
                    <svg
                      class="w-5 h-5 text-yellow-500 transform transition-transform duration-500 rotate-0 scale-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                  : (
                    <svg
                      class="w-5 h-5 text-gray-700 transform transition-transform duration-500 rotate-0 scale-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div class="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              aria-label="Toggle theme"
            >
              <div class="w-5 h-5">
                {isDark.value
                  ? (
                    <svg
                      class="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                  : (
                    <svg
                      class="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
              </div>
            </button>
            <button
              type="button"
              onClick={() => isMenuOpen.value = !isMenuOpen.value}
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen.value
                  ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )
                  : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen.value && (
          <div class="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div class="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

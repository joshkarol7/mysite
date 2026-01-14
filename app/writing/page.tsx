/// <reference types="next" />
/// <reference types="react" />
import Link from "next/link";

export default function Writing() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← home
        </Link>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">writing</h1>
      </header>

      <div className="space-y-6">
        <div className="flex items-baseline gap-3">
          <Link
            href="/writing/how-we-build"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            how we build
          </Link>
          <span className="text-xs tracking-widest text-gray-600 dark:text-gray-400">
            Jan 13, ’26
          </span>
        </div>
      </div>
    </div>
  );
}



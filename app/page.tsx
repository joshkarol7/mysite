import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Josh Karol</h1>
        <p className="text-gray-600 dark:text-gray-400">
          co-founder + cto @ <a href="https://www.crowdvolt.com" className="text-blue-600 dark:text-blue-400 hover:underline">CrowdVolt</a> (yc w24) 
        </p>
      </header>

      {/* Blog Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">favorite reads / listenings</h2>
        <div className="space-y-4">
        <div>
            <span className="font-medium">work expands to fill available time</span> • <a href="https://en.wikipedia.org/wiki/Parkinson%27s_law" className="text-blue-600 dark:text-blue-400 hover:underline">Parkinson's law</a>
          </div>

          <div>
            <span className="font-medium">why to start a company</span> • <a href="https://www.youtube.com/watch?v=3qHkcs3kG44&ab_channel=PowerfulJRE" className="text-blue-600 dark:text-blue-400 hover:underline">Naval Ravikant</a>
          </div>
        </div>
      </section>


      

      {/* Creative Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">other</h2>
        <div className="space-y-3">
        <div>
            <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">about me</Link>
          </div>
          <div>
            <Link href="/travel" className="text-blue-600 dark:text-blue-400 hover:underline">travel</Link>
            
          </div>
          <div>
            <Link href="/fishing" className="text-blue-600 dark:text-blue-400 hover:underline">fishing</Link>
          </div>


        </div>
      </section>

      {/* Blog Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">writing?</h2>
        <div className="space-y-4">
          <div>
            
            <p className="text-gray-600 dark:text-gray-400 t mt-1">
              coming soon
            </p>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">contact</h2>
        <div className="flex flex-wrap gap-4 text-blue-600 dark:text-blue-400">
          <a href="https://www.linkedin.com/in/josh-karol-4b1a97143/" className="hover:underline">linkedin</a>
          <a href="mailto:joshkarol98@gmail.com" className="hover:underline">email</a>
        </div>
      </section>

      {/* Footer */}
    
    </div>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-[family-name:var(--font-geist-sans)]">
      {/* Back to home link */}
      <div className="mb-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← home
        </Link>
      </div>

      {/* Main content */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold mb-8">about me</h1>
        
        <p>Hey, I&apos;m Josh Karol.</p>
        
        <p>
          I&apos;m co-founder/CTO of{" "}
          <a 
            href="https://www.crowdvolt.com" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CrowdVolt
          </a>
          , where we&apos;re building a high-tech secondary ticketing marketplace.
        </p>
        
        <p>
          I previously helped build fund accounting software at <a href="https://www.mlp.com/" className="text-blue-600 dark:text-blue-400 hover:underline">Millennium</a> and assorted tech at <a href="https://www.bloomberg.com/" className="text-blue-600 dark:text-blue-400 hover:underline">Bloomberg</a>.
          I enjoy building consumer product, managing high concurrency systems, and most things software engineering and math.
        </p>
        
        <p>
          Outside of technical interest, I enjoy traveling and anything related to the outdoors. In my earlier life, I have spent multiple months living in a tent.
        </p>
        
       
      </div>
    </div>
  );
} 
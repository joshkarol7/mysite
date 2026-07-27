"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.14, 1, 0.34, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const pages = [
  { href: "/about", label: "about", desc: "the short version" },
  { href: "/fishing", label: "fishing", desc: "species log + photos" },
  { href: "/travel", label: "travel", desc: "somewhere out there" },
];

export default function Home() {
  return (
    <main className="h-[100svh] overflow-hidden">
      <motion.div
        className="h-full max-w-4xl mx-auto px-6 md:px-10 py-8 md:py-12
                   flex flex-col justify-between"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Top meta */}
        <motion.div
          className="flex items-center justify-between text-caption font-mono"
          variants={fadeUp}
          custom={0}
        >
          <span className="flex items-center gap-2.5 text-secondary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            New York · 40.7128°N 74.0060°W
          </span>
          <span className="text-muted hidden sm:block">josh karol — index</span>
        </motion.div>

        {/* Identity */}
        <div className="py-4">
          <motion.h1
            className="text-h1 font-display text-primary mb-5 leading-[0.95]"
            variants={fadeUp}
            custom={1}
          >
            Josh Karol
          </motion.h1>

          <motion.p
            className="text-body md:text-h3 font-mono text-secondary mb-6 max-w-xl leading-relaxed"
            variants={fadeUp}
            custom={2}
          >
            co-founder + cto @{" "}
            <a
              href="https://www.crowdvolt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              CrowdVolt
            </a>{" "}
            <span className="text-muted">(yc w24)</span>. i build fast consumer
            product and the high-concurrency systems underneath it — end to end,
            pixels to postgres.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-2 text-caption font-mono"
            variants={fadeUp}
            custom={3}
          >
            <a
              href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
              className="link-underline text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a
              href="https://github.com/joshkarol7"
              className="link-underline text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="mailto:joshkarol98@gmail.com"
              className="link-underline text-secondary"
            >
              email
            </a>
          </motion.div>
        </div>

        {/* Index + colophon */}
        <div>
          <div className="border-t border-border">
            {pages.map((page, i) => (
              <motion.div key={page.href} variants={fadeUp} custom={4 + i}>
                <Link
                  href={page.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3
                             border-b border-border hover:border-accent-dim transition-colors duration-300"
                >
                  <span className="text-caption font-mono text-accent-dim">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="text-h3 font-display text-primary group-hover:text-accent transition-colors duration-300">
                      {page.label}
                    </span>
                    <span className="text-caption font-mono text-muted normal-case tracking-normal">
                      {page.desc}
                    </span>
                  </span>
                  <span className="text-secondary text-sm group-hover:translate-x-1 group-hover:text-accent transition-all duration-300">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="mt-4 text-caption font-mono text-muted"
            variants={fadeUp}
            custom={7}
          >
            built with next + tailwind
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
}

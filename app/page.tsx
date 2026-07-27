"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.14, 1, 0.34, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            className="flex items-center gap-3 mb-8 text-caption font-mono text-secondary"
            variants={fadeUp}
            custom={0}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>New York · 40.7128°N 74.0060°W</span>
          </motion.div>

          <motion.h1
            className="text-hero font-display text-primary mb-6"
            variants={fadeUp}
            custom={1}
          >
            Josh
            <br />
            Karol
          </motion.h1>

          <motion.p
            className="text-h3 font-mono text-secondary mb-10 max-w-lg leading-relaxed"
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
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-caption font-mono text-muted">index</span>
        <span className="text-muted text-sm">↓</span>
      </motion.div>
    </section>
  );
}

function IndexRow({
  number,
  href,
  label,
  desc,
  index,
}: {
  number: string;
  href: string;
  label: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div variants={fadeUp} custom={index}>
      <Link
        href={href}
        className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-5
                   border-t border-border hover:border-accent-dim transition-colors duration-300"
      >
        <span className="text-caption font-mono text-accent-dim">{number}</span>
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-h3 font-display text-primary group-hover:text-accent transition-colors duration-300">
            {label}
          </span>
          <span className="text-caption font-mono text-muted normal-case tracking-normal">
            {desc}
          </span>
        </span>
        <span className="text-secondary text-sm group-hover:translate-x-1 group-hover:text-accent transition-all duration-300">
          →
        </span>
      </Link>
    </motion.div>
  );
}

function IndexSection() {
  const rows = [
    { href: "/about", label: "about", desc: "the short version" },
    { href: "/fishing", label: "fishing", desc: "species log + photos" },
    { href: "/travel", label: "travel", desc: "somewhere out there" },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="flex items-baseline justify-between mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="text-caption font-mono text-secondary">index</span>
          <span className="text-caption font-mono text-muted">
            {rows.length.toString().padStart(2, "0")} pages
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="border-b border-border"
        >
          {rows.map((row, i) => (
            <IndexRow
              key={row.href}
              number={(i + 1).toString().padStart(2, "0")}
              href={row.href}
              label={row.label}
              desc={row.desc}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-body font-mono">
          <a
            href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-secondary"
          >
            linkedin
          </a>
          <a
            href="https://github.com/joshkarol7"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-secondary"
          >
            github
          </a>
          <a
            href="mailto:joshkarol98@gmail.com"
            className="link-underline text-secondary"
          >
            email
          </a>
        </div>
        <p className="text-caption font-mono text-muted">
          built with next + tailwind
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <IndexSection />
      <Footer />
    </main>
  );
}

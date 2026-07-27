"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FishMark } from "./components/FishMark";

const ease = [0.14, 1, 0.34, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const link =
  "text-primary underline decoration-secondary underline-offset-2 hover:decoration-primary transition-colors";

const sections = [
  { href: "/fishing", label: "Fishing", desc: "species log + photos" },
  { href: "/travel", label: "Travel", desc: "photos from the road" },
  { href: "/writing", label: "Writing", desc: "notes, occasionally" },
];

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Home() {
  const time = useLocalTime();

  return (
    <main className="min-h-[100svh] flex flex-col">
      <motion.div
        className="flex-1 w-full max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24
                   flex flex-col"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h1
          className="text-[1.6rem] md:text-[2rem] font-display font-semibold text-primary leading-none tracking-tight"
          variants={fadeUp}
          custom={0}
        >
          Josh Karol
        </motion.h1>

        {/* About — verbatim */}
        <div className="mt-10 space-y-5 text-body font-mono text-secondary leading-relaxed">
          <motion.p variants={fadeUp} custom={1}>
            I&apos;m co-founder/CTO of{" "}
            <a
              href="https://www.crowdvolt.com"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              CrowdVolt
            </a>
            , where we&apos;re building a high-tech secondary ticketing
            marketplace.
          </motion.p>

          <motion.p variants={fadeUp} custom={2}>
            I previously helped build fund accounting software at{" "}
            <a
              href="https://www.mlp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Millennium
            </a>{" "}
            and assorted tech at{" "}
            <a
              href="https://www.bloomberg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Bloomberg
            </a>
            . I enjoy building consumer product, managing high concurrency
            systems, and most things software engineering and math.
          </motion.p>

          <motion.p variants={fadeUp} custom={3}>
            Outside of technical interest, I enjoy traveling and anything related
            to the outdoors. In my earlier life, I have spent multiple months
            living in a tent.
          </motion.p>
        </div>

        {/* Links */}
        <motion.div
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-caption font-mono text-secondary"
          variants={fadeUp}
          custom={4}
        >
          <a
            href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
            className="hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a
            href="https://github.com/joshkarol7"
            className="hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="mailto:joshkarol98@gmail.com"
            className="hover:text-primary transition-colors"
          >
            email
          </a>
        </motion.div>

        {/* Index */}
        <nav className="mt-16 border-t border-border">
          {sections.map((section, i) => (
            <motion.div key={section.href} variants={fadeUp} custom={5 + i}>
              <Link
                href={section.href}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-4
                           border-b border-border hover:border-secondary transition-colors duration-300"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="text-h3 font-display text-primary">
                    {section.label}
                  </span>
                  <span className="text-caption font-mono text-muted normal-case tracking-normal">
                    {section.desc}
                  </span>
                </span>
                <span className="text-secondary text-sm group-hover:translate-x-1 group-hover:text-primary transition-all duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      {/* Footer — local time + a little fish */}
      <footer className="w-full max-w-2xl mx-auto px-6 md:px-8 pb-10 flex items-end justify-between">
        <span className="text-caption font-mono text-secondary">
          {time ? `${time} in ` : ""}New York City
        </span>
        <FishMark />
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

const CROWDVOLT_URL =
  "https://www.crowdvolt.com/?utm_source=joshkarol.com&utm_medium=referral&utm_campaign=personal-site";

const sections = [
  { href: "/fishing", label: "fishing" },
  { href: "/travel", label: "travel" },
  { href: "/writing", label: "writing" },
];

export default function Home() {
  return (
    <main className="min-h-[100svh] flex flex-col">
      <motion.div
        className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24 flex flex-col"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Masthead — name left, destinations right */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-6 pb-8 border-b border-border">
          <motion.h1
            className="text-[1.6rem] md:text-[2rem] font-display font-semibold text-primary leading-none tracking-tight"
            variants={fadeUp}
            custom={0}
          >
            Josh Karol
          </motion.h1>

          <motion.nav
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2"
            variants={fadeUp}
            custom={1}
          >
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="text-body font-display text-secondary hover:text-primary transition-colors duration-300"
              >
                {section.label}
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* About */}
        <div className="mt-12 max-w-2xl space-y-5 text-body font-mono text-secondary leading-relaxed">
          <motion.p variants={fadeUp} custom={2}>
            I&apos;m co-founder/CTO of{" "}
            <a
              href={CROWDVOLT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              CrowdVolt
            </a>
            , where we&apos;re building cutting-edge tech to get you out of the
            house. At its core it&apos;s a marketplace for live events, though
            we&apos;re building well past that.
          </motion.p>

          <motion.p variants={fadeUp} custom={3}>
            I previously built fund accounting software at Millennium and
            Schoenfeld. I enjoy building consumer product, managing high
            concurrency systems, and most things software engineering and math.
            A couple of ideas that drive the way I work are{" "}
            <a
              href="https://en.wikipedia.org/wiki/Parkinson%27s_law"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              Parkinson&apos;s Law
            </a>{" "}
            and the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Intermediate_value_theorem"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              Intermediate Value Theorem
            </a>
            .
          </motion.p>

          <motion.p variants={fadeUp} custom={4}>
            Outside of tech, I enjoy traveling, poker, finance,
            and anything related to the outdoors. I plan to one day own multiple
            chickens and hopefully other animals as well. In my earlier life, I have spent
            multiple months living in a tent.
          </motion.p>
        </div>

        {/* Social */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-body font-mono text-secondary"
          variants={fadeUp}
          custom={5}
        >
          <a
            href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
            className="hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <span className="text-muted select-none">·</span>
          <a
            href="https://github.com/joshkarol7"
            className="hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <span className="text-muted select-none">·</span>
          <a
            href="mailto:joshkarol98@gmail.com"
            className="hover:text-primary transition-colors"
          >
            email
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}

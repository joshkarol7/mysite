"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.14, 1, 0.34, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease },
  }),
};

export default function Writing() {
  return (
    <div className="relative min-h-[100svh]">
      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <Link
            href="/"
            className="text-caption font-mono text-secondary hover:text-primary transition-colors duration-300"
          >
            ← back
          </Link>
        </motion.div>

        <motion.div initial="hidden" animate="visible">
          <motion.h1
            className="text-h1 font-display text-primary"
            variants={fadeUp}
            custom={0}
          >
            Writing
          </motion.h1>

          <motion.p
            className="mt-8 text-body font-display text-secondary leading-relaxed"
            variants={fadeUp}
            custom={1}
          >
            Nothing published here yet. When I write something worth keeping,
            it&apos;ll land on this page.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

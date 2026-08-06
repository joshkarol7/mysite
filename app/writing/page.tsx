"use client";

import { motion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";

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
        <div className="mb-12">
          <PageHeader title="Writing" />
        </div>

        <motion.div initial="hidden" animate="visible">
          <motion.p
            className="text-body font-display text-secondary leading-relaxed"
            variants={fadeUp}
            custom={0}
          >
            Coming soon.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

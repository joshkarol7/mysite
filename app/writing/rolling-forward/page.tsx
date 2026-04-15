"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TopoPattern } from "../../components/TopoPattern";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.14, 1, 0.34, 1] as const,
    },
  }),
};

const sectionFade = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.14, 1, 0.34, 1] },
  },
};

export default function RollingForward() {
  return (
    <div className="relative min-h-screen">
      <TopoPattern density="sparse" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.14, 1, 0.34, 1] }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{'>'}</span> cd ~/writing/rolling-forward
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header className="mb-16" initial="hidden" animate="visible">
          <motion.h1 className="text-h1 font-display mb-4" variants={fadeUp} custom={0}>
            rolling forward
          </motion.h1>
          <motion.p
            className="text-caption font-mono text-muted"
            variants={fadeUp}
            custom={1}
          >
            Apr 15, &apos;26
          </motion.p>
        </motion.header>

        {/* Article */}
        <article className="space-y-16">
          <motion.section
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionFade}
          >
            <p className="text-body font-mono text-secondary leading-relaxed">
              Never rolling back. We only roll forward.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}

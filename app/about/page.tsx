"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TopoPattern } from "../components/TopoPattern";


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.14, 1, 0.34, 1],
    },
  }),
};

export default function About() {
  return (
    <div className="relative min-h-screen">
      <TopoPattern density="medium" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.14, 1, 0.34, 1] }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{'>'}</span> cd ~/home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex items-baseline gap-4 mb-3" variants={fadeUp} custom={0}>
            <span className="text-caption font-mono text-accent-dim">01</span>
          </motion.div>
          <motion.h1 className="text-h1 font-display" variants={fadeUp} custom={1}>
            about me
          </motion.h1>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-6 text-body font-mono text-secondary leading-relaxed"
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} custom={2}>
            Hey, I&apos;m Josh Karol.
          </motion.p>

          <motion.p variants={fadeUp} custom={3}>
            I&apos;m co-founder/CTO of{" "}
            <a
              href="https://www.crowdvolt.com"
              className="link-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              CrowdVolt
            </a>
            , where we&apos;re building a high-tech secondary ticketing marketplace.
          </motion.p>

          <motion.p variants={fadeUp} custom={4}>
            I previously helped build fund accounting software at{" "}
            <a href="https://www.mlp.com/" className="link-accent" target="_blank" rel="noopener noreferrer">
              Millennium
            </a>{" "}
            and assorted tech at{" "}
            <a href="https://www.bloomberg.com/" className="link-accent" target="_blank" rel="noopener noreferrer">
              Bloomberg
            </a>
            . I enjoy building consumer product, managing high concurrency systems, and most things
            software engineering and math.
          </motion.p>

          <motion.p variants={fadeUp} custom={5}>
            Outside of technical interest, I enjoy traveling and anything related to the outdoors. In
            my earlier life, I have spent multiple months living in a tent.
          </motion.p>
        </motion.div>

      </div>
    </div>
  );
}

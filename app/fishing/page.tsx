"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CAUGHT, WANT, type Fish } from "./species";

const ease = [0.14, 1, 0.34, 1] as const;

function Box({ checked, delay }: { checked: boolean; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span
      className={`relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border ${
        checked ? "border-accent bg-accent/90" : "border-secondary/50 bg-transparent"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
          <motion.path
            d="M5 12.5l4.2 4.3L19 7"
            stroke="#060809"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease, delay }}
          />
        </svg>
      )}
    </span>
  );
}

function Row({ f, checked, i }: { f: Fish; checked: boolean; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.4, ease, delay: (i % 16) * 0.02 }}
      className="flex items-center gap-3 py-2.5 border-b border-border/60"
    >
      <Box checked={checked} delay={(i % 16) * 0.02 + 0.15} />
      <span className={`text-body font-display ${checked ? "text-primary" : "text-secondary"}`}>
        {f.name}
      </span>
    </motion.div>
  );
}

export default function Fishing() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{">"}</span> cd ~/home
          </Link>
        </motion.div>

        <motion.h1
          className="text-h1 font-display mt-8 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          fish i&apos;ve caught
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
          {CAUGHT.map((f, i) => (
            <Row key={f.name} f={f} checked i={i} />
          ))}
        </div>

        <div className="flex items-center gap-3 mt-14 mb-2">
          <span className="text-caption font-mono text-secondary">bucket list</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
          {WANT.map((f, i) => (
            <Row key={f.name} f={f} checked={false} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "./species";

const ease = [0.14, 1, 0.34, 1] as const;

function Shot({ i, onOpen }: { i: number; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  const p = PHOTOS[i];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease, delay: (i % 3) * 0.08 }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(i)}
        whileHover={reduce ? undefined : { scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.35, ease }}
        className="group block w-full text-left focus:outline-none"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-elevated shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]">
          <motion.div layoutId={`p-${i}`} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-accent/25 transition-all duration-300" />
        </div>
        <figcaption className="mt-3 px-1 text-body font-display text-secondary group-hover:text-accent transition-colors duration-300">
          {p.caption}
        </figcaption>
      </motion.button>
    </motion.figure>
  );
}

export default function Fishing() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-primary transition-colors duration-300">
            ← back
          </Link>
        </motion.div>

        <motion.h1
          className="text-h1 font-display mt-8 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          fishing
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {PHOTOS.map((_, i) => (
            <Shot key={i} i={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-deep/92 backdrop-blur-sm cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
          >
            <motion.div layoutId={`p-${open}`} className="relative max-w-4xl w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[open].src}
                alt={PHOTOS[open].caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
            <motion.p
              className="mt-5 text-body font-display text-primary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              {PHOTOS[open].caption}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

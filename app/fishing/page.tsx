"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PHOTOS } from "./species";

const ease = [0.14, 1, 0.34, 1] as const;
const TILT = [-2.5, 1.8, -1.2, 2.4, -2, 1.4, -1.8, 2.2, -1.5, 1.6];

function Shot({ i, onOpen }: { i: number; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  const p = PHOTOS[i];
  const tilt = reduce ? 0 : TILT[i % TILT.length];
  return (
    <motion.figure
      className="mb-8 break-inside-avoid"
      initial={{ opacity: 0, y: 40, rotate: tilt * 1.6, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.6 }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(i)}
        whileHover={reduce ? undefined : { rotate: 0, scale: 1.035, y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="group block w-full text-left focus:outline-none"
      >
        <div className="relative overflow-hidden rounded-2xl bg-elevated shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]">
          <motion.div layoutId={`p-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="w-full h-auto block group-hover:scale-[1.05] transition-transform duration-[600ms]"
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
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{">"}</span> cd ~/home
          </Link>
        </motion.div>

        <motion.h1
          className="text-h1 font-display mt-8"
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 11 }}
        >
          fishing
        </motion.h1>
        <motion.p
          className="mt-3 mb-12 text-body font-mono text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          a gallery of me holding fish, extremely proud of myself.
        </motion.p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
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

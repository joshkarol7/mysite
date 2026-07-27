"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WANT, PHOTOS, type Fish } from "./species";

const ease = [0.14, 1, 0.34, 1] as const;

function Row({ f, i }: { f: Fish; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.4, ease, delay: (i % 16) * 0.02 }}
      className="flex items-center gap-3 py-2.5 border-b border-border/60"
    >
      <span className="h-[18px] w-[18px] shrink-0 rounded-[5px] border border-secondary/50" />
      <span className="text-body font-display text-secondary">{f.name}</span>
    </motion.div>
  );
}

export default function Fishing() {
  const [open, setOpen] = useState<number | null>(null);

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
          fishing
        </motion.h1>

        {/* Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {PHOTOS.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, ease, delay: (i % 8) * 0.04 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <motion.div layoutId={`photo-${i}`} className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="fishing"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Bucket list */}
        <div className="flex items-center gap-3 mt-16 mb-2">
          <span className="text-caption font-mono text-secondary">bucket list</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
          {WANT.map((f, i) => (
            <Row key={f.name} f={f} i={i} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-deep/90 backdrop-blur-sm cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
          >
            <motion.div layoutId={`photo-${open}`} className="relative max-w-4xl w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS[open]}
                alt="fishing"
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TOP_THREES, PHOTOS } from "./data";

const ease = [0.14, 1, 0.34, 1] as const;

function PhotoWall() {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + PHOTOS.length) % PHOTOS.length));

  return (
    <>
      <div className="columns-2 gap-2 [&>*]:mb-2">
        {PHOTOS.map((p, i) => (
          <motion.button
            key={i}
            layoutId={`t-${i}`}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: (i % 12) * 0.02, duration: 0.4, ease }}
            className="group relative block w-full break-inside-avoid rounded-md overflow-hidden focus:outline-none"
            style={{ background: "var(--color-surface)", aspectRatio: p.o === "l" ? "3 / 2" : "2 / 3" }}
            aria-label={p.caption || "Open photo"}
          >
            <Image
              src={p.src}
              alt={p.caption || "travel"}
              fill
              sizes="(max-width: 768px) 45vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(6,6,4,0.9)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              layoutId={`t-${open}`}
              className="relative rounded-lg overflow-hidden"
              style={{ width: "min(90vw, 1100px)", height: "min(80vh, 780px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={PHOTOS[open].src} alt={PHOTOS[open].caption} fill className="object-contain" sizes="90vw" />
            </motion.div>
            {PHOTOS[open].caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption font-mono text-secondary">
                {PHOTOS[open].caption}
              </p>
            )}
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary text-2xl font-mono">‹</button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary text-2xl font-mono">›</button>
            <button onClick={close} className="absolute top-5 right-5 text-caption font-mono text-secondary hover:text-primary">[esc] close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Travel() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link href="/" className="text-caption font-mono text-secondary hover:text-primary transition-colors duration-300">
              ← back
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
            {/* Left — the rankings, sticky */}
            <motion.div
              className="md:sticky md:top-14"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="mb-10">
                <h1 className="text-h1 font-display">travel</h1>
              </div>
              <div className="space-y-7">
                {TOP_THREES.map((cat) => (
                  <div key={cat.category}>
                    <h2 className="text-h3 font-display mb-1.5">{cat.category}</h2>
                    <div className="space-y-0.5">
                      {cat.picks.map((p) => (
                        <p key={p.name} className="text-body font-mono text-primary">{p.name}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — the photo wall */}
            <div>
              <PhotoWall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

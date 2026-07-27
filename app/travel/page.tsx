"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TOP_THREES, PHOTOS, type Photo } from "./data";

const ease = [0.16, 1, 0.3, 1] as const;

const listV = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const blockV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/* ---- left rail: "my tops", rank digit rolls to a bright copy on hover ---- */
function Rail() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="md:sticky md:top-14"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="mb-9">
        <h1 className="text-h1 font-display">my tops</h1>
        <p className="text-body text-secondary mt-3">My favorite places on earth.</p>
      </div>

      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <motion.div key={cat.category} variants={blockV} className="py-4 border-b border-border">
            <p className="text-caption font-mono text-accent-dim mb-2.5 tracking-widest uppercase">{cat.category}</p>
            <div className="space-y-1.5">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="group flex items-baseline gap-2.5 cursor-default">
                  <span className="relative block h-[1.15em] w-6 shrink-0 overflow-hidden font-mono text-caption">
                    <span className="block text-muted/70 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      0{i + 1}
                    </span>
                    <span className="absolute inset-0 block translate-y-full text-accent-bright transition-transform duration-300 ease-out group-hover:translate-y-0">
                      0{i + 1}
                    </span>
                  </span>
                  <span className="text-body font-display transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---- one photo tile: blur-up on load, deeper zoom on hover, tap feedback ---- */
function WallPhoto({ p, i, onOpen }: { p: Photo; i: number; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.button
      layoutId={`p-${i}`}
      onClick={onOpen}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (i % 12) * 0.03, duration: 0.6, ease }}
      whileHover={reduced ? {} : { y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full break-inside-avoid rounded-md overflow-hidden focus:outline-none will-change-transform"
      style={{ background: "var(--color-surface)", aspectRatio: p.o === "l" ? "3 / 2" : "2 / 3" }}
      aria-label={p.caption || "Open photo"}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.04 }}
        transition={{ duration: 0.7, ease }}
      >
        <Image
          src={p.src}
          alt={p.caption || "travel"}
          fill
          sizes="400px"
          onLoad={() => setLoaded(true)}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
        />
      </motion.div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition duration-300" />
    </motion.button>
  );
}

/* ---- polished lightbox: spring shared-layout, drag-to-dismiss, keys ---- */
function PhotoWall() {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + PHOTOS.length) % PHOTOS.length));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="columns-2 gap-2 [&>*]:mb-2">
        {PHOTOS.map((p, i) => (
          <WallPhoto key={i} p={p} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease }}
            style={{ background: "rgba(6,6,4,0.9)" }}
            onClick={close}
          >
            <motion.div
              key={open}
              layoutId={`p-${open}`}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.4}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.y) > 120 || Math.abs(info.velocity.y) > 500) close();
              }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              className="relative rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ width: "min(90vw, 1100px)", height: "min(80vh, 780px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[open].src}
                alt={PHOTOS[open].caption}
                fill
                className="object-contain pointer-events-none select-none"
                sizes="90vw"
                priority
              />
            </motion.div>

            {PHOTOS[open].caption && (
              <motion.p
                key={`cap-${open}`}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption font-mono text-secondary"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease, delay: 0.1 }}
              >
                {PHOTOS[open].caption}
              </motion.p>
            )}

            <span className="absolute top-6 left-6 text-caption font-mono text-muted tabular-nums">
              {String(open + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary text-2xl font-mono transition-all duration-200 hover:-translate-x-0.5"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary text-2xl font-mono transition-all duration-200 hover:translate-x-0.5"
              aria-label="Next"
            >
              ›
            </button>
            <button
              onClick={close}
              className="absolute top-5 right-5 w-8 h-8 grid place-items-center rounded-full text-secondary hover:text-primary hover:bg-elevated transition-all duration-200 hover:rotate-90"
              aria-label="Close"
            >
              ×
            </button>
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
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-caption font-mono text-secondary hover:text-primary transition-colors duration-300"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              back
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
            <Rail />
            <div>
              <PhotoWall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

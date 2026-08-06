"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { Lightbox, type LightboxOrigin } from "../components/Lightbox";
import { elegant } from "../lib/elegant";
import { PHOTOS } from "./species";

// smooth ease-out (no overshoot) — matches the travel grid's calmer entrance
const smooth = [0.16, 1, 0.3, 1] as const;

function Shot({
  i,
  hidden,
  onOpen,
}: {
  i: number;
  hidden: boolean;
  onOpen: (i: number, origin: LightboxOrigin) => void;
}) {
  const reduce = useReducedMotion();
  const p = PHOTOS[i];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: smooth, delay: (i % 3) * 0.05 }}
      className={hidden ? "invisible" : undefined}
    >
      <motion.button
        type="button"
        onClick={(e) => {
          const btn = e.currentTarget;
          const img = btn.querySelector("img");
          const el = img ?? btn;
          const rect = el.getBoundingClientRect();
          const prev = btn.style.transform;
          btn.style.transform = "none"; // neutralize hover pop to read the resting rect
          const restRect = el.getBoundingClientRect();
          btn.style.transform = prev;
          onOpen(i, {
            rect,
            restRect,
            natW: img?.naturalWidth || 3,
            natH: img?.naturalHeight || 4,
          });
        }}
        whileHover={reduce ? undefined : { scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.35, ease: elegant }}
        className="group block w-full text-left focus:outline-none"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-elevated shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={p.caption}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5 group-hover:ring-accent/25 transition-all duration-300" />
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
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null);
  const [hiddenIdx, setHiddenIdx] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="mb-12">
          <PageHeader title="Fishing" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {PHOTOS.map((_, i) => (
            <Shot
              key={i}
              i={i}
              hidden={hiddenIdx === i}
              onOpen={(idx, o) => {
                setOrigin(o);
                setHiddenIdx(idx);
                setOpen(idx);
              }}
            />
          ))}
        </div>
      </div>

      <Lightbox
        photos={PHOTOS}
        index={open}
        origin={origin}
        onChange={setOpen}
        onClosed={() => setHiddenIdx(null)}
      />
    </div>
  );
}

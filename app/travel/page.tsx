"use client";

import Image from "next/image";
import { BackChevron } from "../components/BackChevron";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { TOP_THREES, PHOTOS, type Photo } from "./data";
import { Lightbox, type LightboxOrigin } from "../components/Lightbox";
import { elegant } from "../lib/elegant";

const ease = [0.16, 1, 0.3, 1] as const;

const listV = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const blockV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/* per-letter ripple on hover — each letter hops up + brightens on the Elegant curve,
   staggered left→right. The parent row's whileHover propagates "hover" down to the letters. */
const letterWave = {
  // exit finishes the second half of the hop — a smooth staggered descent, not a chop
  rest: (i: number) => ({
    y: 0,
    color: "var(--color-primary)",
    transition: { duration: 0.5, ease: elegant, delay: i * 0.05 },
  }),
  // hovering rises the letter and holds it (the first half of the hop)
  hover: (i: number) => ({
    y: -5,
    color: "var(--color-accent-bright)",
    transition: { duration: 0.5, ease: elegant, delay: i * 0.05 },
  }),
};

function HoverName({ text }: { text: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <span className="text-body font-display text-primary">{text}</span>;
  }
  return (
    <span aria-label={text} className="inline-block text-body font-display">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          custom={i}
          aria-hidden
          variants={letterWave}
          className="inline-block whitespace-pre"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ---- left rail: "my tops", rank digit rolls to a bright copy on hover ---- */
function Rail() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="order-2 md:order-1 md:sticky md:top-14"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <motion.div key={cat.category} variants={blockV} className="py-4 border-b border-border">
            <p className="text-caption font-mono text-accent-dim mb-2.5 tracking-widest uppercase">{cat.category}</p>
            <div className="space-y-1.5">
              {cat.picks.map((p, i) => (
                <motion.div
                  key={p.name}
                  className="flex w-fit items-baseline gap-2.5 cursor-default"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <span className="w-6 shrink-0 font-mono text-caption text-muted/70 tabular-nums">
                    0{i + 1}
                  </span>
                  <HoverName text={p.name} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ---- one photo tile: blur-up on load, deeper zoom on hover, tap feedback ---- */
function WallPhoto({
  p,
  i,
  hidden,
  onOpen,
}: {
  p: Photo;
  i: number;
  hidden: boolean;
  onOpen: (origin: LightboxOrigin) => void;
}) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.button
      onClick={(e) => {
        const btn = e.currentTarget;
        const img = btn.querySelector("img");
        const el = img ?? btn;
        const rect = el.getBoundingClientRect();
        const prev = btn.style.transform;
        btn.style.transform = "none"; // neutralize hover pop to read the resting rect
        const restRect = el.getBoundingClientRect();
        btn.style.transform = prev;
        // preload/decode the full image so the first open has correct dims + no flash
        // (grid tiles use next/image's optimized URL, so the raw src isn't cached yet)
        const pre = new window.Image();
        let done = false;
        const go = () => {
          if (done) return;
          done = true;
          onOpen({
            rect,
            restRect,
            natW: pre.naturalWidth || (p.o === "l" ? 3 : 2),
            natH: pre.naturalHeight || (p.o === "l" ? 2 : 3),
          });
        };
        pre.onload = go;
        pre.onerror = go;
        pre.src = p.src;
        if (pre.complete && pre.naturalWidth) go();
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (i % 12) * 0.03, duration: 0.6, ease }}
      whileHover={reduced ? {} : { y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.985 }}
      className={`group relative block w-full break-inside-avoid rounded-md overflow-hidden focus:outline-none will-change-transform${hidden ? " invisible" : ""}`}
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
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition duration-300" />
    </motion.button>
  );
}

/* ---- masonry wall + shared smooth Lightbox ---- */
function PhotoWall() {
  const [open, setOpen] = useState<number | null>(null);
  const [origin, setOrigin] = useState<LightboxOrigin | null>(null);
  const [hiddenIdx, setHiddenIdx] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 [&>*]:mb-4">
        {PHOTOS.map((p, i) => (
          <WallPhoto
            key={i}
            p={p}
            i={i}
            hidden={hiddenIdx === i}
            onOpen={(o) => {
              setOrigin(o);
              setHiddenIdx(i);
              setOpen(i);
            }}
          />
        ))}
      </div>

      <Lightbox
        photos={PHOTOS}
        index={open}
        origin={origin}
        onChange={setOpen}
        onClosed={() => setHiddenIdx(null)}
      />
    </>
  );
}

export default function Travel() {
  const reduced = useReducedMotion();
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* chevron pinned to the content's left edge; "travel" centered over the right (photo) column */}
          <motion.div
            className="mb-12 flex items-center gap-4 md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] md:gap-16 md:items-center"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <BackChevron href="/" />
            <h1 className="flex-1 md:flex-none text-h2 font-display text-primary text-center leading-none">
              Favorite spots
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
            <Rail />
            <div className="order-1 md:order-2">
              <PhotoWall />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

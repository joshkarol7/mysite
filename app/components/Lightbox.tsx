"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { elegant } from "../lib/elegant";

export type LightboxPhoto = { src: string; caption?: string };
export type LightboxOrigin = {
  rect: DOMRect; // hovered rect at click — the open flies from here
  restRect: DOMRect; // resting rect (hover transform removed) — the close lands here
  natW: number;
  natH: number;
};

type Box = { top: number; left: number; width: number; height: number };

const OPEN = 0.55;
// plain ease-out (no overshoot) — used for the close so it doesn't bounce past the tile
const SMOOTH = [0.16, 1, 0.3, 1] as const;

// centered box at the image's natural aspect, fit within the viewport
function centered(natW: number, natH: number): Box {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mobile = vw < 640;
  const maxW = vw * (mobile ? 0.92 : 0.9);
  const maxH = vh * (mobile ? 0.74 : 0.86); // leave room for the caption + X on phones
  const a = natW / natH || 1;
  let width = maxW;
  let height = width / a;
  if (height > maxH) {
    height = maxH;
    width = height * a;
  }
  return { width, height, left: (vw - width) / 2, top: (vh - height) / 2 };
}

const boxOf = (r: DOMRect): Box => ({
  top: r.top,
  left: r.left,
  width: r.width,
  height: r.height,
});

/* caption drifts in letter-by-letter on the Elegant curve */
function DriftCaption({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const letters = useMemo(() => Array.from(text), [text]);

  if (reduce) {
    return <p className="text-body font-mono text-secondary">{text}</p>;
  }

  return (
    <motion.p
      aria-label={text}
      className="flex flex-wrap justify-center text-body font-mono text-secondary"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.02, delayChildren: 0.18 } } }}
    >
      {letters.map((ch, idx) => (
        <motion.span
          key={idx}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { y: 8, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: OPEN, ease: elegant } },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.p>
  );
}

// One open lightbox: backdrop + flipping image + chrome. AnimatePresence drives
// enter/exit so the exit finishes cleanly before the parent reveals the tile.
function Frame({
  photo,
  origin,
  reduce,
  onClose,
}: {
  photo: LightboxPhoto;
  origin: LightboxOrigin;
  reduce: boolean;
  onClose: () => void;
}) {
  const center = useMemo(
    () => centered(origin.natW || 3, origin.natH || 2),
    [origin]
  );
  const tile = useMemo(() => boxOf(origin.rect), [origin]); // open flies from the hovered rect
  const tileRest = useMemo(() => boxOf(origin.restRect), [origin]); // close lands on the resting rect
  const flip = !reduce;

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 cursor-zoom-out"
        style={{ background: "rgba(6,6,4,0.9)" }}
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: elegant }}
        onClick={onClose}
      />

      {/* the image animates real top/left/width/height (object-cover reveals the
          photo — never stretches). initial = tile, animate = centered, exit = tile. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={photo.src}
        alt={photo.caption ?? ""}
        draggable={false}
        style={{ position: "fixed", willChange: "top, left, width, height" }}
        className="object-cover select-none shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] cursor-zoom-out"
        initial={flip ? { ...tile, borderRadius: 6, opacity: 1 } : { ...center, borderRadius: 8, opacity: 0 }}
        animate={{ ...center, borderRadius: 8, opacity: 1 }}
        exit={
          flip
            ? { ...tileRest, borderRadius: 6, opacity: 1, transition: { duration: 0.48, ease: SMOOTH } }
            : { ...center, opacity: 0, transition: { duration: 0.3, ease: SMOOTH } }
        }
        transition={{ duration: OPEN, ease: elegant }}
        onClick={onClose}
      />

      <motion.div
        className="pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: elegant }}
      >
        {photo.caption && (
          <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 px-4">
            <DriftCaption text={photo.caption} />
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="pointer-events-auto absolute top-5 right-5 w-9 h-9 grid place-items-center rounded-full text-secondary hover:text-primary hover:bg-elevated transition-all duration-200 hover:rotate-90"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 6 L18 18 M18 6 L6 18" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}

export function Lightbox({
  photos,
  index,
  origin,
  onChange,
  onClosed,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  origin: LightboxOrigin | null;
  onChange: (i: number | null) => void;
  onClosed?: () => void;
}) {
  const reduce = useReducedMotion();
  const photo = index !== null ? photos[index] : null;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange]);

  // lock body scroll while open (iOS-safe: pin the body + restore scroll on close)
  useEffect(() => {
    if (index === null) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [index]);

  return (
    <AnimatePresence onExitComplete={onClosed}>
      {photo && origin && (
        <Frame
          key="lightbox"
          photo={photo}
          origin={origin}
          reduce={!!reduce}
          onClose={() => onChange(null)}
        />
      )}
    </AnimatePresence>
  );
}

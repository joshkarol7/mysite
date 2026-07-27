"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { TOP_THREES, PHOTOS, type Photo } from "../travel/data";

/* Refined ease-out (expo-ish) — the whole lab breathes on one curve. */
const ease = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════
 * SHELL — locked structure: animated back link, sticky left
 * rail (the "my tops" list), photo wall on the right. Every
 * variant passes a `rail` + `wall`. Copy never changes.
 * ═══════════════════════════════════════════════════════════ */
function BackLink() {
  return (
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
  );
}

function PolishPage({ rail, wall }: { rail: ReactNode; wall: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <BackLink />
          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
            <div className="md:sticky md:top-14">{rail}</div>
            <div>{wall}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * THE HEAD — "my tops" / one line. Optional rise-reveal.
 * ═══════════════════════════════════════════════════════════ */
function Head({ reveal = false }: { reveal?: boolean }) {
  const reduced = useReducedMotion();
  if (reveal && !reduced) {
    return (
      <div className="mb-9">
        <div className="overflow-hidden">
          <motion.h1
            className="text-h1 font-display"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.05 }}
          >
            my tops
          </motion.h1>
        </div>
        <motion.p
          className="text-body text-secondary mt-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          My favorite places on earth.
        </motion.p>
      </div>
    );
  }
  return (
    <motion.div
      className="mb-9"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <h1 className="text-h1 font-display">my tops</h1>
      <p className="text-body text-secondary mt-3">My favorite places on earth.</p>
    </motion.div>
  );
}

/* Shared stagger for the category blocks. */
const listV = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const blockV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function Cat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.div variants={blockV} className="py-4 border-b border-border">
      <p className="text-caption font-mono text-accent-dim mb-2.5 tracking-widest uppercase">{label}</p>
      <div className="space-y-1.5">{children}</div>
    </motion.div>
  );
}

function Num({ i }: { i: number }) {
  return <span className="font-mono text-caption text-muted/70 w-6 shrink-0">0{i + 1}</span>;
}

/* ═══════════════════════════════════════════════════════════
 * LEFT-RAIL PERSONALITIES
 * ═══════════════════════════════════════════════════════════ */

/* Base — name glides right, number lifts to the bright accent. */
function RailBase({ reveal = false }: { reveal?: boolean }) {
  return (
    <>
      <Head reveal={reveal} />
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <Cat key={cat.category} label={cat.category}>
            {cat.picks.map((p, i) => (
              <div key={p.name} className="group flex items-baseline gap-2.5 cursor-default">
                <span className="font-mono text-caption text-muted/70 w-6 shrink-0 transition-colors duration-300 group-hover:text-accent-bright">
                  0{i + 1}
                </span>
                <span className="text-body font-display transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {p.name}
                </span>
              </div>
            ))}
          </Cat>
        ))}
      </motion.div>
    </>
  );
}

/* Magnetic — a hairline accent bar wipes in on the left of each pick. */
function RailMagnetic() {
  return (
    <>
      <Head />
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <Cat key={cat.category} label={cat.category}>
            {cat.picks.map((p, i) => (
              <div key={p.name} className="group relative flex items-baseline gap-2.5 pl-3.5 cursor-default">
                <span className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 origin-center scale-y-0 bg-accent-bright transition-transform duration-300 ease-out group-hover:scale-y-100" />
                <Num i={i} />
                <span className="text-body font-display transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  {p.name}
                </span>
              </div>
            ))}
          </Cat>
        ))}
      </motion.div>
    </>
  );
}

/* Focus — hover a pick, its siblings fade back. A quiet spotlight. */
function RailFocus() {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <>
      <Head />
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <Cat key={cat.category} label={cat.category}>
            {cat.picks.map((p, i) => (
              <div
                key={p.name}
                onMouseEnter={() => setHov(p.name)}
                onMouseLeave={() => setHov(null)}
                className="flex items-baseline gap-2.5 cursor-default transition-[opacity,transform] duration-300 ease-out"
                style={{
                  opacity: hov && hov !== p.name ? 0.35 : 1,
                  transform: hov === p.name ? "translateX(3px)" : "none",
                }}
              >
                <span
                  className="font-mono text-caption w-6 shrink-0 transition-colors duration-300"
                  style={{ color: hov === p.name ? "var(--color-accent-bright)" : "var(--color-muted)" }}
                >
                  0{i + 1}
                </span>
                <span className="text-body font-display">{p.name}</span>
              </div>
            ))}
          </Cat>
        ))}
      </motion.div>
    </>
  );
}

/* Roll — the rank digit rolls up into a bright copy of itself. */
function RailRoll() {
  return (
    <>
      <Head />
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <Cat key={cat.category} label={cat.category}>
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
          </Cat>
        ))}
      </motion.div>
    </>
  );
}

/* Underline — the category label draws its own rule on hover. */
function RailUnderline() {
  return (
    <>
      <Head />
      <motion.div className="border-t border-border" variants={listV} initial="hidden" animate="show">
        {TOP_THREES.map((cat) => (
          <motion.div key={cat.category} variants={blockV} className="group py-4 border-b border-border">
            <p className="text-caption font-mono text-accent-dim mb-2.5 tracking-widest uppercase">
              <span className="relative inline-block">
                {cat.category}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent-dim transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </p>
            <div className="space-y-1.5">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="flex items-baseline gap-2.5 cursor-default">
                  <Num i={i} />
                  <span className="text-body font-display">{p.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
 * THE LIGHTBOX — shared. Spring shared-layout, drag-to-dismiss,
 * arrow keys + esc, minimal glyph controls, numeric index.
 * ═══════════════════════════════════════════════════════════ */
function Lightbox({
  photos,
  open,
  close,
  step,
}: {
  photos: Photo[];
  open: number | null;
  close: () => void;
  step: (d: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  return (
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
              src={photos[open].src}
              alt={photos[open].caption}
              fill
              className="object-contain pointer-events-none select-none"
              sizes="90vw"
              priority
            />
          </motion.div>

          {photos[open].caption && (
            <motion.p
              key={`cap-${open}`}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption font-mono text-secondary"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.1 }}
            >
              {photos[open].caption}
            </motion.p>
          )}

          <span className="absolute top-6 left-6 text-caption font-mono text-muted tabular-nums">
            {String(open + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
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
  );
}

/* ═══════════════════════════════════════════════════════════
 * THE PHOTO WALL — one masonry, flavored hovers + reveals.
 * hover:  "lift" | "zoom" | "focus"
 * reveal: "fade" | "clip" | "blur"
 * ═══════════════════════════════════════════════════════════ */
function WallPhoto({
  p,
  i,
  hover,
  reveal,
  dim,
  onHover,
  onOpen,
}: {
  p: Photo;
  i: number;
  hover: "lift" | "zoom" | "focus";
  reveal: "fade" | "clip" | "blur";
  dim: boolean;
  onHover: (i: number | null) => void;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  const init = reduced
    ? { opacity: 0 }
    : reveal === "clip"
    ? { opacity: 0, clipPath: "inset(16% 0 0 0)" }
    : reveal === "blur"
    ? { opacity: 0, y: 10, filter: "blur(10px)" }
    : { opacity: 0, y: 12 };
  const inView = reduced
    ? { opacity: 1 }
    : reveal === "clip"
    ? { opacity: 1, clipPath: "inset(0% 0 0 0)" }
    : reveal === "blur"
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 1, y: 0 };
  const hoverAnim = reduced ? {} : hover === "lift" ? { y: -5, scale: 1.03 } : hover === "focus" ? { scale: 1.02 } : {};

  return (
    <motion.button
      layoutId={`p-${i}`}
      onClick={onOpen}
      onHoverStart={() => onHover(i)}
      onHoverEnd={() => onHover(null)}
      initial={init}
      whileInView={inView}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (i % 12) * 0.03, duration: 0.6, ease }}
      whileHover={hoverAnim}
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
          className={`object-cover transition-transform duration-[600ms] ease-out ${
            hover === "zoom" ? "group-hover:scale-[1.08]" : "group-hover:scale-[1.05]"
          }`}
        />
      </motion.div>
      {/* focus veil — darkens the un-hovered tiles */}
      <div
        className="absolute inset-0 bg-deep transition-opacity duration-300 pointer-events-none"
        style={{ opacity: dim ? 0.5 : 0 }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition duration-300" />
    </motion.button>
  );
}

function PhotoWall({
  hover = "lift",
  reveal = "fade",
}: {
  hover?: "lift" | "zoom" | "focus";
  reveal?: "fade" | "clip" | "blur";
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + PHOTOS.length) % PHOTOS.length));

  return (
    <>
      <div className="columns-2 gap-2 [&>*]:mb-2">
        {PHOTOS.map((p, i) => (
          <WallPhoto
            key={i}
            p={p}
            i={i}
            hover={hover}
            reveal={reveal}
            dim={hover === "focus" && hov !== null && hov !== i}
            onHover={setHov}
            onOpen={() => setOpen(i)}
          />
        ))}
      </div>
      <Lightbox photos={PHOTOS} open={open} close={close} step={step} />
    </>
  );
}

/* Tilt wall — each tile leans toward the cursor (spring-damped). */
function TiltPhoto({ p, i, onOpen }: { p: Photo; i: number; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rY = useSpring(mx, { stiffness: 150, damping: 15 });
  const rX = useSpring(my, { stiffness: 150, damping: 15 });

  return (
    <motion.button
      layoutId={`p-${i}`}
      onClick={onOpen}
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        my.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (i % 12) * 0.03, duration: 0.6, ease }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.985 }}
      style={{
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 700,
        background: "var(--color-surface)",
        aspectRatio: p.o === "l" ? "3 / 2" : "2 / 3",
      }}
      className="group relative block w-full break-inside-avoid rounded-md overflow-hidden focus:outline-none will-change-transform"
      aria-label={p.caption || "Open photo"}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <Image
          src={p.src}
          alt={p.caption || "travel"}
          fill
          sizes="400px"
          onLoad={() => setLoaded(true)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </motion.div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition duration-300" />
    </motion.button>
  );
}

function TiltWall() {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + PHOTOS.length) % PHOTOS.length));
  return (
    <>
      <div className="columns-2 gap-2 [&>*]:mb-2">
        {PHOTOS.map((p, i) => (
          <TiltPhoto key={i} p={p} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <Lightbox photos={PHOTOS} open={open} close={close} step={step} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
 * VARIANTS — rail personality × wall personality. Same page.
 * ═══════════════════════════════════════════════════════════ */
export function VarRefined() { return <PolishPage rail={<RailBase />} wall={<PhotoWall hover="lift" reveal="fade" />} />; }
export function VarReveal() { return <PolishPage rail={<RailBase reveal />} wall={<PhotoWall hover="lift" reveal="clip" />} />; }
export function VarMagnetic() { return <PolishPage rail={<RailMagnetic />} wall={<PhotoWall hover="lift" reveal="fade" />} />; }
export function VarFocus() { return <PolishPage rail={<RailFocus />} wall={<PhotoWall hover="focus" reveal="fade" />} />; }
export function VarTactile() { return <PolishPage rail={<RailRoll />} wall={<PhotoWall hover="zoom" reveal="fade" />} />; }
export function VarTilt() { return <PolishPage rail={<RailBase />} wall={<TiltWall />} />; }
export function VarEditorial() { return <PolishPage rail={<RailUnderline />} wall={<PhotoWall hover="zoom" reveal="fade" />} />; }
export function VarSoft() { return <PolishPage rail={<RailBase />} wall={<PhotoWall hover="lift" reveal="blur" />} />; }

export const VARIANTS = [
  { key: "refined", name: "Refined", hint: "the perfected baseline · glide + lift + blur-up", Comp: VarRefined },
  { key: "reveal", name: "Reveal", hint: "title rises · photos clip-reveal in", Comp: VarReveal },
  { key: "magnetic", name: "Magnetic", hint: "accent bar wipes in beside each pick", Comp: VarMagnetic },
  { key: "focus", name: "Focus", hint: "hover dims the rest · quiet spotlight", Comp: VarFocus },
  { key: "tactile", name: "Tactile", hint: "rank digit rolls · deeper photo zoom", Comp: VarTactile },
  { key: "tilt", name: "Tilt", hint: "tiles lean toward the cursor (spring)", Comp: VarTilt },
  { key: "editorial", name: "Editorial", hint: "category rule draws · zoom-only photos", Comp: VarEditorial },
  { key: "soft", name: "Soft", hint: "photos de-blur into place · dreamy", Comp: VarSoft },
] as const;

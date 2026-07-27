"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { TOP_THREES, PHOTOS, type Photo } from "../travel/data";

const ease = [0.14, 1, 0.34, 1] as const;
const RANK = ["1", "2", "3"];

/* ═══════════════════════════════════════════════════════════
 * SHARED — the right-hand photo wall + lightbox. Identical for
 * every variant. We only ever experiment on the LEFT rail.
 * ═══════════════════════════════════════════════════════════ */
function Gallery({ photos = PHOTOS }: { photos?: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));

  return (
    <>
      <div className="columns-2 gap-2 [&>*]:mb-2">
        {photos.map((p, i) => (
          <motion.button
            key={i}
            layoutId={`g-${i}`}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: (i % 12) * 0.02, duration: 0.4, ease }}
            className="group relative block w-full break-inside-avoid rounded-md overflow-hidden focus:outline-none"
            style={{ background: "var(--color-surface)", aspectRatio: p.o === "l" ? "3 / 2" : "2 / 3" }}
            aria-label={p.caption || "Open photo"}
          >
            <Image src={p.src} alt={p.caption || "travel"} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
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
              layoutId={`g-${open}`}
              className="relative rounded-lg overflow-hidden"
              style={{ width: "min(90vw, 1100px)", height: "min(80vh, 780px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={photos[open].src} alt={photos[open].caption} fill className="object-contain" sizes="90vw" />
            </motion.div>
            {photos[open].caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption font-mono text-secondary">
                {photos[open].caption}
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

/* ═══════════════════════════════════════════════════════════
 * THE SHELL — locked. Sticky left rail (the experiment) + the
 * photo wall (constant). Every variant just passes a different
 * `left`. Structure never changes.
 * ═══════════════════════════════════════════════════════════ */
function SplitShell({ left }: { left: ReactNode }) {
  return (
    <div className="min-h-screen px-5 md:px-12 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">
          <div className="md:sticky md:top-14">{left}</div>
          <div><Gallery /></div>
        </div>
      </div>
    </div>
  );
}

/* ---- shared copy (title options + explainer) ---------------------- */
const LEDE = "My favorite places on earth, ranked three deep. Opinions here, proof on the right.";

function TopsBadge() {
  return (
    <span className="inline-flex items-center gap-2 text-caption font-mono tracking-widest uppercase text-accent-dim">
      <span className="inline-block w-6 h-px bg-current" />
      my tops · ranked 1→3
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
 * LEFT-RAIL VARIANTS — only this column changes between them.
 * ═══════════════════════════════════════════════════════════ */

/* 1 · LABELED — badge + lede, then name · where with an opacity ramp. */
function LeftLabeled() {
  return (
    <>
      <div className="mb-9">
        <TopsBadge />
        <h1 className="text-h1 font-display mt-4">my tops</h1>
        <p className="text-body text-secondary mt-3 leading-relaxed">{LEDE}</p>
      </div>
      <div className="space-y-7">
        {TOP_THREES.map((cat) => (
          <div key={cat.category}>
            <p className="text-caption font-mono text-accent-dim mb-2.5">{cat.category}</p>
            <div className="space-y-1.5">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="flex items-baseline gap-2.5" style={{ opacity: 1 - i * 0.22 }}>
                  <span className="font-mono text-caption text-muted w-3 shrink-0">{RANK[i]}</span>
                  <span className="text-body font-display">{p.name}</span>
                  <span className="text-caption font-mono text-muted truncate">{p.where}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* 2 · WITH NOTES — same header, but every pick shows its one-liner. */
function LeftNotes() {
  return (
    <>
      <div className="mb-9">
        <TopsBadge />
        <h1 className="text-h1 font-display mt-4">my tops</h1>
        <p className="text-body text-secondary mt-3 leading-relaxed">{LEDE}</p>
      </div>
      <div className="space-y-6">
        {TOP_THREES.map((cat) => (
          <div key={cat.category}>
            <p className="text-caption font-mono text-accent-dim mb-2.5">{cat.category}</p>
            <div className="space-y-2.5">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="flex items-baseline gap-2.5">
                  <span className="font-mono text-caption text-muted w-3 shrink-0 pt-0.5">{RANK[i]}</span>
                  <div className="min-w-0">
                    <span className="text-body font-display">{p.name}</span>
                    <span className="text-caption font-mono text-muted ml-2">{p.where}</span>
                    <p className="text-caption font-mono text-secondary/80 leading-snug mt-0.5">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* 3 · BIG ONE — #1 rendered larger, 2·3 dim beneath it. */
function LeftBigOne() {
  return (
    <>
      <div className="mb-9">
        <TopsBadge />
        <h1 className="text-h1 font-display mt-4">my tops</h1>
      </div>
      <div className="space-y-7">
        {TOP_THREES.map((cat) => {
          const [first, ...rest] = cat.picks;
          return (
            <div key={cat.category}>
              <p className="text-caption font-mono text-accent-dim mb-2">{cat.category}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-h3 font-display">{first.name}</span>
                <span className="text-caption font-mono text-muted">{first.where}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 pl-0.5">
                {rest.map((p, i) => (
                  <span key={p.name} className="text-caption font-mono text-muted">
                    <span className="text-secondary">{i + 2}</span> {p.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* 4 · NUMBERED — 01/02/03 mono prefixes, hairline dividers per category. */
function LeftNumbered() {
  return (
    <>
      <div className="mb-9">
        <h1 className="text-h1 font-display">my tops</h1>
        <p className="text-body text-secondary mt-3">My favorite places on earth.</p>
      </div>
      <div className="border-t border-border">
        {TOP_THREES.map((cat) => (
          <div key={cat.category} className="py-4 border-b border-border">
            <p className="text-caption font-mono text-accent-dim mb-2.5 tracking-widest uppercase">{cat.category}</p>
            <div className="space-y-1.5">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="flex items-baseline gap-2.5">
                  <span className="font-mono text-caption text-muted/70 w-6 shrink-0">0{RANK[i]}</span>
                  <span className="text-body font-display">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* 5 · EYEBROW — category as a tiny tracked eyebrow, names bigger, no ranks. */
function LeftEyebrow() {
  return (
    <>
      <div className="mb-10">
        <TopsBadge />
        <h1 className="text-h1 font-display mt-4">favorites</h1>
      </div>
      <div className="space-y-8">
        {TOP_THREES.map((cat) => (
          <div key={cat.category}>
            <p className="text-[10px] font-mono text-muted mb-2 tracking-[0.35em] uppercase">{cat.category}</p>
            <div className="space-y-0.5">
              {cat.picks.map((p) => (
                <p key={p.name} className="text-body font-display">{p.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* 6 · LEADER — name · · · where, dotted leader line, magazine-index feel. */
function LeftLeader() {
  return (
    <>
      <div className="mb-9">
        <TopsBadge />
        <h1 className="text-h1 font-display mt-4">the list</h1>
        <p className="text-body text-secondary mt-3 leading-relaxed">{LEDE}</p>
      </div>
      <div className="space-y-6">
        {TOP_THREES.map((cat) => (
          <div key={cat.category}>
            <p className="text-caption font-mono text-accent-dim mb-2">{cat.category}</p>
            <div className="space-y-1">
              {cat.picks.map((p, i) => (
                <div key={p.name} className="flex items-baseline gap-2 text-caption font-mono">
                  <span className="text-muted w-3 shrink-0">{RANK[i]}</span>
                  <span className="text-body font-display leading-tight">{p.name}</span>
                  <span className="flex-1 border-b border-dotted border-border translate-y-[-3px]" />
                  <span className="text-muted shrink-0">{p.where}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* 7 · COMPACT — dense, quiet, small type. Two categories can sit tight. */
function LeftCompact() {
  return (
    <>
      <div className="mb-8">
        <TopsBadge />
        <h1 className="text-h2 font-display mt-3">my tops</h1>
      </div>
      <div className="space-y-5">
        {TOP_THREES.map((cat) => (
          <div key={cat.category}>
            <p className="text-[10px] font-mono text-accent-dim mb-1 tracking-widest uppercase">{cat.category}</p>
            <p className="text-caption font-mono text-secondary leading-relaxed">
              {cat.picks.map((p, i) => (
                <span key={p.name}>
                  <span className="text-primary font-display">{p.name}</span>
                  <span className="text-muted">{i < 2 ? "  ·  " : ""}</span>
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export function VarLabeled() { return <SplitShell left={<LeftLabeled />} />; }
export function VarNotes() { return <SplitShell left={<LeftNotes />} />; }
export function VarBigOne() { return <SplitShell left={<LeftBigOne />} />; }
export function VarNumbered() { return <SplitShell left={<LeftNumbered />} />; }
export function VarEyebrow() { return <SplitShell left={<LeftEyebrow />} />; }
export function VarLeader() { return <SplitShell left={<LeftLeader />} />; }
export function VarCompact() { return <SplitShell left={<LeftCompact />} />; }

export const VARIANTS = [
  { key: "labeled", name: "Labeled", hint: "badge + lede · name · where, opacity ramp", Comp: VarLabeled },
  { key: "notes", name: "With Notes", hint: "each pick shows its one-liner", Comp: VarNotes },
  { key: "bigone", name: "Big One", hint: "#1 large · 2·3 dim beneath", Comp: VarBigOne },
  { key: "numbered", name: "Numbered", hint: "01/02/03 · hairline dividers", Comp: VarNumbered },
  { key: "eyebrow", name: "Eyebrow", hint: "tiny tracked category · names only", Comp: VarEyebrow },
  { key: "leader", name: "Leader", hint: "name · · · where dotted index", Comp: VarLeader },
  { key: "compact", name: "Compact", hint: "dense · picks inline, quiet", Comp: VarCompact },
] as const;

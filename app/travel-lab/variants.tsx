"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TOP_THREES, PHOTOS, type Photo } from "../travel/data";

const ease = [0.14, 1, 0.34, 1] as const;
const RANK = ["1", "2", "3"];

/* ═══════════════════════════════════════════════════════════
 * SHARED PRIMITIVES
 * ═══════════════════════════════════════════════════════════ */

/* Small photo thumbnails that expand to a full lightbox (shared layout). */
function Gallery({
  photos = PHOTOS,
  cols = "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
  tone = "dark",
  masonry = false,
}: {
  photos?: Photo[];
  cols?: string;
  tone?: "dark" | "light";
  masonry?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const step = (d: number) =>
    setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));
  const bg = tone === "dark" ? "var(--color-surface)" : "#e7e0d1";

  return (
    <>
      {masonry ? (
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
              style={{ background: bg, aspectRatio: p.o === "l" ? "3 / 2" : "2 / 3" }}
              aria-label={p.caption || "Open photo"}
            >
              <Image src={p.src} alt={p.caption || "travel"} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition" />
            </motion.button>
          ))}
        </div>
      ) : (
        <div className={`grid ${cols} gap-2`}>
          {photos.map((p, i) => (
            <motion.button
              key={i}
              layoutId={`g-${i}`}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: (i % 12) * 0.02, duration: 0.4, ease }}
              whileHover={{ scale: 1.04 }}
              className="group relative aspect-square rounded-md overflow-hidden focus:outline-none"
              style={{ background: bg }}
              aria-label={p.caption || "Open photo"}
            >
              <Image src={p.src} alt={p.caption || "travel"} fill sizes="200px" className="object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition" />
            </motion.button>
          ))}
        </div>
      )}

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

function LabHeader({ n, title, sub, tone = "dark" }: { n: string; title: string; sub: string; tone?: "dark" | "light" }) {
  const dim = tone === "dark" ? "var(--color-accent-dim)" : "#a2977f";
  const muted = tone === "dark" ? "var(--color-muted)" : "#a2977f";
  return (
    <div className="mb-14">
      <span className="text-caption font-mono block mb-3" style={{ color: dim }}>{n}</span>
      <h1 className="text-h1 font-display">{title}</h1>
      <p className="text-caption font-mono mt-2 tracking-widest" style={{ color: muted }}>{sub}</p>
    </div>
  );
}

function PhotoSection({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="mt-24">
      <p className="text-caption font-mono mb-4" style={{ color: tone === "dark" ? "var(--color-accent-dim)" : "#a2977f" }}>
        from the road
      </p>
      <Gallery tone={tone} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 1 · PODIUM — the core. Each category, 1·2·3 with weight ramp.
 * ═══════════════════════════════════════════════════════════ */
export function VarPodium() {
  const size = ["text-h2", "text-h3", "text-h3"];
  const op = [1, 0.72, 0.52];
  return (
    <div className="min-h-screen px-5 md:px-12 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto">
        <LabHeader n="03" title="top threes" sub="the only rankings that matter" />

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {TOP_THREES.map((cat) => (
            <div key={cat.category}>
              <p className="text-caption font-mono text-accent-dim border-b border-border pb-3 mb-5">{cat.category}</p>
              <div className="space-y-4">
                {cat.picks.map((p, i) => (
                  <div key={p.name} className="flex items-baseline gap-4" style={{ opacity: op[i] }}>
                    <span className="font-display leading-none w-6 shrink-0" style={{ fontSize: i === 0 ? "1.9rem" : "1.3rem" }}>{RANK[i]}</span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`${size[i]} font-display`}>{p.name}</span>
                        <span className="text-caption font-mono text-muted">{p.where}</span>
                      </div>
                      <p className="text-body text-secondary mt-0.5">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <PhotoSection />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 2 · TERMINAL — top threes as CLI output.
 * ═══════════════════════════════════════════════════════════ */
export function VarTerminal() {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-3xl mx-auto">
        {TOP_THREES.map((cat) => (
          <div key={cat.category} className="mb-8">
            <p className="text-body font-mono">
              <span className="text-muted">josh@earth</span>
              <span className="text-secondary"> ~/travel</span>
              <span className="text-muted"> % </span>
              <span className="text-primary">top {slug(cat.category)}</span>
            </p>
            {cat.picks.map((p, i) => (
              <p key={p.name} className="text-body font-mono leading-relaxed">
                <span className="text-primary">{RANK[i]}.</span>
                <span className="text-primary inline-block w-48 ml-2">{p.name}</span>
                <span className="text-muted inline-block w-40">{p.where}</span>
                <span className="text-secondary">{p.note}</span>
              </p>
            ))}
          </div>
        ))}
        <p className="text-body font-mono mt-10">
          <span className="text-muted">josh@earth</span>
          <span className="text-secondary"> ~/travel</span>
          <span className="text-muted"> % </span>
          <span className="text-primary">ls photos/</span>
        </p>
        <div className="mt-3">
          <Gallery cols="grid-cols-4 sm:grid-cols-6" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 3 · CARDS — a card per category, picks stacked, hover for note.
 * ═══════════════════════════════════════════════════════════ */
export function VarCards() {
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <LabHeader n="03" title="top threes" sub="ranked, and i'll defend them" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_THREES.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease }}
              className="rounded-xl border border-border bg-surface p-6 hover:border-secondary/60 transition-colors"
            >
              <p className="text-caption font-mono text-accent-dim mb-5">{cat.category}</p>
              <div className="space-y-4">
                {cat.picks.map((p, i) => (
                  <div key={p.name} className="group flex items-baseline gap-3">
                    <span className="font-display text-muted w-5 shrink-0" style={{ opacity: 1 - i * 0.28 }}>{RANK[i]}</span>
                    <div>
                      <span className="text-h3 font-display">{p.name}</span>
                      <span className="text-caption font-mono text-muted ml-2">{p.where}</span>
                      <p className="text-caption font-mono text-secondary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-12 overflow-hidden">{p.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <PhotoSection />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 4 · EDITORIAL — magazine spread. Big headline, ranked list, hero.
 * ═══════════════════════════════════════════════════════════ */
export function VarEditorial() {
  const hero = PHOTOS[0];
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-border pb-6 mb-12">
          <span className="text-caption font-mono text-accent-dim">issue 03 · travel</span>
          <h1 className="font-display mt-2" style={{ fontSize: "clamp(2.6rem,8vw,6rem)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            top threes,<br />no ties.
          </h1>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-14">
          <div>
            {TOP_THREES.map((cat) => (
              <div key={cat.category} className="mb-8">
                <p className="text-caption font-mono text-accent-dim mb-2">{cat.category}</p>
                <ol>
                  {cat.picks.map((p, i) => (
                    <li key={p.name} className="flex items-baseline gap-3 py-1.5 border-b border-border/60 group">
                      <span className="font-mono text-caption text-muted w-4">{RANK[i]}</span>
                      <span className="text-body font-display flex-1">{p.name}</span>
                      <span className="text-caption font-mono text-muted group-hover:text-secondary transition-colors">{p.where}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div>
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-3">
              <Image src={hero.src} alt={hero.caption} fill sizes="700px" className="object-cover" priority />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-caption font-mono text-primary/90">{hero.caption}</span>
              </div>
            </div>
            <Gallery photos={PHOTOS.slice(1)} cols="grid-cols-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 5 · LEDGER — strict typographic grid. Swiss, numbers-forward.
 * ═══════════════════════════════════════════════════════════ */
export function VarLedger() {
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <LabHeader n="03" title="the ledger" sub="top threes · kept honest" />
        <div className="border-t border-border">
          {TOP_THREES.map((cat) => (
            <div key={cat.category} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-8 gap-y-3 py-6 border-b border-border">
              <p className="text-caption font-mono text-accent-dim pt-1">{cat.category}</p>
              <div className="grid sm:grid-cols-3 gap-6">
                {cat.picks.map((p, i) => (
                  <div key={p.name}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-caption text-muted">0{RANK[i]}</span>
                      <span className="text-h3 font-display">{p.name}</span>
                    </div>
                    <p className="text-caption font-mono text-muted mt-1">{p.where}</p>
                    <p className="text-body text-secondary mt-1.5 leading-snug">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <PhotoSection />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 6 · MARQUEE — huge #1 per category, 2·3 as a footnote. Bold.
 * ═══════════════════════════════════════════════════════════ */
export function VarMarquee() {
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <LabHeader n="03" title="top threes" sub="the champions, and the runners-up" />
        <div className="space-y-12">
          {TOP_THREES.map((cat, idx) => {
            const [first, ...rest] = cat.picks;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease }}
                className={`flex flex-col md:flex-row gap-6 md:gap-10 items-baseline border-b border-border pb-10 ${idx % 2 ? "md:flex-row-reverse md:text-right" : ""}`}
              >
                <div className="flex-1">
                  <p className="text-caption font-mono text-accent-dim mb-2">{cat.category}</p>
                  <h2 className="font-display leading-[0.9]" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", letterSpacing: "-0.03em" }}>{first.name}</h2>
                  <p className="text-body text-secondary mt-2">{first.note}</p>
                </div>
                <div className={`flex gap-8 ${idx % 2 ? "md:justify-start" : "md:justify-end"}`}>
                  {rest.map((p, i) => (
                    <div key={p.name}>
                      <span className="font-mono text-caption text-muted">0{i + 2}</span>
                      <p className="text-h3 font-display mt-1">{p.name}</p>
                      <p className="text-caption font-mono text-muted">{p.where}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        <PhotoSection />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 * 7 · SPLIT — left: the top-three lists (sticky). right: images.
 * ═══════════════════════════════════════════════════════════ */
export function VarSplit() {
  return (
    <div className="min-h-screen px-5 md:px-12 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
          {/* left — the rankings, sticky */}
          <div className="md:sticky md:top-14">
            <div className="mb-10">
              <span className="text-caption font-mono text-accent-dim block mb-3">03</span>
              <h1 className="text-h2 font-display">top threes</h1>
              <p className="text-caption font-mono text-muted mt-2 tracking-widest">a few rankings, then the photos</p>
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
          </div>

          {/* right — just images */}
          <div>
            <Gallery masonry />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export const VARIANTS = [
  { key: "podium", name: "Podium", hint: "1·2·3 per category — the core one", Comp: VarPodium },
  { key: "split", name: "Split", hint: "left: rankings (sticky) · right: photo wall", Comp: VarSplit },
  { key: "terminal", name: "Terminal", hint: "top threes as CLI output", Comp: VarTerminal },
  { key: "cards", name: "Cards", hint: "a card per category · hover for the why", Comp: VarCards },
  { key: "editorial", name: "Editorial", hint: "magazine spread · big headline + hero", Comp: VarEditorial },
  { key: "ledger", name: "Ledger", hint: "strict swiss grid · numbers-forward", Comp: VarLedger },
  { key: "marquee", name: "Marquee", hint: "giant #1 · runners-up as a footnote", Comp: VarMarquee },
] as const;

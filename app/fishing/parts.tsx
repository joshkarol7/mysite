"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { SPECIES, PHOTOS, TIERS, type Species } from "./data";

const ease = [0.14, 1, 0.34, 1] as const; // ease-out (M1)
const snappy = [0.175, 0.885, 0.32, 1.1] as const; // hover/tap micro

const caughtCount = SPECIES.filter((s) => s.caught).length;
const totalCount = SPECIES.length;

// ── CountUp ───────────────────────────────────────────────────
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1,
      ease,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
}

// ── Water dot ─────────────────────────────────────────────────
function WaterDot({ water }: { water: Species["water"] }) {
  return (
    <span
      aria-hidden
      title={water}
      className={`h-1.5 w-1.5 rounded-full ${
        water === "salt" ? "bg-accent" : "bg-[#5b8fb0]"
      }`}
    />
  );
}

// ══ VARIANT 1 — TIER LIST ═════════════════════════════════════
function Chip({ s, i, color, glow }: { s: Species; i: number; color: string; glow: string }) {
  return (
    <motion.span
      title={s.latin}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.035, duration: 0.4, ease }}
      whileHover={{ y: -3, scale: 1.06, transition: { duration: 0.18, ease: snappy } }}
      whileTap={{ scale: 0.96 }}
      className="group/chip relative flex items-center gap-2 rounded-lg border border-border bg-elevated/70
                 px-3 py-1.5 cursor-default select-none"
      style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
    >
      <span
        className="absolute inset-0 rounded-lg opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 6px 24px ${glow}`, border: `1px solid ${color}55` }}
      />
      <WaterDot water={s.water} />
      <span className="text-body font-display text-primary leading-none">{s.name}</span>
      {s.note && (
        <span className="max-w-0 overflow-hidden group-hover/chip:max-w-[12rem] transition-[max-width] duration-500 ease-out whitespace-nowrap text-caption font-mono normal-case tracking-normal text-muted">
          {s.note}
        </span>
      )}
    </motion.span>
  );
}

export function TierList() {
  const targets = SPECIES.filter((s) => !s.caught);
  return (
    <div className="space-y-3">
      {TIERS.map((tier) => {
        const fish = SPECIES.filter((s) => s.caught && s.tier === tier.key);
        if (!fish.length) return null;
        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease }}
            className="flex items-stretch gap-3 rounded-xl border border-border bg-surface/40 overflow-hidden"
          >
            <div
              className="flex flex-col items-center justify-center w-20 shrink-0 py-4"
              style={{ background: `linear-gradient(160deg, ${tier.color}22, transparent)` }}
            >
              <span className="text-h2 font-display leading-none" style={{ color: tier.color }}>
                {tier.key}
              </span>
              <span className="mt-1 text-caption font-mono text-muted normal-case tracking-normal text-center px-1">
                {tier.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 py-4 pr-4">
              {fish.map((s, i) => (
                <Chip key={s.name} s={s} i={i} color={tier.color} glow={tier.glow} />
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Wishlist */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-stretch gap-3 rounded-xl border border-dashed border-accent-dim/50 overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center w-20 shrink-0 py-4">
          <span className="text-h3 font-display leading-none text-accent-dim">?</span>
          <span className="mt-1 text-caption font-mono text-muted normal-case tracking-normal">wishlist</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 py-4 pr-4">
          {targets.map((s, i) => (
            <motion.span
              key={s.name}
              title={s.latin}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease }}
              whileHover={{ y: -3, scale: 1.06, transition: { duration: 0.18, ease: snappy } }}
              className="relative flex items-center gap-2 rounded-lg border border-dashed border-secondary/60
                         px-3 py-1.5 cursor-default select-none overflow-hidden"
            >
              <span className="shimmer absolute inset-0 pointer-events-none" />
              <span className="h-1.5 w-1.5 rounded-full border border-secondary" />
              <span className="text-body font-display text-secondary leading-none">{s.name}</span>
              <span className="text-caption font-mono text-accent-dim normal-case tracking-normal">{s.note}</span>
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ══ VARIANT 2 — DEX (collectible cards) ═══════════════════════
function DexCard({ s, i }: { s: Species; i: number }) {
  const photo = PHOTOS[i % PHOTOS.length];
  const tier = TIERS.find((t) => t.key === s.tier);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (i % 6) * 0.04, duration: 0.5, ease }}
      style={{ perspective: 700 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`group relative aspect-[3/4] rounded-xl overflow-hidden border ${
          s.caught ? "border-border" : "border-dashed border-secondary/40"
        }`}
      >
        {/* subtle photo — only the caught cards, faint, warms on hover */}
        {s.caught && (
          <Image
            src={photo}
            alt=""
            fill
            sizes="200px"
            className="object-cover opacity-[0.12] saturate-0 group-hover:opacity-30 group-hover:saturate-100 transition-all duration-500"
          />
        )}
        {!s.caught && <span className="shimmer absolute inset-0 pointer-events-none" />}
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-transparent" />

        <div className="relative h-full flex flex-col justify-between p-3">
          <div className="flex items-center justify-between">
            <span className="text-caption font-mono text-muted">
              {(i + 1).toString().padStart(3, "0")}
            </span>
            {s.caught ? (
              tier && (
                <span
                  className="text-caption font-display leading-none px-1.5 py-0.5 rounded"
                  style={{ color: tier.color, background: `${tier.color}1f` }}
                >
                  {tier.key}
                </span>
              )
            ) : (
              <span className="text-caption font-mono text-accent-dim border border-accent-dim/50 rounded px-1.5 py-px leading-none">
                target
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <WaterDot water={s.water} />
              <span className="text-caption font-mono text-muted normal-case tracking-normal">{s.water}</span>
            </div>
            {s.caught ? (
              <span className="text-body font-display text-primary leading-tight">{s.name}</span>
            ) : (
              <span className="text-body font-display leading-tight">
                <span className="text-muted group-hover:hidden">? ? ?</span>
                <span className="hidden group-hover:inline text-secondary">{s.name}</span>
              </span>
            )}
            <span className="block text-caption font-mono italic normal-case tracking-normal text-muted truncate">
              {s.latin}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Dex() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {SPECIES.map((s, i) => (
        <DexCard key={s.name} s={s} i={i} />
      ))}
    </div>
  );
}

// ══ VARIANT 3 — TERMINAL LOG (hover reveals a subtle photo) ═══
function LogRow({ s, i }: { s: Species; i: number }) {
  const photo = PHOTOS[i % PHOTOS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.025, duration: 0.4, ease }}
      className="group relative grid grid-cols-[2rem_auto_1fr_auto] items-baseline gap-x-3 py-3
                 border-t border-border hover:bg-elevated/40 transition-colors duration-300 -mx-3 px-3 overflow-hidden"
    >
      {/* subtle photo peek from the right on hover */}
      {s.caught && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Image src={photo} alt="" fill sizes="160px" className="object-cover saturate-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/60 to-transparent" />
        </div>
      )}
      <span className="text-caption font-mono text-muted">{(i + 1).toString().padStart(2, "0")}</span>
      <span
        aria-hidden
        className={`translate-y-[-0.05em] h-2 w-2 rounded-full border ${
          s.caught
            ? "bg-accent border-accent shadow-[0_0_10px_rgba(74,158,126,0.5)]"
            : "bg-transparent border-secondary"
        }`}
      />
      <span className="relative flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
        <span className={`text-body font-display ${s.caught ? "text-primary" : "text-secondary"}`}>{s.name}</span>
        <span className="text-caption font-mono italic normal-case tracking-normal text-muted truncate">{s.latin}</span>
        {!s.caught && (
          <span className="text-caption font-mono text-accent-dim border border-accent-dim/50 rounded px-1.5 py-px leading-none">target</span>
        )}
      </span>
      <span className="relative justify-self-end text-right flex flex-col items-end gap-0.5">
        <span className="text-caption font-mono text-secondary">{s.water}</span>
        {s.where && (
          <span className="text-caption font-mono text-muted normal-case tracking-normal hidden sm:block">{s.where}</span>
        )}
      </span>
    </motion.div>
  );
}

export function LogList() {
  const ordered = [...SPECIES.filter((s) => s.caught), ...SPECIES.filter((s) => !s.caught)];
  return (
    <div className="border-b border-border">
      {ordered.map((s, i) => (
        <LogRow key={s.name} s={s} i={i} />
      ))}
    </div>
  );
}

// ── Progress meter (shared header) ────────────────────────────
export function ProgressMeter() {
  const pct = Math.round((caughtCount / totalCount) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-caption font-mono text-secondary">
          species log
          <span className="ml-2 inline-block h-3 w-1.5 -mb-0.5 bg-accent cursor-blink" />
        </span>
        <span className="text-caption font-mono text-muted">
          <CountUp to={caughtCount} className="text-accent" /> / {totalCount} caught
        </span>
      </div>
      <div className="h-px w-full bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
        />
      </div>
    </div>
  );
}

// ── Ambient filmstrip (subtle photos, bottom of page) ─────────
export function Filmstrip() {
  return (
    <div className="mt-20">
      <div className="flex items-baseline justify-between mb-4 max-w-3xl mx-auto">
        <span className="text-caption font-mono text-secondary">the receipts</span>
        <span className="text-caption font-mono text-muted">{PHOTOS.length} frames</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4 px-1 no-scrollbar snap-x">
        {PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: (i % 5) * 0.05, duration: 0.5, ease }}
            className="group relative h-44 w-64 shrink-0 rounded-lg overflow-hidden snap-start"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="256px"
              className="object-cover saturate-0 opacity-60 group-hover:saturate-100 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-lg group-hover:ring-accent/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { caughtCount, totalCount };

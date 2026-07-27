"use client";

import Link from "next/link";
import { VARIANTS } from "./variants";

const CSS = `
.bass { display: block; }
/* globals paints a persistent 3px outline on svg elements — kill it */
.bass, .bass *, .bass-ascii { outline: none !important; }
.fish-card .bass, .fish-card .bass-ascii { pointer-events: auto; }

/* 1 — Ink outline: redraws on hover */
.v-ink path, .v-ink line { stroke-dasharray: 900; }
@keyframes bassDraw { from { stroke-dashoffset: 900; } to { stroke-dashoffset: 0; } }
.fish-card:hover .v-ink path,
.fish-card:hover .v-ink line { animation: bassDraw 1.3s ease forwards; }

/* 2 — Pixel: swims on hover */
.v-pixel { transform-origin: center; }
@keyframes bassSwim {
  0%,100% { transform: translateX(0) rotate(0deg); }
  25%     { transform: translateX(-4px) rotate(-1.6deg); }
  75%     { transform: translateX(4px) rotate(1.6deg); }
}
.fish-card:hover .v-pixel { animation: bassSwim 1s ease-in-out infinite; }

/* 3 — Halftone: dots ripple on hover */
.hdot { transform-box: fill-box; transform-origin: center; }
@keyframes dotPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.6); } }
.fish-card:hover .hdot {
  animation: dotPulse 0.9s ease-in-out infinite;
  animation-delay: calc(var(--d) * 55ms);
}

/* 4 — Shimmer: light sweeps the stripes */
.v-shimmer .glint { transform-box: fill-box; animation: glint 3.4s linear infinite; }
@keyframes glint { 0% { transform: translateX(0); } 100% { transform: translateX(370px); } }
.fish-card:hover .v-shimmer .glint { animation-duration: 1.1s; }

/* 5 — Neon: stripes pulse, glow blooms on hover */
.v-neon { transition: filter 0.3s ease; }
.v-neon .nstripe { stroke: var(--color-primary); }
@keyframes neonPulse { 0%,100% { opacity: 0.32; } 50% { opacity: 1; } }
.v-neon .nstripe {
  animation: neonPulse 2.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 170ms);
}
.fish-card:hover .v-neon .nstripe { animation-duration: 0.9s; }
.fish-card:hover .v-neon { filter: drop-shadow(0 0 7px rgba(236,229,211,0.35)); }

/* 6 — Swimmer: always undulating, darts on hover */
.v-swim { transform-origin: center; animation: undulate 2.8s ease-in-out infinite; }
@keyframes undulate {
  0%,100% { transform: rotate(0deg) translateY(0); }
  25%     { transform: rotate(-1.4deg) translateY(-2px); }
  75%     { transform: rotate(1.4deg) translateY(2px); }
}
@keyframes dart {
  0%,100% { transform: translateX(0) rotate(0deg); }
  30%     { transform: translateX(-9px) rotate(-3deg); }
  60%     { transform: translateX(6px) rotate(2deg); }
}
.fish-card:hover .v-swim { animation: dart 0.7s ease-in-out infinite; }

/* 7 — Blueprint: outline draws + labels reveal on hover */
.v-blueprint .bp-draw path { stroke-dasharray: 720; }
.v-blueprint .bp-labels { opacity: 0; transition: opacity 0.4s ease; }
.fish-card:hover .v-blueprint .bp-draw path { animation: bassDraw 1.4s ease forwards; }
.fish-card:hover .v-blueprint .bp-labels { opacity: 1; }

/* 8 — Chomp: click opens the jaw */
.v-chomp { cursor: pointer; transform-origin: center; transition: transform 0.18s ease; }
.v-chomp .jaw { transform-box: fill-box; transform-origin: 72% 12%; transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1); }
.v-chomp.is-chomp { transform: scale(1.04); }
.v-chomp.is-chomp .jaw { transform: rotate(-28deg); }

/* 9 — Low-poly: facets shiver on hover */
.facet { transform-box: fill-box; transform-origin: center; }
@keyframes facetShiver {
  0%,100% { opacity: 1; transform: translateY(0); }
  50%     { opacity: 0.5; transform: translateY(-1px); }
}
.fish-card:hover .facet {
  animation: facetShiver 0.8s ease-in-out infinite;
  animation-delay: calc(var(--f) * 45ms);
}

/* 10 — ASCII: the current flows on hover */
.bass-ascii {
  font-family: var(--font-mono), monospace;
  font-size: 10px;
  line-height: 1.2;
  color: var(--color-secondary);
  white-space: pre;
  margin: 0;
}
.ascii-row { display: block; }
@keyframes asciiFlow {
  0%,100% { transform: translateX(0); opacity: 0.8; }
  50%     { transform: translateX(3px); opacity: 1; }
}
.fish-card:hover .ascii-row {
  animation: asciiFlow 1.4s ease-in-out infinite;
  animation-delay: calc(var(--r) * 90ms);
}

@media (prefers-reduced-motion: reduce) {
  .bass *, .ascii-row, .v-swim { animation: none !important; }
}
`;

export default function FishLab() {
  return (
    <div className="min-h-[100svh] max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <style>{CSS}</style>

      <Link
        href="/"
        className="text-caption font-mono text-secondary hover:text-primary transition-colors"
      >
        ← back
      </Link>

      <header className="mt-10 mb-12">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-display font-semibold text-primary tracking-tight leading-none">
          Striped bass — ten ways
        </h1>
        <p className="mt-4 text-body font-mono text-secondary">
          Hover and click each one. Tell me the number you want in the footer.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VARIANTS.map((v, i) => {
          const Comp = v.Comp;
          return (
            <div
              key={v.key}
              className="fish-card group rounded-lg border border-border bg-surface
                         px-5 pt-6 pb-4 transition-colors hover:border-secondary"
            >
              <div className="mx-auto flex w-full max-w-[280px] items-center justify-center py-3">
                <Comp />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-border pt-3">
                <span className="whitespace-nowrap text-caption font-mono text-secondary">
                  <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {v.name}
                </span>
                <span className="text-right text-[0.6rem] font-mono uppercase tracking-wider text-muted">
                  {v.hint}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

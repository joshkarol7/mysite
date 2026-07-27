"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────
 * STRIPED BASS — shared silhouette geometry (faces left)
 * viewBox 0 0 240 120. Every variant reuses these so all ten
 * read as the same fish, just rendered differently.
 * ───────────────────────────────────────────────────────── */

/* striped-bass profile: pointed head, arched back, rounded belly,
   tapered caudal peduncle, forked tail. Not a blimp. */
const BODY_D =
  "M12 63 C 22 48, 40 44, 60 45 C 100 40, 150 42, 190 54 L196 55 L236 42 L214 63 L236 84 L196 71 C 160 86, 110 92, 66 86 C 44 83, 24 78, 12 68 Z";
const GILL_D = "M43 48 Q 33 66 45 83";
const MOUTH_D = "M12 66 Q 4 67 3 64";
const DORSAL_D =
  "M74 42 L82 26 L90 41 L98 24 L106 40 L114 26 L122 41 L130 30 L138 43 Z";
const SOFT_DORSAL_D = "M148 44 Q 166 31 184 51 Z";
const ANAL_D = "M100 88 L108 100 L126 88 Z";
const PECT_D = "M54 72 L60 88 L76 76 Z";
/* tapered stripes — shorter toward head + tail so they hug the body */
const STRIPES = [
  { y: 52, x1: 44, x2: 196 },
  { y: 58, x1: 30, x2: 200 },
  { y: 64, x1: 26, x2: 200 },
  { y: 70, x1: 32, x2: 196 },
  { y: 76, x1: 52, x2: 186 },
];
const STRIPE_YS = STRIPES.map((s) => s.y);
const EYE = { cx: 29, cy: 58 };

/* polygon approximation of the body for clip-free point tests */
const BODY_POLY: [number, number][] = [
  [12, 63], [22, 49], [40, 45], [60, 45], [100, 41], [150, 43], [190, 54],
  [196, 55], [236, 42], [214, 63], [236, 84], [196, 71], [160, 86],
  [110, 91], [66, 86], [44, 83], [24, 78], [12, 68],
];

function inBody(x: number, y: number) {
  let inside = false;
  for (let i = 0, j = BODY_POLY.length - 1; i < BODY_POLY.length; j = i++) {
    const [xi, yi] = BODY_POLY[i];
    const [xj, yj] = BODY_POLY[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/* top + bottom body edge at a given x (for faceting) */
function edgeYs(x: number): [number, number] | null {
  const ys: number[] = [];
  for (let i = 0, j = BODY_POLY.length - 1; i < BODY_POLY.length; j = i++) {
    const [xi, yi] = BODY_POLY[i];
    const [xj, yj] = BODY_POLY[j];
    if (xi !== xj && ((xi <= x && xj >= x) || (xj <= x && xi >= x))) {
      ys.push(yi + ((yj - yi) * (x - xi)) / (xj - xi));
    }
  }
  return ys.length >= 2 ? [Math.min(...ys), Math.max(...ys)] : null;
}

type FrameProps = {
  id: string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  stripeColor?: string;
  stripeWidth?: number;
  showStripes?: boolean;
  fins?: boolean;
  eyeFill?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

function Frame({
  id,
  className = "",
  stroke = "var(--color-primary)",
  strokeWidth = 2,
  stripeColor = "var(--color-primary)",
  stripeWidth = 3,
  showStripes = true,
  fins = true,
  eyeFill = "var(--color-primary)",
  children,
  onClick,
}: FrameProps) {
  return (
    <svg
      viewBox="0 0 240 120"
      width={256}
      height={128}
      className={`bass ${className}`}
      fill="none"
      onClick={onClick}
      aria-label="striped bass"
      role="img"
    >
      {children ? <g className="fill">{children}</g> : null}

      {showStripes ? (
        <g className="stripes">
          {STRIPES.map((s, i) => (
            <line
              key={i}
              className="stripe"
              style={{ ["--i" as string]: i }}
              x1={s.x1}
              x2={s.x2}
              y1={s.y}
              y2={s.y}
              stroke={stripeColor}
              strokeWidth={stripeWidth}
              strokeLinecap="round"
            />
          ))}
        </g>
      ) : null}

      <path
        className="outline body"
        d={BODY_D}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {fins ? (
        <g className="fins" stroke={stroke} strokeWidth={strokeWidth} fill="none">
          <path className="dorsal" d={DORSAL_D} strokeLinejoin="round" />
          <path className="dorsal" d={SOFT_DORSAL_D} strokeLinejoin="round" />
          <path className="fin" d={ANAL_D} strokeLinejoin="round" />
          <path className="fin" d={PECT_D} strokeLinejoin="round" />
        </g>
      ) : null}
      <path d={GILL_D} fill="none" stroke={stroke} strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeLinecap="round" opacity={0.7} />
      <path d={MOUTH_D} fill="none" stroke={stroke} strokeWidth={Math.max(1, strokeWidth - 0.5)} strokeLinecap="round" />
      <circle className="eye" cx={EYE.cx} cy={EYE.cy} r={3.6} fill={eyeFill} />
      <circle className="pupil" cx={EYE.cx - 0.5} cy={EYE.cy} r={1.5} fill="var(--color-deep)" />
    </svg>
  );
}

/* helpers for generated fills — filtered to the body via inBody (no clip) */
function pixelCells(cell: number) {
  const cells: { x: number; y: number; stripe: boolean }[] = [];
  for (let x = 12; x < 238; x += cell) {
    for (let y = 26; y < 98; y += cell) {
      const cx = x + cell / 2;
      const cy = y + cell / 2;
      if (!inBody(cx, cy)) continue;
      const stripe = STRIPE_YS.some((sy) => Math.abs(cy - sy) <= 2.2);
      cells.push({ x, y, stripe });
    }
  }
  return cells;
}

function dotGrid(cell: number) {
  const dots: { cx: number; cy: number; r: number }[] = [];
  for (let x = 14; x < 236; x += cell) {
    for (let y = 28; y < 96; y += cell) {
      if (!inBody(x, y)) continue;
      const stripe = STRIPE_YS.some((sy) => Math.abs(y - sy) <= 2.6);
      dots.push({ cx: x, cy: y, r: stripe ? 3.7 : 1.8 });
    }
  }
  return dots;
}

/* ── 1. Ink Outline — draws itself on hover ─────────────── */
export function BassInk() {
  return (
    <Frame
      id="ink"
      className="v-ink"
      showStripes
      stripeColor="var(--color-secondary)"
      stripeWidth={2}
    />
  );
}

/* ── 2. Pixel — 8-bit body, swims on hover ──────────────── */
export function BassPixel() {
  const cell = 9;
  return (
    <Frame id="pixel" className="v-pixel" showStripes={false} stroke="var(--color-deep)" strokeWidth={1} eyeFill="var(--color-deep)">
      {pixelCells(cell).map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width={cell - 1}
          height={cell - 1}
          fill={c.stripe ? "var(--color-deep)" : "var(--color-primary)"}
          opacity={c.stripe ? 0.9 : 1}
        />
      ))}
    </Frame>
  );
}

/* ── 3. Halftone — dot matrix, ripples on hover ─────────── */
export function BassHalftone() {
  return (
    <Frame id="halftone" className="v-halftone" showStripes={false} fins stroke="var(--color-muted)" strokeWidth={1.5}>
      {dotGrid(8.5).map((d, i) => (
        <circle
          key={i}
          className="hdot"
          style={{ ["--d" as string]: (i % 9) }}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="var(--color-primary)"
        />
      ))}
    </Frame>
  );
}

/* ── 4. Shimmer — light sweeps across the stripes ───────── */
export function BassShimmer() {
  return (
    <Frame id="shimmer" className="v-shimmer" stripeColor="var(--color-deep)" stripeWidth={3.4} stroke="var(--color-primary)" eyeFill="var(--color-deep)">
      <defs>
        <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-accent-bright)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-accent-bright)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--color-accent-bright)" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1.2 0" dur="3.2s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <path d={BODY_D} fill="var(--color-primary)" />
      <path d={BODY_D} fill="url(#shimmerGrad)" />
    </Frame>
  );
}

/* ── 5. Neon — glow outline, stripes pulse ──────────────── */
export function BassNeon() {
  return (
    <svg viewBox="0 0 240 120" width={256} height={128} className="bass v-neon" fill="none" aria-label="striped bass" role="img">
      <defs>
        <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="neon-clip">
          <path d={BODY_D} />
        </clipPath>
      </defs>
      <g filter="url(#neon-glow)" stroke="var(--color-primary)" strokeWidth={2} strokeLinejoin="round">
        <path d={BODY_D} />
        <path d={DORSAL_D} />
        <path d={SOFT_DORSAL_D} />
        <path d={ANAL_D} />
        <path d={PECT_D} />
        <path d={GILL_D} fill="none" strokeLinecap="round" opacity={0.75} />
        <path d={MOUTH_D} fill="none" strokeLinecap="round" />
        <g clipPath="url(#neon-clip)">
          {STRIPES.map((s, i) => (
            <line key={i} className="nstripe" style={{ ["--i" as string]: i }} x1={s.x1} x2={s.x2} y1={s.y} y2={s.y} strokeWidth={3} strokeLinecap="round" />
          ))}
        </g>
        <circle cx={EYE.cx} cy={EYE.cy} r={3.4} fill="var(--color-primary)" stroke="none" />
      </g>
    </svg>
  );
}

/* ── 6. Swimmer — undulates always, darts on hover ──────── */
export function BassSwimmer() {
  return (
    <Frame id="swim" className="v-swim" stripeColor="var(--color-deep)" stroke="var(--color-primary)" eyeFill="var(--color-deep)">
      <path d={BODY_D} fill="var(--color-primary)" />
    </Frame>
  );
}

/* ── 7. Blueprint — schematic, reveals labels on hover ──── */
export function BassBlueprint() {
  return (
    <svg viewBox="0 0 240 132" width={256} height={141} className="bass v-blueprint" fill="none" aria-label="striped bass" role="img">
      <defs>
        <clipPath id="bp-clip">
          <path d={BODY_D} />
        </clipPath>
        <pattern id="bp-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0 L0 0 0 10" fill="none" stroke="var(--color-primary)" strokeWidth="0.4" opacity="0.25" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="240" height="132" fill="transparent" />
      <g clipPath="url(#bp-clip)">
        <rect x="0" y="0" width="240" height="120" fill="url(#bp-grid)" />
        {STRIPES.map((s, i) => (
          <line key={i} x1={s.x1} x2={s.x2} y1={s.y} y2={s.y} stroke="var(--color-primary)" strokeWidth={1.4} strokeDasharray="3 3" opacity="0.7" />
        ))}
      </g>
      <g className="bp-draw" stroke="var(--color-primary)" strokeWidth={1.6} strokeLinejoin="round" fill="none">
        <path d={BODY_D} />
        <path d={DORSAL_D} />
        <path d={SOFT_DORSAL_D} />
        <path d={ANAL_D} />
        <path d={PECT_D} />
        <path d={GILL_D} strokeLinecap="round" />
        <path d={MOUTH_D} strokeLinecap="round" />
      </g>
      <circle cx={EYE.cx} cy={EYE.cy} r={3} stroke="var(--color-primary)" strokeWidth={1.4} />
      {/* dimension line + labels revealed on hover */}
      <g className="bp-labels" fill="var(--color-secondary)" stroke="none" fontSize="7" fontFamily="var(--font-mono)">
        <line x1={16} y1={110} x2={236} y2={110} stroke="var(--color-secondary)" strokeWidth={0.8} />
        <line x1={16} y1={106} x2={16} y2={114} stroke="var(--color-secondary)" strokeWidth={0.8} />
        <line x1={236} y1={106} x2={236} y2={114} stroke="var(--color-secondary)" strokeWidth={0.8} />
        <text x={112} y={124} textAnchor="middle">ROCCUS LINEATUS</text>
        <text x={86} y={26} textAnchor="middle">SPINY DORSAL</text>
      </g>
    </svg>
  );
}

/* ── 8. Chomp — click to open the jaw ───────────────────── */
export function BassChomp() {
  const [chomp, setChomp] = useState(false);
  return (
    <Frame
      id="chomp"
      className={`v-chomp ${chomp ? "is-chomp" : ""}`}
      onClick={() => {
        setChomp(true);
        window.setTimeout(() => setChomp(false), 360);
      }}
      stripeColor="var(--color-deep)"
      stroke="var(--color-deep)"
      strokeWidth={2.5}
      stripeWidth={3.4}
      eyeFill="var(--color-deep)"
    >
      <path d={BODY_D} fill="var(--color-primary)" />
      {/* jaw wedge that swings open */}
      <path className="jaw" d="M12 63 Q 3 66 12 71 L 28 68 L 25 62 Z" fill="var(--color-deep)" />
    </Frame>
  );
}

/* ── 9. Low-poly — faceted body, shivers on hover ───────── */
export function BassLowPoly() {
  const shades = ["var(--color-primary)", "var(--color-secondary)", "var(--color-muted)"];
  const cols: { x: number; top: number; bot: number; mid: number }[] = [];
  for (let x = 16; x <= 194; x += 15) {
    const e = edgeYs(x);
    if (!e) continue;
    const [t, b] = e;
    const frac = cols.length % 2 === 0 ? 0.38 : 0.62;
    cols.push({ x, top: t, bot: b, mid: t + (b - t) * frac });
  }
  const tris: { pts: string; shade: number }[] = [];
  for (let c = 0; c < cols.length - 1; c++) {
    const a = cols[c];
    const d = cols[c + 1];
    tris.push({ pts: `${a.x},${a.top} ${d.x},${d.top} ${d.x},${d.mid}`, shade: c % 3 });
    tris.push({ pts: `${a.x},${a.top} ${d.x},${d.mid} ${a.x},${a.mid}`, shade: (c + 1) % 3 });
    tris.push({ pts: `${a.x},${a.mid} ${d.x},${d.mid} ${d.x},${d.bot}`, shade: (c + 2) % 3 });
    tris.push({ pts: `${a.x},${a.mid} ${d.x},${d.bot} ${a.x},${a.bot}`, shade: c % 3 });
  }
  return (
    <Frame id="poly" className="v-poly" showStripes={false} stroke="var(--color-deep)" strokeWidth={1.5} eyeFill="var(--color-deep)">
      <path d={BODY_D} fill="var(--color-muted)" />
      {tris.map((t, i) => (
        <polygon key={i} className="facet" style={{ ["--f" as string]: i % 11 }} points={t.pts} fill={shades[t.shade]} stroke="var(--color-deep)" strokeWidth={0.4} />
      ))}
    </Frame>
  );
}

/* ── 10. ASCII — monospace bass, current flows on hover ─── */
const ASCII_ROWS = [
  "                 ,%%%,",
  "             ,%%%'   '%%,______",
  "        _,%%%'  ~~~~~~~~~~~~~~  '%%,____",
  "   ,%%%%'  o   ============      '%%,   %,",
  "  <%%   >(  ==================        %%%%%>",
  "   '%%%%,  o   ============      ,%%'   %'",
  "        '%%%,  ~~~~~~~~~~~~~~  ,%%'''''",
  "             '%%%,_______,%%%'",
  "                 '%%%'",
];

export function BassAscii() {
  return (
    <pre className="bass-ascii" aria-label="striped bass (ascii)">
      {ASCII_ROWS.map((r, i) => (
        <span key={i} className="ascii-row" style={{ ["--r" as string]: i }}>
          {r}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}

export const VARIANTS = [
  { key: "ink", name: "Ink outline", hint: "hover — redraws itself", Comp: BassInk },
  { key: "pixel", name: "8-bit", hint: "hover — swims", Comp: BassPixel },
  { key: "halftone", name: "Halftone", hint: "hover — dots ripple", Comp: BassHalftone },
  { key: "shimmer", name: "Shimmer", hint: "hover — light sweeps", Comp: BassShimmer },
  { key: "neon", name: "Neon", hint: "hover — glow + pulse", Comp: BassNeon },
  { key: "swim", name: "Swimmer", hint: "always undulating · hover to dart", Comp: BassSwimmer },
  { key: "blueprint", name: "Blueprint", hint: "hover — reveals the schematic", Comp: BassBlueprint },
  { key: "chomp", name: "Chomp", hint: "click — opens the jaw", Comp: BassChomp },
  { key: "poly", name: "Low-poly", hint: "hover — facets shiver", Comp: BassLowPoly },
  { key: "ascii", name: "ASCII", hint: "hover — the current flows", Comp: BassAscii },
] as const;

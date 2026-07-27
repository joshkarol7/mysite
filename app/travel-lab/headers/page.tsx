"use client";

import Link from "next/link";
import { TOP_THREES } from "../../travel/data";

/* Header/content treatments for the left sidebar — same data, different
 * ways to show the CATEGORY vs the NAMES under it. */

type Group = { category: string; names: string[] };
const SAMPLE: Group[] = TOP_THREES.slice(0, 3).map((c) => ({
  category: c.category,
  names: c.picks.map((p) => p.name),
}));

/* 1 · Display header, mono names — hierarchy by font + size, no case */
function TDisplayMono({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <h3 className="text-h3 font-display mb-1.5">{g.category}</h3>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="text-body font-mono">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 2 · Numbered index — 01 · Countries */
function TNumbered({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g, i) => (
        <div key={g.category}>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-mono text-caption text-muted">0{i + 1}</span>
            <h3 className="text-h3 font-display">{g.category}</h3>
          </div>
          <div className="space-y-0.5 pl-6">
            {g.names.map((n) => <p key={n} className="text-body font-display">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 3 · Ruled — header sits on a hairline divider */
function TRuled({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <h3 className="text-h3 font-display border-b border-border pb-2 mb-2.5">{g.category}</h3>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="text-body font-display">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 4 · Eyebrow + big names — content is the hero */
function TEyebrowBig({ s }: { s: Group[] }) {
  return (
    <div className="space-y-8">
      {s.map((g) => (
        <div key={g.category}>
          <p className="text-caption font-mono text-muted tracking-[0.2em] mb-2">{g.category.toUpperCase()}</p>
          <div className="space-y-1">
            {g.names.map((n) => <p key={n} className="text-h3 font-display leading-tight">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 5 · Two-column — label beside the list */
function TTwoCol({ s }: { s: Group[] }) {
  return (
    <div className="space-y-6">
      {s.map((g) => (
        <div key={g.category} className="grid grid-cols-[96px_1fr] gap-4 items-baseline">
          <p className="text-caption font-mono text-muted tracking-wide pt-1">{g.category.toUpperCase()}</p>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="text-body font-display">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 6 · Big uppercase, tracked + rule — the current idea, but larger */
function TBigCaps({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <p className="font-mono uppercase tracking-[0.18em] text-primary mb-2 pb-2 border-b border-border" style={{ fontSize: "0.95rem" }}>{g.category}</p>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="text-body font-display">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 7 · Weight contrast — bold header, light names, same family */
function TWeight({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <h3 className="font-display font-bold mb-1" style={{ fontSize: "1.35rem" }}>{g.category}</h3>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="font-display font-normal text-body text-secondary">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 8 · Marker — a short dash sets off the header */
function TMarker({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-5 h-px bg-primary" />
            <h3 className="text-h3 font-display">{g.category}</h3>
          </div>
          <div className="space-y-0.5 pl-8">
            {g.names.map((n) => <p key={n} className="text-body font-mono">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 9 · Lowercase mono header — quiet, techy */
function TLowerMono({ s }: { s: Group[] }) {
  return (
    <div className="space-y-7">
      {s.map((g) => (
        <div key={g.category}>
          <p className="font-mono text-secondary mb-2" style={{ fontSize: "1rem" }}>{g.category.toLowerCase()}/</p>
          <div className="space-y-0.5">
            {g.names.map((n) => <p key={n} className="text-body font-display">{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 10 · Big display header, generous gap — pure size hierarchy */
function TBigGap({ s }: { s: Group[] }) {
  return (
    <div className="space-y-9">
      {s.map((g) => (
        <div key={g.category}>
          <h3 className="font-display mb-2.5" style={{ fontSize: "1.6rem", letterSpacing: "-0.02em" }}>{g.category}</h3>
          <div className="space-y-1">
            {g.names.map((n) => <p key={n} className="font-mono text-secondary" style={{ fontSize: "0.95rem" }}>{n}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}

const TREATMENTS = [
  { name: "Display header · mono names", note: "font + size contrast, no caps", Comp: TDisplayMono },
  { name: "Numbered index", note: "01 · Countries, names indented", Comp: TNumbered },
  { name: "Ruled", note: "header on a hairline divider", Comp: TRuled },
  { name: "Eyebrow + big names", note: "tiny label, content is the hero", Comp: TEyebrowBig },
  { name: "Two-column", note: "label beside the list", Comp: TTwoCol },
  { name: "Big caps + rule", note: "your current idea, but larger", Comp: TBigCaps },
  { name: "Weight contrast", note: "bold header, lighter names", Comp: TWeight },
  { name: "Dash marker", note: "a short rule sets off the header", Comp: TMarker },
  { name: "Lowercase mono", note: "countries/ — quiet + techy", Comp: TLowerMono },
  { name: "Big header · generous gap", note: "pure size hierarchy", Comp: TBigGap },
] as const;

export default function Headers() {
  return (
    <div className="min-h-screen px-5 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <Link href="/travel" className="text-caption font-mono text-secondary hover:text-primary transition-colors">← back to travel</Link>
        <h1 className="text-h1 font-display mt-6 mb-2">header treatments</h1>
        <p className="text-caption font-mono text-muted mb-14">same data · different ways to show category → names</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TREATMENTS.map((t, i) => (
            <div key={t.name} className="rounded-xl border border-border p-8 bg-surface/40">
              <div className="text-caption font-mono text-accent-dim mb-1">{String(i + 1).padStart(2, "0")} · {t.name}</div>
              <div className="text-caption font-mono text-muted mb-7">{t.note}</div>
              <t.Comp s={SAMPLE} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

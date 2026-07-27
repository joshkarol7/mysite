"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TierList,
  Dex,
  LogList,
  ProgressMeter,
  Filmstrip,
} from "./parts";

const ease = [0.14, 1, 0.34, 1] as const;

type VariantKey = "tiers" | "dex" | "log";
const VARIANTS: { key: VariantKey; label: string; blurb: string }[] = [
  { key: "tiers", label: "tier list", blurb: "ranked by how hard they pull" },
  { key: "dex", label: "the dex", blurb: "gotta catch 'em all — 2 to go" },
  { key: "log", label: "logbook", blurb: "every fish i've fooled into biting" },
];

function Switcher({
  active,
  onChange,
}: {
  active: VariantKey;
  onChange: (k: VariantKey) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1">
      {VARIANTS.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className="relative rounded-full px-4 py-1.5 text-caption font-mono transition-colors duration-200"
        >
          {active === v.key && (
            <motion.span
              layoutId="switch-pill"
              className="absolute inset-0 rounded-full bg-accent/15 border border-accent-dim/60"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span
            className={`relative z-10 ${
              active === v.key ? "text-accent" : "text-secondary hover:text-primary"
            }`}
          >
            {v.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function Fishing() {
  const [active, setActive] = useState<VariantKey>("tiers");
  const current = VARIANTS.find((v) => v.key === active)!;

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-16 md:py-20 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/"
            className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300"
          >
            <span className="text-muted">{">"}</span> cd ~/home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-caption font-mono text-accent-dim block mb-3">02</span>
          <h1 className="text-h1 font-display">fishing</h1>
          <p className="text-caption font-mono text-muted mt-2 tracking-widest">
            41.2712°N 72.3418°W · tight lines only
          </p>
        </motion.div>

        <ProgressMeter />

        {/* Switcher + blurb */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <Switcher active={active} onChange={setActive} />
          <AnimatePresence mode="wait">
            <motion.span
              key={current.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease }}
              className="text-caption font-mono text-muted normal-case tracking-normal"
            >
              {current.blurb}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Active variant */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
          >
            {active === "tiers" && <TierList />}
            {active === "dex" && <Dex />}
            {active === "log" && <LogList />}
          </motion.div>
        </AnimatePresence>

        {/* Subtle photos */}
        <Filmstrip />
      </div>
    </div>
  );
}

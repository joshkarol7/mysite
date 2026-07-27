"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VARIANTS } from "./variants";

const ease = [0.14, 1, 0.34, 1] as const;

export default function TravelLab() {
  const [i, setI] = useState(0);
  const [menu, setMenu] = useState(false);

  const go = useCallback((next: number) => {
    setI((next + VARIANTS.length) % VARIANTS.length);
  }, []);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem("travel-lab") ?? "0");
    if (!Number.isNaN(stored)) setI(stored % VARIANTS.length);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("travel-lab", String(i));
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go]);

  const V = VARIANTS[i];

  return (
    <div className="relative min-h-screen pb-28">
      {/* the live variant */}
      <AnimatePresence mode="wait">
        <motion.div
          key={V.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease }}
        >
          <V.Comp />
        </motion.div>
      </AnimatePresence>

      {/* jump menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-4"
            style={{ background: "rgba(6,6,4,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenu(false)}
          >
            <motion.div
              className="w-full max-w-lg bg-surface border border-border rounded-xl p-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              {VARIANTS.map((v, idx) => (
                <button
                  key={v.key}
                  onClick={() => { go(idx); setMenu(false); }}
                  className={`w-full flex items-baseline gap-4 text-left px-4 py-3 rounded-lg transition-colors ${
                    idx === i ? "bg-elevated" : "hover:bg-elevated/60"
                  }`}
                >
                  <span className="font-mono text-caption text-muted w-6">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="font-display text-body text-primary w-32">{v.name}</span>
                  <span className="font-mono text-caption text-muted hidden sm:block flex-1 truncate">{v.hint}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* control bar */}
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div className="mx-auto max-w-3xl m-3 rounded-2xl border border-border bg-surface/85 backdrop-blur-md px-3 py-2.5 flex items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <Link href="/travel" className="font-mono text-caption text-muted hover:text-primary transition-colors px-2 shrink-0">
            ← travel
          </Link>

          <button
            onClick={() => setMenu(true)}
            className="flex-1 min-w-0 text-left px-3 py-1.5 rounded-lg hover:bg-elevated transition-colors"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-caption text-accent-dim">{String(i + 1).padStart(2, "0")}/{VARIANTS.length}</span>
              <span className="font-display text-body text-primary truncate">{V.name}</span>
            </div>
            <div className="font-mono text-caption text-muted truncate hidden sm:block">{V.hint}</div>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => go(i - 1)}
              className="w-9 h-9 rounded-lg border border-border hover:bg-elevated text-secondary hover:text-primary transition-colors font-mono"
              aria-label="Previous variant"
            >
              ‹
            </button>
            <button
              onClick={() => go(i + 1)}
              className="w-9 h-9 rounded-lg border border-border hover:bg-elevated text-secondary hover:text-primary transition-colors font-mono"
              aria-label="Next variant"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

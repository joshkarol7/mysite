"use client";

import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import indexRaw from "../../public/library/index.json";

const ease = [0.14, 1, 0.34, 1] as const;

type Entry = {
  category: "fish" | "animals";
  slug: string;
  name: string;
  file: string;
  author: string;
  license: string;
  source: string;
};

const ENTRIES = (indexRaw as Entry[]).slice().sort((a, b) => a.slug.localeCompare(b.slug));

const titleCase = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type Filter = "all" | "fish" | "animals";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "everything" },
  { key: "fish", label: "fish" },
  { key: "animals", label: "birds & beasts" },
];

function Card({ e, i }: { e: Entry; i: number }) {
  const name = titleCase(e.slug);
  const sci = e.name && e.name.toLowerCase() !== e.slug.replace(/-/g, " ") ? e.name : "";
  return (
    <motion.a
      layout
      href={e.source}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (i % 12) * 0.02, duration: 0.4, ease }}
      whileHover={{ y: -5 }}
      className="group flex flex-col"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-md border border-border group-hover:border-accent-dim transition-colors duration-300"
        style={{ background: "#e8e1d1" }}
      >
        <Image
          src={`/library/${e.category}/${e.file}`}
          alt={name}
          fill
          sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 200px"
          className="object-contain p-2 saturate-[0.85] group-hover:saturate-100 group-hover:scale-[1.04] transition-all duration-500"
          style={{ filter: "sepia(0.05)" }}
        />
        <span className="absolute left-2 top-2 text-caption font-mono text-deep/40">
          {e.category === "fish" ? "🐟" : "◇"}
        </span>
        <span className="absolute right-2 bottom-2 text-caption font-mono text-deep/0 group-hover:text-deep/60 transition-colors duration-300">
          source ↗
        </span>
      </div>
      <div className="mt-2">
        <span className="block text-caption font-mono text-primary normal-case tracking-normal group-hover:text-accent transition-colors duration-300">
          {name}
        </span>
        {sci && (
          <span className="block text-[0.62rem] font-mono italic text-muted truncate">{sci}</span>
        )}
      </div>
    </motion.a>
  );
}

export default function Library() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRIES.filter(
      (e) =>
        (filter === "all" || e.category === filter) &&
        (!needle ||
          e.slug.replace(/-/g, " ").includes(needle) ||
          (e.name || "").toLowerCase().includes(needle))
    );
  }, [filter, q]);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-5 md:px-12 lg:px-16 py-14 md:py-20 max-w-6xl mx-auto">
        <div className="mb-8">
          <PageHeader title="the library" backHref="/fishing" />
        </div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-body font-mono text-secondary max-w-xl leading-relaxed">
            {ENTRIES.length} public-domain naturalist plates — Denton, Audubon &amp; the old
            fish-commission chromolithographs. Free to borrow. Click any to see the source.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1 w-max">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative rounded-full px-4 py-1.5 text-caption font-mono transition-colors duration-200"
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="lib-pill"
                    className="absolute inset-0 rounded-full bg-accent/15 border border-accent-dim/60"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${filter === f.key ? "text-accent" : "text-secondary hover:text-primary"}`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search species…"
            className="bg-surface/50 border border-border rounded-full px-4 py-1.5 text-caption font-mono text-primary
                       placeholder:text-muted focus:outline-none focus:border-accent-dim w-full sm:w-56 normal-case tracking-normal"
          />
          <span className="text-caption font-mono text-muted sm:ml-auto">{shown.length} plates</span>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
          <AnimatePresence mode="popLayout">
            {shown.map((e, i) => (
              <Card key={e.slug} e={e} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-14 text-caption font-mono text-muted/70 normal-case tracking-normal max-w-2xl">
          all plates public domain via Wikimedia Commons (Freshwater &amp; Marine Image Bank; Audubon).
          links go to each file&apos;s source page.
        </p>
      </div>
    </div>
  );
}

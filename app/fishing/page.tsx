"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SPECIES, TIERS, type Species } from "./data";

const ease = [0.14, 1, 0.34, 1] as const;
const snappy = [0.175, 0.885, 0.32, 1.1] as const;

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const tierOf = (t?: string) => TIERS.find((x) => x.key === t);

const caught = SPECIES.filter((s) => s.caught);
const rank: Record<string, number> = { S: 0, A: 1, B: 2, C: 3 };
caught.sort((a, b) => (rank[a.tier ?? "C"] - rank[b.tier ?? "C"]) || a.name.localeCompare(b.name));
const wishlist = SPECIES.filter((s) => !s.caught);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.55, ease },
  }),
};

function Plate({ s, index }: { s: Species; index: number }) {
  const tier = tierOf(s.tier);
  return (
    <motion.figure
      custom={index}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: snappy } }}
      className="group relative flex flex-col"
    >
      <div
        className={`relative aspect-[3/2] overflow-hidden rounded-lg border ${
          s.caught ? "border-border" : "border-dashed border-secondary/50"
        }`}
        style={{ background: "#e8e1d1" }}
      >
        <Image
          src={`/fish/${slug(s.name)}.jpg`}
          alt={`${s.name} — antique plate`}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 260px"
          className={`object-contain p-1.5 transition-all duration-500 ${
            s.caught
              ? "saturate-[0.92] group-hover:saturate-110 group-hover:scale-[1.03]"
              : "saturate-[0.45] opacity-80 group-hover:saturate-100 group-hover:opacity-100 group-hover:scale-[1.03]"
          }`}
          style={{ filter: "sepia(0.06)" }}
        />
        {/* index + tier / want tag */}
        <span className="absolute left-2 top-2 text-caption font-mono text-deep/50">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        {s.caught ? (
          tier && (
            <span
              className="absolute right-2 top-2 h-6 w-6 grid place-items-center rounded-full text-caption font-display leading-none"
              style={{ color: "#2a2118", background: `${tier.color}`, boxShadow: `0 2px 10px ${tier.glow}` }}
              title={tier.label}
            >
              {tier.key}
            </span>
          )
        ) : (
          <span className="absolute right-2 top-2 text-caption font-mono text-deep/70 bg-[#e8e1d1]/80 border border-deep/20 rounded px-1.5 py-px leading-none">
            want one
          </span>
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="min-w-0">
          <span className={`block text-body font-display leading-tight ${s.caught ? "text-primary" : "text-secondary"}`}>
            {s.name}
          </span>
          <span className="block text-caption font-mono italic normal-case tracking-normal text-muted truncate">
            {s.latin}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-caption font-mono text-secondary">{s.water}</span>
          {s.where && (
            <span className="block text-caption font-mono text-muted normal-case tracking-normal">{s.where}</span>
          )}
        </span>
      </figcaption>
      {s.note && (
        <span className="mt-1 block text-caption font-mono normal-case tracking-normal text-muted/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          — {s.note}
        </span>
      )}
    </motion.figure>
  );
}

function Grid({ items, offset = 0 }: { items: Species[]; offset?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8"
    >
      {items.map((s, i) => (
        <Plate key={s.name} s={s} index={offset + i} />
      ))}
    </motion.div>
  );
}

export default function Fishing() {
  const total = SPECIES.length;
  const pct = Math.round((caught.length / total) * 100);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-5 md:px-12 lg:px-20 py-16 md:py-20 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
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
            41.2712°N 72.3418°W · a specimen collection
          </p>
        </motion.div>

        {/* Meter */}
        <motion.div
          className="mb-12 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <div className="flex items-baseline justify-between mb-2 text-caption font-mono">
            <span className="text-secondary">caught</span>
            <span className="text-muted"><span className="text-accent">{caught.length}</span> / {total} species</span>
          </div>
          <div className="h-px w-full bg-border overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.1, ease, delay: 0.25 }}
            />
          </div>
        </motion.div>

        {/* Caught */}
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-h3 font-display text-primary">on the board</h2>
          <span className="text-caption font-mono text-muted">ranked by how hard they pull</span>
        </div>
        <Grid items={caught} />

        {/* Wishlist */}
        <div className="flex items-baseline gap-3 mt-16 mb-6">
          <h2 className="text-h3 font-display text-primary">still chasing</h2>
          <span className="text-caption font-mono text-muted">{wishlist.length} on the list</span>
        </div>
        <Grid items={wishlist} offset={caught.length} />

        {/* Credit */}
        <p className="mt-16 text-caption font-mono text-muted/70 normal-case tracking-normal max-w-2xl">
          plates: S.F. Denton & contemporaries, via the Freshwater and Marine Image Bank
          (Wikimedia Commons) — public domain.
        </p>
      </div>
    </div>
  );
}

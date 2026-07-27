"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.14, 1, 0.34, 1] as const;

type Fish = { slug: string; name: string; latin: string; w: number };

// only species with a consistent COLOR plate — the sticker sheet
const BOARD: Fish[] = [
  { slug: "striped-bass", name: "Striped Bass", latin: "Morone saxatilis", w: 340 },
  { slug: "bluefish", name: "Bluefish", latin: "Pomatomus saltatrix", w: 260 },
  { slug: "largemouth-bass", name: "Largemouth Bass", latin: "Micropterus salmoides", w: 250 },
  { slug: "tautog", name: "Tautog", latin: "Tautoga onitis", w: 210 },
  { slug: "smallmouth-bass", name: "Smallmouth Bass", latin: "Micropterus dolomieu", w: 220 },
  { slug: "black-sea-bass", name: "Black Sea Bass", latin: "Centropristis striata", w: 240 },
  { slug: "bonito", name: "Bonito", latin: "Sarda sarda", w: 250 },
  { slug: "scup", name: "Scup", latin: "Stenotomus chrysops", w: 175 },
  { slug: "fluke", name: "Fluke", latin: "Paralichthys dentatus", w: 200 },
];

const CHASING: (Fish & { ghost?: boolean })[] = [
  { slug: "giant-trevally", name: "Giant Trevally", latin: "Caranx ignobilis", w: 250 },
  { slug: "sailfish", name: "Sailfish", latin: "Istiophorus platypterus", w: 300, ghost: true },
];

const OFFSHORE = ["Yellowfin Tuna", "Mahi Mahi", "False Albacore"];

function Sticker({ f, i, ghost }: { f: Fish; i: number; ghost?: boolean }) {
  return (
    <motion.figure
      className="flex flex-col items-center text-center"
      style={{ width: f.w, maxWidth: "44vw" }}
      initial={{ opacity: 0, y: 22, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (i % 7) * 0.06, duration: 0.6, ease }}
    >
      <div className="flex items-end justify-center" style={{ height: f.w * 0.62 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/fish/cutout/${f.slug}.png`}
          alt={f.name}
          className={ghost ? "sticker sticker-ghost" : "sticker"}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
      <figcaption className="mt-3">
        <span className="poster-serif block text-[0.95rem] font-semibold tracking-[0.12em] uppercase leading-none">
          {f.name}
        </span>
        <span className="poster-serif block italic text-[0.72rem] opacity-60 mt-1">
          {f.latin}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Fishing() {
  return (
    <div className="poster relative min-h-screen">
      <div className="relative z-10 px-5 md:px-10 lg:px-16 py-12 md:py-16 max-w-6xl mx-auto">
        <Link
          href="/"
          className="poster-serif text-[0.8rem] tracking-wider text-[#7a6f57] hover:text-[#26221b] transition-colors"
        >
          ← back home
        </Link>

        {/* Poster header */}
        <motion.header
          className="text-center mt-8 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="poster-serif tracking-[0.4em] text-[0.7rem] uppercase text-[#7a6f57]">
            Landed by
          </p>
          <h1 className="poster-serif font-bold uppercase leading-[0.9] tracking-tight mt-2"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            Josh Karol
          </h1>
          <p className="poster-serif italic text-[0.95rem] text-[#5c5340] mt-2">
            gamefish of Long Island Sound &amp; beyond
          </p>
          <div className="rule-dots max-w-md mx-auto mt-5 text-[#8a7c5a]" />
        </motion.header>

        {/* The board */}
        <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-10 md:gap-x-10 py-10">
          {BOARD.map((f, i) => (
            <Sticker key={f.slug} f={f} i={i} />
          ))}
        </div>

        {/* Still chasing */}
        <div className="rule-dots max-w-md mx-auto text-[#8a7c5a]" />
        <p className="poster-serif text-center tracking-[0.35em] text-[0.7rem] uppercase text-[#7a6f57] mt-6 mb-2">
          still chasing
        </p>
        <div className="flex flex-wrap items-end justify-center gap-x-10 gap-y-10 py-8">
          {CHASING.map((f, i) => (
            <Sticker key={f.slug} f={f} i={i} ghost={f.ghost} />
          ))}
        </div>

        {/* Honest footnote */}
        <div className="rule-dots max-w-md mx-auto text-[#8a7c5a] mt-4" />
        <p className="poster-serif text-center text-[0.8rem] text-[#5c5340] max-w-lg mx-auto mt-6 leading-relaxed">
          <span className="italic">also landed, offshore</span> — {OFFSHORE.join(", ")} —
          but no antique color plate exists for these yet, so they&apos;re off the wall for now.
        </p>
        <p className="poster-serif text-center text-[0.68rem] italic text-[#8a7c5a]/80 mt-8">
          plates after S.F. Denton · public domain · a work in progress
        </p>
      </div>
    </div>
  );
}

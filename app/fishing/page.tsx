"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SPECIES, type Species } from "./data";

const ease = [0.14, 1, 0.34, 1] as const;
const snappy = [0.175, 0.885, 0.32, 1.1] as const;

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// deterministic hand-hung tilts + mat aspect variety
const TILT = [-1.6, 1.2, -0.8, 1.8, -1.3, 0.9, -1.9, 1.4, -0.6, 1.1, -1.5, 0.7, -1.2, 1.6];
const ASPECT = ["3 / 2", "4 / 3", "3 / 2", "5 / 4", "3 / 2", "3 / 2", "4 / 3", "3 / 2", "5 / 4", "3 / 2", "4 / 3", "3 / 2", "3 / 2", "4 / 3"];

// caught first (home team leads), then the ghosts
const ORDER: Species[] = [
  ...SPECIES.filter((s) => s.caught),
  ...SPECIES.filter((s) => !s.caught),
];

const frameIn = {
  hidden: (i: number) => ({ opacity: 0, y: 26, rotate: TILT[i % TILT.length] }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: TILT[i % TILT.length],
    transition: { delay: (i % 6) * 0.06, duration: 0.6, ease },
  }),
};

function Frame({ s, i }: { s: Species; i: number }) {
  const aspect = ASPECT[i % ASPECT.length];
  return (
    <motion.figure
      custom={i}
      variants={frameIn}
      whileHover={{ y: -10, rotate: 0, scale: 1.015, transition: { duration: 0.35, ease: snappy } }}
      className="group relative mb-8 break-inside-avoid cursor-default"
      style={{ transformOrigin: "center bottom" }}
    >
      {/* hanging point */}
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#1a1a17] shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10" />

      <div className="frame relative">
        <div className="picture-light absolute -inset-2 -top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded" />
        <div className="mat">
          <div
            className={`relative overflow-hidden ${s.caught ? "" : "grid place-items-center"}`}
            style={{ aspectRatio: aspect, background: s.caught ? "#e8e1d1" : "#e2dbc7" }}
          >
            {s.caught ? (
              <Image
                src={`/fish/${slug(s.name)}.jpg`}
                alt={`${s.name} — antique plate`}
                fill
                sizes="(max-width:640px) 90vw, (max-width:1280px) 45vw, 30vw"
                className="object-contain p-1 saturate-[0.9] group-hover:saturate-100 transition-[filter] duration-500"
                style={{ filter: "sepia(0.06)" }}
              />
            ) : (
              <>
                {/* the one that got away — faint ghost, blooms on hover */}
                <Image
                  src={`/fish/${slug(s.name)}.jpg`}
                  alt=""
                  fill
                  sizes="30vw"
                  className="object-contain p-1 opacity-[0.10] saturate-0 group-hover:opacity-40 transition-opacity duration-700"
                />
                <span className="relative text-caption font-mono tracking-[0.3em] text-[#8a7c5a] uppercase">
                  still chasing
                </span>
              </>
            )}
          </div>

          {/* engraved brass nameplate */}
          <div className="nameplate mt-3 px-3 py-1.5 text-center">
            <span className="block font-display leading-none text-[0.8rem] tracking-[0.14em] uppercase">
              {s.name}
            </span>
            <span className="block font-mono italic text-[0.6rem] leading-tight mt-0.5 opacity-80">
              {s.latin}
              {s.where ? ` · ${s.where}` : ""}
            </span>
          </div>
        </div>
      </div>
    </motion.figure>
  );
}

export default function Fishing() {
  const caught = SPECIES.filter((s) => s.caught).length;
  const total = SPECIES.length;

  return (
    <div className="wall relative min-h-screen">
      <div className="relative z-10 px-5 md:px-12 lg:px-16 py-14 md:py-20 max-w-6xl mx-auto">
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

        {/* Museum wall label */}
        <motion.div
          className="mb-14 border border-border/70 bg-surface/30 backdrop-blur-sm px-6 py-5 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-caption font-mono text-accent-dim block mb-3">02 · fishing</span>
          <h1 className="text-h2 font-display text-primary leading-tight">The Karol Collection</h1>
          <p className="text-body font-mono text-secondary mt-2 leading-relaxed">
            Specimens landed on Long Island Sound &amp; beyond — and the two still hanging in
            empty frames until the day they aren&apos;t.
          </p>
          <div className="flex items-center gap-6 mt-4 text-caption font-mono text-muted">
            <span><span className="text-accent">{caught}</span> landed</span>
            <span>{total - caught} still chasing</span>
            <span className="hidden sm:block tracking-widest">41.2712°N 72.3418°W</span>
          </div>
        </motion.div>

        {/* Salon wall */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ staggerChildren: 0.05 }}
          className="columns-1 sm:columns-2 xl:columns-3 gap-8"
        >
          {ORDER.map((s, i) => (
            <Frame key={s.name} s={s} i={i} />
          ))}
        </motion.div>

        {/* Credit */}
        <p className="mt-14 text-caption font-mono text-muted/70 normal-case tracking-normal max-w-2xl">
          plates: S.F. Denton &amp; contemporaries, via the Freshwater and Marine Image Bank
          (Wikimedia Commons) — public domain.
        </p>
      </div>
    </div>
  );
}

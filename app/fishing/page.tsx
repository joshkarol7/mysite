"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.14, 1, 0.34, 1] as const;

// ─────────────────────────────────────────────────────────────
// SPECIES LOG — edit this list. `caught: false` renders as a target.
// ─────────────────────────────────────────────────────────────
type Water = "salt" | "fresh";
type Species = {
  name: string;
  latin: string;
  water: Water;
  where?: string;
  caught: boolean;
};

const SPECIES: Species[] = [
  { name: "Striped Bass", latin: "Morone saxatilis", water: "salt", where: "Long Island Sound", caught: true },
  { name: "Bluefish", latin: "Pomatomus saltatrix", water: "salt", where: "Montauk", caught: true },
  { name: "Fluke", latin: "Paralichthys dentatus", water: "salt", where: "Long Island Sound", caught: true },
  { name: "Black Sea Bass", latin: "Centropristis striata", water: "salt", caught: true },
  { name: "Scup", latin: "Stenotomus chrysops", water: "salt", caught: true },
  { name: "Tautog", latin: "Tautoga onitis", water: "salt", caught: true },
  { name: "False Albacore", latin: "Euthynnus alletteratus", water: "salt", where: "Montauk", caught: true },
  { name: "Bonito", latin: "Sarda sarda", water: "salt", caught: true },
  { name: "Largemouth Bass", latin: "Micropterus salmoides", water: "fresh", caught: true },
  { name: "Smallmouth Bass", latin: "Micropterus dolomieu", water: "fresh", caught: true },
  { name: "Mahi Mahi", latin: "Coryphaena hippurus", water: "salt", caught: true },
  { name: "Yellowfin Tuna", latin: "Thunnus albacares", water: "salt", caught: true },
  { name: "Sailfish", latin: "Istiophorus platypterus", water: "salt", where: "offshore", caught: false },
  { name: "Giant Trevally", latin: "Caranx ignobilis", water: "salt", where: "Indo-Pacific", caught: false },
];

const fishingPhotos = [
  { src: "/fishing/IMG_4294.JPG", alt: "Fishing" },
  { src: "/fishing/FullSizeRender.jpeg", alt: "Fishing" },
  { src: "/fishing/IMG_6591.jpg", alt: "Fishing" },
  { src: "/fishing/B42F2120-BDBF-4F80-9416-1C7D86DD6299.jpg", alt: "Fishing" },
  { src: "/fishing/3E0C9410-3FD2-4AE6-8EC4-6A89F1732C4D.jpg", alt: "Fishing" },
  { src: "/fishing/E52F1BD8-E01B-45E5-85E4-71EAD7D9617E.jpg", alt: "Fishing" },
  { src: "/fishing/FullSizeRender.jpg", alt: "Fishing" },
  { src: "/fishing/IMG_1645.jpg", alt: "Fishing" },
  { src: "/fishing/IMG_1486.jpg", alt: "Fishing" },
];

const rowFade = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.5, ease },
  }),
};

function SpeciesRow({ s, num, index }: { s: Species; num: number; index: number }) {
  return (
    <motion.div
      variants={rowFade}
      custom={index}
      className="group grid grid-cols-[1.5rem_auto_1fr_auto] items-baseline gap-x-3 md:gap-x-4 py-3
                 border-t border-border hover:bg-elevated/40 transition-colors duration-300 -mx-3 px-3"
    >
      <span className="text-caption font-mono text-muted">
        {num.toString().padStart(2, "0")}
      </span>

      <span
        aria-hidden
        className={`justify-self-start translate-y-[-0.05em] h-2 w-2 rounded-full border ${
          s.caught
            ? "bg-accent border-accent shadow-[0_0_10px_rgba(74,158,126,0.5)]"
            : "bg-transparent border-secondary"
        }`}
      />

      <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
        <span
          className={`text-body font-display ${
            s.caught ? "text-primary" : "text-secondary"
          }`}
        >
          {s.name}
        </span>
        <span className="text-caption font-mono italic normal-case tracking-normal text-muted truncate">
          {s.latin}
        </span>
        {!s.caught && (
          <span className="text-caption font-mono text-accent-dim border border-accent-dim/50 rounded px-1.5 py-px leading-none">
            target
          </span>
        )}
      </span>

      <span className="justify-self-end text-right flex flex-col items-end gap-0.5">
        <span className="text-caption font-mono text-secondary">{s.water}</span>
        {s.where && (
          <span className="text-caption font-mono text-muted normal-case tracking-normal hidden sm:block">
            {s.where}
          </span>
        )}
      </span>
    </motion.div>
  );
}

function SpeciesLog() {
  const total = SPECIES.length;
  const caught = SPECIES.filter((s) => s.caught).length;
  const pct = Math.round((caught / total) * 100);

  // Logged first (as entered), targets pinned to the bottom.
  const ordered = [
    ...SPECIES.filter((s) => s.caught),
    ...SPECIES.filter((s) => !s.caught),
  ];

  return (
    <section className="max-w-3xl mx-auto mb-24">
      {/* Summary */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-caption font-mono text-secondary">species log</span>
          <span className="text-caption font-mono text-muted">
            <span className="text-accent">{caught}</span> / {total} caught
          </span>
        </div>
        <div className="h-px w-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
          />
        </div>
        <div className="flex items-center gap-5 mt-3 text-caption font-mono text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" /> caught
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full border border-secondary" /> not yet
          </span>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ staggerChildren: 0.03 }}
        className="border-b border-border"
      >
        {ordered.map((s, i) => (
          <SpeciesRow key={s.name} s={s} num={i + 1} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

// ─── Photo mosaic ─────────────────────────────────────────────
const layouts = [
  { w: "85%", h: "55vh", rotate: -1.5, ml: "0%", mt: "0" },
  { w: "45%", h: "50vh", rotate: 2, ml: "50%", mt: "-8vh" },
  { w: "55%", h: "40vh", rotate: -0.8, ml: "5%", mt: "3vh" },
  { w: "40%", h: "55vh", rotate: 1.5, ml: "55%", mt: "-5vh" },
  { w: "70%", h: "45vh", rotate: -2, ml: "15%", mt: "4vh" },
  { w: "48%", h: "50vh", rotate: 1, ml: "0%", mt: "2vh" },
  { w: "48%", h: "40vh", rotate: -1.2, ml: "48%", mt: "-12vh" },
  { w: "60%", h: "50vh", rotate: 2.5, ml: "20%", mt: "5vh" },
  { w: "50%", h: "45vh", rotate: -1.8, ml: "25%", mt: "2vh" },
];

function Photo({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const layout = layouts[index % layouts.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallax = [20, -25, 30, -15, 20, -30, 15, -20, 25];
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [parallax[index % 9], -parallax[index % 9]]
  );

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{
        width: layout.w,
        height: layout.h,
        marginLeft: layout.ml,
        marginTop: layout.mt,
        y: yOffset,
      }}
      initial={{ opacity: 0, y: 40, rotate: layout.rotate - 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: layout.rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.div
        className="group relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.03, rotate: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 60vw"
        />
        <div className="absolute inset-0 rounded-lg ring-1 ring-transparent group-hover:ring-accent/20 group-hover:shadow-[0_8px_50px_rgba(74,158,126,0.12)] transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function Fishing() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          className="mb-12 max-w-3xl mx-auto"
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
          className="mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-caption font-mono text-accent-dim block mb-3">02</span>
          <h1 className="text-h1 font-display">fishing</h1>
          <p className="text-caption font-mono text-muted mt-2 tracking-widest">
            41.2712°N 72.3418°W
          </p>
        </motion.div>

        {/* Species tracker */}
        <SpeciesLog />

        {/* Photo mosaic */}
        <div className="max-w-5xl mx-auto space-y-2">
          {fishingPhotos.map((photo, index) => (
            <Photo key={index} src={photo.src} alt={photo.alt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

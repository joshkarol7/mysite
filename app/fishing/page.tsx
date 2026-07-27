"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAUGHT, WANT, PHOTOS, type Fish } from "./species";

const ease = [0.14, 1, 0.34, 1] as const;

function Tile({
  f,
  onFocusFish,
  dim,
  i,
}: {
  f: Fish;
  onFocusFish: (f: Fish) => void;
  dim?: boolean;
  i: number;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={() => onFocusFish(f)}
      onFocus={() => onFocusFish(f)}
      onClick={() => onFocusFish(f)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (i % 12) * 0.015, duration: 0.4, ease }}
      className="group relative aspect-square rounded-[18px] overflow-hidden focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-[#c98a3a]"
      style={{ background: "#e7e0d1", boxShadow: "0 1px 3px rgba(60,45,20,0.12)" }}
      aria-label={f.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={f.img}
        alt={f.name}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08] ${
          dim ? "grayscale-[0.4]" : ""
        }`}
        style={{ opacity: dim ? 0.72 : 1 }}
      />
      <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-black/5 group-hover:ring-black/10 transition-all duration-300" />
    </motion.button>
  );
}

export default function Fishing() {
  const [focus, setFocus] = useState<{ f: Fish; got: boolean }>({ f: CAUGHT[0], got: true });

  return (
    <div className="min-h-screen" style={{ background: "#f4f1ea", color: "#2a251d" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12">
        <Link
          href="/"
          className="poster-serif text-[0.85rem] tracking-wide text-[#8a7f6a] hover:text-[#2a251d] transition-colors"
        >
          ← back home
        </Link>

        {/* Big focus display — the name is the hero (Herb-style) */}
        <div className="sticky top-0 z-20 -mx-5 md:-mx-8 px-5 md:px-8 pt-6 pb-5 mb-2"
             style={{ background: "linear-gradient(#f4f1ea 78%, rgba(244,241,234,0))" }}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="poster-serif text-[0.72rem] tracking-[0.3em] uppercase text-[#a2977f]">
              The Catch
            </span>
            <span className="poster-serif text-[0.72rem] tracking-[0.2em] uppercase text-[#a2977f]">
              {CAUGHT.length} landed · {WANT.length} wanted
            </span>
          </div>
          <div className="min-h-[4.5rem] md:min-h-[5.5rem] mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={focus.f.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
              >
                <h1 className="poster-serif font-bold leading-[0.95] tracking-tight"
                    style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}>
                  {focus.f.name}
                </h1>
                <p className="poster-serif italic text-[#7b7059] mt-1 text-[0.95rem] md:text-[1.05rem]">
                  {focus.f.latin}
                  {focus.f.where ? ` · ${focus.f.where}` : ""}
                  {!focus.got && <span className="not-italic tracking-widest text-[#c98a3a]"> · still chasing</span>}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Caught */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2.5 md:gap-3">
          {CAUGHT.map((f, i) => (
            <Tile key={f.name} f={f} i={i} onFocusFish={(x) => setFocus({ f: x, got: true })} />
          ))}
        </div>

        {/* Wanted */}
        <div className="flex items-center gap-3 mt-14 mb-4">
          <span className="poster-serif text-[0.72rem] tracking-[0.3em] uppercase text-[#a2977f]">
            On the list
          </span>
          <span className="h-px flex-1" style={{ background: "#ddd4c1" }} />
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-2.5 md:gap-3">
          {WANT.map((f, i) => (
            <Tile key={f.name} f={f} i={i} dim onFocusFish={(x) => setFocus({ f: x, got: false })} />
          ))}
        </div>

        {/* From the trips — real photos, small + square */}
        <div className="flex items-center gap-3 mt-16 mb-4">
          <span className="poster-serif text-[0.72rem] tracking-[0.3em] uppercase text-[#a2977f]">
            From the trips
          </span>
          <span className="h-px flex-1" style={{ background: "#ddd4c1" }} />
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
          {PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 10) * 0.02, duration: 0.4, ease }}
              className="group relative aspect-square rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(60,45,20,0.12)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="fishing"
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.25] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>

        <p className="poster-serif text-center text-[0.7rem] italic text-[#a2977f] mt-16">
          placeholder list · plates after S.F. Denton &amp; Audubon, public domain
        </p>
      </div>
    </div>
  );
}

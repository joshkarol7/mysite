"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { TopoPattern } from "../components/TopoPattern";

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

// Predefined layout — each photo gets a unique size, rotation, position
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
  const yOffset = useTransform(scrollYProgress, [0, 1], [parallax[index % 9], -parallax[index % 9]]);

  // 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  // Staggered entrance
  const enterDir = index % 3;
  const initial = enterDir === 0
    ? { x: -80, opacity: 0, rotate: layout.rotate - 3 }
    : enterDir === 1
    ? { x: 80, opacity: 0, rotate: layout.rotate + 3 }
    : { y: 60, opacity: 0, scale: 0.9 };

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
        perspective: 1000,
      }}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: layout.rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.14, 1, 0.34, 1] }}
    >
      <motion.div
        className="group relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.04, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.14, 1, 0.34, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 rounded-lg ring-1 ring-transparent group-hover:ring-accent/20 group-hover:shadow-[0_8px_50px_rgba(74,158,126,0.12)] transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
}

export default function Fishing() {
  return (
    <div className="relative min-h-screen">
      <TopoPattern density="medium" />

      <div className="relative z-10 px-4 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          className="mb-12 max-w-7xl mx-auto"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.14, 1, 0.34, 1] }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{'>'}</span> cd ~/home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-20 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.14, 1, 0.34, 1] }}
        >
          <span className="text-caption font-mono text-accent-dim block mb-3">02</span>
          <h1 className="text-h1 font-display">fishing</h1>
          <p className="text-caption font-mono text-muted mt-2 tracking-widest">41.2712°N 72.3418°W</p>
        </motion.div>

        {/* Scattered photo mosaic — no grid, just flow */}
        <div className="max-w-5xl mx-auto space-y-2">
          {fishingPhotos.map((photo, index) => (
            <Photo key={index} src={photo.src} alt={photo.alt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

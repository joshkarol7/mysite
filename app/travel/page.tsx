"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const travelPhotos = [
  { src: "/travel/IMG_9149.jpg", alt: "Travel" },
  { src: "/travel/IMG_7263.jpg", alt: "Travel" },
  { src: "/travel/IMG_6830.jpg", alt: "Travel" },
  { src: "/travel/IMG_6782.jpg", alt: "Travel" },
  { src: "/travel/IMG_6747.jpg", alt: "Travel" },
  { src: "/travel/IMG_5776.jpg", alt: "Travel" },
  { src: "/travel/IMG_5621.jpg", alt: "Travel" },
  { src: "/travel/IMG_1866.jpg", alt: "Travel" },
  { src: "/travel/IMG_0945.jpg", alt: "Travel" },
  { src: "/travel/G0091040.JPG", alt: "Travel" },
  { src: "/travel/DSC00012_Original.jpg", alt: "Travel" },
  { src: "/travel/IMG_0807_Original.jpg", alt: "Travel" },
];

const layouts = [
  { w: "75%", h: "50vh", rotate: 1.2, ml: "10%", mt: "0" },
  { w: "50%", h: "55vh", rotate: -2, ml: "0%", mt: "-6vh" },
  { w: "45%", h: "45vh", rotate: 1.5, ml: "52%", mt: "-10vh" },
  { w: "80%", h: "50vh", rotate: -0.8, ml: "8%", mt: "4vh" },
  { w: "42%", h: "50vh", rotate: 2.2, ml: "5%", mt: "2vh" },
  { w: "50%", h: "45vh", rotate: -1.5, ml: "45%", mt: "-8vh" },
  { w: "65%", h: "48vh", rotate: 0.8, ml: "18%", mt: "5vh" },
  { w: "55%", h: "50vh", rotate: -2.5, ml: "0%", mt: "3vh" },
  { w: "40%", h: "42vh", rotate: 1.8, ml: "55%", mt: "-12vh" },
  { w: "70%", h: "45vh", rotate: -1, ml: "15%", mt: "4vh" },
  { w: "48%", h: "50vh", rotate: 2, ml: "48%", mt: "-6vh" },
  { w: "55%", h: "48vh", rotate: -1.5, ml: "5%", mt: "3vh" },
];

function Photo({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const layout = layouts[index % layouts.length];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallax = [25, -20, 30, -15, 20, -25, 18, -22, 28, -18, 22, -28];
  const yOffset = useTransform(scrollYProgress, [0, 1], [parallax[index % 12], -parallax[index % 12]]);

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

export default function Travel() {
  return (
    <div className="relative min-h-screen">
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
          <span className="text-caption font-mono text-accent-dim block mb-3">03</span>
          <h1 className="text-h1 font-display">travel</h1>
          <p className="text-caption font-mono text-muted mt-2 tracking-widest">somewhere out there</p>
        </motion.div>

        {/* Scattered photo mosaic */}
        <div className="max-w-5xl mx-auto space-y-2">
          {travelPhotos.map((photo, index) => (
            <Photo key={index} src={photo.src} alt={photo.alt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

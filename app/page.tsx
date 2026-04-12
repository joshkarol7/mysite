"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TopoPattern } from "./components/TopoPattern";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.14, 1, 0.34, 1],
    },
  }),
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bassY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bassRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const bassOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <TopoPattern density="dense" />

      {/* Hero content — 3D bass swim behind via fixed layout canvas */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          style={{ y: textY }}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            className="text-caption font-mono text-secondary mb-6"
            variants={fadeUp}
            custom={0}
          >
            40.7128°N 74.0060°W
          </motion.p>

          <motion.h1
            className="text-hero font-display text-primary mb-6"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
            variants={fadeUp}
            custom={1}
          >
            Josh
            <br />
            Karol
          </motion.h1>

          <motion.p
            className="text-h3 font-mono text-secondary mb-8 max-w-md"
            variants={fadeUp}
            custom={2}
          >
            co-founder + cto @{" "}
            <a
              href="https://www.crowdvolt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              CrowdVolt
            </a>{" "}
            <span className="text-muted">(yc w24)</span>
          </motion.p>

          <motion.div
            className="flex gap-6 text-caption font-mono"
            variants={fadeUp}
            custom={3}
          >
            <a
              href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
              className="link-underline text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a
              href="mailto:joshkarol98@gmail.com"
              className="link-underline text-secondary"
            >
              email
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-caption font-mono text-muted">scroll</span>
        <motion.div
          className="w-px h-8 bg-muted"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  coordinates,
}: {
  number: string;
  title: string;
  coordinates?: string;
}) {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.14, 1, 0.34, 1] }}
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className="text-caption font-mono text-accent-dim">{number}</span>
        {coordinates && (
          <span className="text-caption font-mono text-muted tracking-widest hidden sm:inline">
            {coordinates}
          </span>
        )}
      </div>
      <h2 className="text-h1 font-display">{title}</h2>
    </motion.div>
  );
}

function ReadingsSection() {
  const items = [
    {
      title: "work expands to fill available time",
      link: "https://en.wikipedia.org/wiki/Parkinson%27s_law",
      source: "Parkinson's law",
    },
    {
      title: "why to start a company",
      link: "https://www.youtube.com/watch?v=3qHkcs3kG44&ab_channel=PowerfulJRE",
      source: "Naval Ravikant",
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <TopoPattern density="sparse" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader number="01" title="reads" coordinates="— favorites" />
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="group flex items-baseline gap-3 py-3 border-b border-border"
              variants={fadeUp}
              custom={i}
            >
              <span className="text-body font-mono text-primary group-hover:text-accent transition-colors duration-300">
                {item.title}
              </span>
              <span className="text-muted">•</span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent text-body font-mono"
              >
                {item.source}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function NavigationSection() {
  const links = [
    { href: "/about", label: "about" },
    { href: "/fishing", label: "fishing" },
    { href: "/travel", label: "travel" },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <TopoPattern density="medium" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader number="02" title="more" coordinates="— josh" />
        <motion.div
          className="space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {links.map((link, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Link
                href={link.href}
                className="group flex items-center justify-between py-3 border-b border-border
                           hover:border-accent-dim transition-all duration-300"
              >
                <span className="text-body font-mono text-primary group-hover:text-accent transition-colors duration-300">
                  {link.label}
                </span>
                <span className="text-muted text-sm group-hover:translate-x-1 group-hover:text-accent transition-all duration-300">→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WritingSection() {
  const articles = [
    {
      href: "/writing/prove-your-works-ev",
      title: "how we build",
      date: "Jan 13, '25",
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <TopoPattern density="sparse" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader number="03" title="writing" />
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {articles.map((article, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Link
                href={article.href}
                className="group flex items-baseline justify-between py-3 border-b border-border
                           hover:border-accent-dim transition-all duration-300"
              >
                <span className="text-body font-mono text-primary group-hover:text-accent transition-colors duration-300">
                  {article.title}
                </span>
                <span className="text-caption font-mono text-muted">{article.date}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-24 md:py-32 border-t border-border">
      <TopoPattern density="sparse" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeader number="04" title="contact" coordinates="40.7128°N 74.0060°W" />
        <motion.div
          className="flex flex-wrap gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <motion.a
            href="https://www.linkedin.com/in/josh-karol-4b1a97143/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-h3 font-display"
            variants={fadeUp}
            custom={0}
          >
            linkedin
          </motion.a>
          <motion.a
            href="mailto:joshkarol98@gmail.com"
            className="link-underline text-h3 font-display"
            variants={fadeUp}
            custom={1}
          >
            email
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ReadingsSection />
      <NavigationSection />
      <WritingSection />
      <ContactSection />
    </main>
  );
}

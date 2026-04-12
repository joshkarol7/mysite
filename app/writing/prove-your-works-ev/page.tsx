"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TopoPattern } from "../../components/TopoPattern";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.14, 1, 0.34, 1] as const,
    },
  }),
};

const sectionFade = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.14, 1, 0.34, 1] },
  },
};

export default function ProveYourWorksEV() {
  return (
    <div className="relative min-h-screen">
      <TopoPattern density="sparse" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.14, 1, 0.34, 1] }}
        >
          <Link href="/" className="text-caption font-mono text-secondary hover:text-accent transition-colors duration-300">
            <span className="text-muted">{'>'}</span> cd ~/writing/how-we-build
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header className="mb-16" initial="hidden" animate="visible">
          <motion.h1 className="text-h1 font-display mb-4" variants={fadeUp} custom={0}>
            how we build
          </motion.h1>
          <motion.p
            className="text-caption font-mono text-muted"
            variants={fadeUp}
            custom={1}
          >
            Jan 13, &apos;25
          </motion.p>
        </motion.header>

        {/* Article */}
        <article className="space-y-16">
          {[
            {
              title: "Prove your work's EV",
              paragraphs: [
                "The cost of your work is the time spent building and the value is the revenue generated or cost saved. Even a small UI tweak can improve retention and revenue. If you want to advocate to build something, you must be able to explain how it grows the business. Revenue generated is far more important than cost saved.",
                "If your 30 line function can be re-written in 4 lines we won't be thrilled. Fix it next time, re-writing it now is useless.",
              ],
            },
            {
              title: "Engineer your engineering",
              paragraphs: [
                "Use your debugger. Load test data via a script you write, do not be a mechanical turk testing via clicking through a UI. Think outside the box and invest time into letting you develop faster. Experiment with prompts and run them simultaneously. Set-up MCP and tune your system prompts.",
                "Your job is to maximize your shipping velocity while maintaining an acceptable level of quality.",
              ],
            },
            {
              title: "Ship to win",
              paragraphs: [
                "Work expands to fill the available time. If a task is assigned with a deadline of one week, it will take one week. If that same task is given with a deadline of one day, it will get done that day. There should be an inner sense of urgency to give yourself aggressive deadlines.",
                "Our success is directly correlated to how fast we ship features. We don't make assumptions, we view shipping code as an experiment and we want to run as many as possible. Sometimes our experiments fail and we remove them. Don't spend time making any experiment perfect. The more experiments we can run the more we can win.",
              ],
            },
            {
              title: "Design and latency compound",
              paragraphs: [
                "Slow systems demonstrate a lack of professionalism, hurt trust, and cause friction + frustration.",
                "When an action takes more than ~200ms loaders, spinners, and any other indicators are a must. Double clicks, unnecessary refreshes, and blank stares cause a poor user experience.",
                "Loaders should have a perfect transition to the loaded content with no snapping and jumps across any frame. Take a video of the load and scrub frame by frame to ensure perfection.",
                "Low latency and excellence increases time on-site and conversion.",
              ],
            },
            {
              title: "Tastefully accumulate debt",
              paragraphs: [
                "When we create tech debt, we can get more done now and pay the cost in the future. If someone offered you a loan at an amazing rate you should take it.",
                "Paying full cash is often not economical, nor is writing perfect code. Startups are intended to have more resources in the future, tech debt is a lever we choose to pull. If you like debating variable names and advocating for performative refactors don't work at a startup. We learn from our mistakes and fix them going forward, not retroactively.",
              ],
            },
            {
              title: "Do not context switching",
              paragraphs: [
                "When you are in the zone and you get a message or a teammate tries talking to you, more time is wasted than the amount of time physically pulling you away from your computer. Coding requires you to build a mental map of files, functions, and things you need to do, and when you are stopped, it flushes this mental map from your short-term memory. You should chunk together larger amounts of time to have conversations, frequent smaller conversations will kill your productivity.",
                "If you never tell anyone to fuck off, you are not maximizing your productivity. This is more relevant in-person but applies remote as well.",
              ],
            },
            {
              title: "Glass box",
              paragraphs: [
                "Our system must be a strong glass box. We strive to see exactly what is happening in every part of the system from input through the return of any action.",
                "This means strong logging, client side metrics, session replays, server health, database health, error tracking with stack traces, audits of API requests, and historical versions of all database objects.",
                "Any issue encountered should be able to be explained and quickly identified. Mysterious, unexplainable, bugs are dangerous and time consuming. The easiest way to fix issues is by tracking everything humanly possible and aggregating data in easy to parse ways.",
              ],
            },
            {
              title: "Anything is possible",
              paragraphs: [
                "People have accomplished much harder things than what you are struggling with. You and I are always overreacting; we will find a way to make it work.",
                "We don't want to hear about it being impossible to speed up a query or center a div, because SpaceX can catch a rocket with robotic arms.",
              ],
            },
            {
              title: "I love learning",
              paragraphs: [
                "You should seek to understand how every abstraction and layer in your code base works. At Bloomberg, my boss did not know what HTTP was because it was too far abstracted from all day-to-day code. Abstractions are useful, but blind reliance on them makes you slow and fragile.",
                "When you understand how data flows from the client to the database and back—how caching, retries, timeouts, and failures actually behave—you debug faster, make better tradeoffs, and ship with confidence. Understand how your tools work, not how to use them. We win at the rate the team learns.",
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.section
              key={sectionIndex}
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={sectionFade}
            >
              <h2 className="text-h2 font-display">{section.title}</h2>
              {section.paragraphs.map((p, pIndex) => (
                <p key={pIndex} className="text-body font-mono text-secondary leading-relaxed">
                  {p}
                </p>
              ))}
            </motion.section>
          ))}
        </article>
      </div>
    </div>
  );
}

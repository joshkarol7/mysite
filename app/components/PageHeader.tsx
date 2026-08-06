"use client";

import { motion } from "framer-motion";
import { BackChevron } from "./BackChevron";

const ease = [0.14, 1, 0.34, 1] as const;

export function PageHeader({
  title,
  backHref = "/",
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative flex items-center justify-center"
    >
      <BackChevron href={backHref} className="absolute left-0" />
      <h1 className="px-10 text-center text-h2 font-display text-primary leading-none">
        {title}
      </h1>
    </motion.div>
  );
}

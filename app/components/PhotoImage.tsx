"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* Shared image with a shimmer skeleton that holds the frame until the photo
   decodes, then blur/scale-fades the image in over it. Used by fishing +
   travel so both galleries load the same calm way. Parent must be positioned. */
export function PhotoImage({
  src,
  alt,
  sizes,
  optimized = true,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  sizes?: string;
  optimized?: boolean; // true → next/image, false → raw <img> (already-sized public assets)
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* skeleton: elevated surface + slow shimmer sweep, fades out on load */}
      <div
        aria-hidden
        className={`shimmer pointer-events-none absolute inset-0 z-0 bg-elevated transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={false}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }}
        transition={{ duration: 0.7, ease }}
      >
        {optimized ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            className={className}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full ${className}`}
          />
        )}
      </motion.div>
    </>
  );
}

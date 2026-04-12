"use client";

import dynamic from "next/dynamic";

const BassScene = dynamic(() => import("./BassScene"), { ssr: false });

export function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <BassScene className="w-full h-full" />
    </div>
  );
}

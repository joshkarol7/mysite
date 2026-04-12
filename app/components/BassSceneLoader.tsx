"use client";

import dynamic from "next/dynamic";
import { StripedBass } from "./StripedBass";

const BassScene = dynamic(() => import("./BassScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="opacity-[0.06] w-64 animate-pulse">
        <StripedBass variant="silhouette" />
      </div>
    </div>
  ),
});

export function BassSceneLoader({ className = "" }: { className?: string }) {
  return <BassScene className={className} />;
}

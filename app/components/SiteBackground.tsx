import { TopoPattern } from "./TopoPattern";

// Fixed, static site backdrop. Replaces the old 3D bass canvas.
// A single faint topographic layer + a soft top glow — depth without motion.
export function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-deep">
      <div className="absolute inset-0 opacity-40">
        <TopoPattern density="medium" animated={false} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, var(--color-glow) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to top, var(--color-deep) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

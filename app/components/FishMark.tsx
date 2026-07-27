// A minimal line-art fish — Benji-style, basically a few lines.
export function FishMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      width="54"
      height="27"
      role="img"
      aria-label="fish"
      className={className}
      fill="none"
      stroke="var(--color-secondary)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* body */}
      <path d="M14 30 Q 52 11 90 30 Q 52 49 14 30 Z" />
      {/* tail */}
      <path d="M90 30 L110 17 L110 43 Z" />
      {/* gill */}
      <path d="M41 20 Q 35 30 41 40" />
      {/* eye */}
      <circle cx="29" cy="26" r="1.4" fill="var(--color-secondary)" stroke="none" />
    </svg>
  );
}

"use client";

interface StripedBassProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: "full" | "silhouette";
  animate?: boolean;
}

export function StripedBass({
  className = "",
  style,
  variant = "full",
  animate = false,
}: StripedBassProps) {
  const isSilhouette = variant === "silhouette";

  return (
    <svg
      viewBox="0 0 400 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* Main body */}
      <path
        d="M40 90 C40 90, 20 85, 12 88 C4 91, 2 90, 8 86 C14 82, 35 78, 40 78
           L40 90Z"
        fill={isSilhouette ? "currentColor" : "var(--color-elevated)"}
        opacity={isSilhouette ? 1 : 0.8}
      />
      {/* Tail fork */}
      <path
        d="M40 78 C32 68, 18 52, 10 42 C16 50, 28 60, 38 72
           M40 90 C32 100, 18 116, 10 126 C16 118, 28 108, 38 96"
        stroke={isSilhouette ? "currentColor" : "var(--color-secondary)"}
        strokeWidth="2.5"
        fill="none"
        className={animate ? "origin-left" : ""}
        style={animate ? { animation: "tail-flick 1.2s ease-in-out infinite" } : {}}
      />
      <path
        d="M10 42 C18 50, 30 62, 40 78 L40 90 C30 106, 18 118, 10 126
           C14 120, 22 108, 30 96 C34 90, 34 84, 30 78
           C22 60, 14 48, 10 42Z"
        fill={isSilhouette ? "currentColor" : "var(--color-surface)"}
        stroke={isSilhouette ? "none" : "var(--color-border)"}
        strokeWidth="0.5"
      />
      {/* Body shape */}
      <path
        d="M38 78 C60 50, 120 28, 200 24
           C260 20, 320 30, 350 42
           C370 50, 385 62, 390 75
           C395 82, 395 88, 390 95
           C385 108, 370 118, 350 126
           C320 140, 260 148, 200 144
           C120 140, 60 118, 38 96
           C36 92, 36 82, 38 78Z"
        fill={isSilhouette ? "currentColor" : "var(--color-surface)"}
        stroke={isSilhouette ? "none" : "var(--color-border)"}
        strokeWidth="0.5"
      />

      {!isSilhouette && (
        <>
          {/* Lateral line */}
          <path
            d="M60 86 C120 82, 200 80, 340 78"
            stroke="var(--color-muted)"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Stripes */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${80 + i * 38} ${46 + i * 2} C${120 + i * 35} ${58 + i * 1.5}, ${160 + i * 30} ${68 + i}, ${200 + i * 22} ${76}`}
              stroke="var(--color-muted)"
              strokeWidth="1.2"
              opacity={0.25 - i * 0.02}
              fill="none"
            />
          ))}
          {/* Lower stripes */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`lower-${i}`}
              d={`M${90 + i * 40} ${120 - i * 2} C${130 + i * 36} ${110 - i * 1.5}, ${170 + i * 30} ${100 - i}, ${210 + i * 22} ${92}`}
              stroke="var(--color-muted)"
              strokeWidth="1"
              opacity={0.2 - i * 0.02}
              fill="none"
            />
          ))}
          {/* Dorsal fin */}
          <path
            d="M120 28 C140 8, 180 2, 220 6 C250 8, 270 14, 280 24
               C260 22, 220 20, 180 22 C150 24, 130 26, 120 28Z"
            fill="var(--color-elevated)"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.7"
          />
          {/* Dorsal fin spines */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line
              key={`spine-${i}`}
              x1={130 + i * 18}
              y1={26 - (i < 4 ? i * 3 : (7 - i) * 3)}
              x2={135 + i * 18}
              y2={10 - (i < 4 ? i * 2 : (7 - i) * 2)}
              stroke="var(--color-border)"
              strokeWidth="0.8"
              opacity="0.4"
            />
          ))}
          {/* Second dorsal fin */}
          <path
            d="M290 30 C300 22, 315 20, 325 24 C330 26, 332 30, 328 34
               C320 30, 310 28, 300 30 L290 30Z"
            fill="var(--color-elevated)"
            opacity="0.6"
          />
          {/* Pectoral fin */}
          <path
            d="M100 95 C110 105, 130 120, 150 128
               C140 122, 115 108, 105 98Z"
            fill="var(--color-elevated)"
            opacity="0.5"
          />
          {/* Anal fin */}
          <path
            d="M280 130 C295 142, 315 146, 330 140
               C320 140, 300 138, 288 134Z"
            fill="var(--color-elevated)"
            opacity="0.5"
          />
          {/* Belly gradient */}
          <path
            d="M60 96 C120 120, 200 134, 340 126"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.3"
            fill="none"
          />
          {/* Eye */}
          <circle cx="365" cy="78" r="8" fill="var(--color-elevated)" />
          <circle cx="365" cy="78" r="5" fill="var(--color-deep)" />
          <circle cx="367" cy="76" r="1.5" fill="var(--color-secondary)" />
          {/* Gill */}
          <path
            d="M340 58 C338 72, 338 88, 342 108"
            stroke="var(--color-border)"
            strokeWidth="1.2"
            opacity="0.4"
            fill="none"
          />
          {/* Mouth */}
          <path
            d="M388 80 C392 78, 398 80, 396 84 C394 82, 390 82, 388 80Z"
            fill="var(--color-border)"
            opacity="0.6"
          />
          {/* Subtle sheen on top */}
          <path
            d="M100 50 C160 36, 260 30, 340 42"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            opacity="0.08"
            fill="none"
          />
        </>
      )}
    </svg>
  );
}

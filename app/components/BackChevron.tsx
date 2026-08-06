import Link from "next/link";

const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// left-pointing chevron ‹ — stays put; muted eggshell → bright eggshell on hover
export function BackChevron({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} aria-label="back" className={`group inline-flex ${className}`}>
      <svg
        {...svgProps}
        className="text-secondary transition-colors duration-300 ease-out group-hover:text-primary"
      >
        <path d="M15 5 L8 12 L15 19" />
      </svg>
    </Link>
  );
}

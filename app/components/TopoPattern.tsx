"use client";

interface TopoPatternProps {
  className?: string;
  density?: "sparse" | "medium" | "dense";
  animated?: boolean;
}

export function TopoPattern({
  className = "",
  density = "medium",
  animated = true,
}: TopoPatternProps) {
  const paths = {
    sparse: [
      "M0 120 C80 100, 200 140, 400 110 C600 80, 750 130, 900 105",
      "M0 220 C120 200, 280 250, 500 215 C680 185, 800 240, 900 210",
      "M0 340 C100 320, 250 370, 450 335 C620 305, 780 350, 900 330",
      "M0 50 C150 30, 350 70, 550 45 C700 25, 820 60, 900 40",
    ],
    medium: [
      "M0 60 C100 40, 250 80, 450 55 C620 35, 780 70, 900 50",
      "M0 120 C80 100, 200 140, 400 110 C600 80, 750 130, 900 105",
      "M0 180 C130 160, 300 200, 480 175 C650 155, 800 190, 900 170",
      "M0 240 C90 220, 220 260, 420 235 C610 215, 760 250, 900 230",
      "M0 300 C110 280, 280 320, 460 295 C640 275, 790 310, 900 290",
      "M0 360 C70 340, 190 380, 380 355 C570 335, 740 370, 900 350",
      "M0 420 C140 400, 320 440, 520 415 C700 395, 830 430, 900 410",
      "M0 480 C100 460, 260 500, 440 475 C630 455, 770 490, 900 470",
    ],
    dense: [
      "M0 30 C80 15, 200 45, 380 25 C540 10, 720 40, 900 22",
      "M0 60 C100 40, 250 80, 450 55 C620 35, 780 70, 900 50",
      "M0 90 C120 70, 280 110, 460 85 C640 65, 800 100, 900 80",
      "M0 120 C80 100, 200 140, 400 110 C600 80, 750 130, 900 105",
      "M0 150 C110 130, 260 170, 440 145 C620 125, 780 160, 900 140",
      "M0 180 C130 160, 300 200, 480 175 C650 155, 800 190, 900 170",
      "M0 210 C70 190, 190 230, 390 205 C580 185, 750 220, 900 200",
      "M0 240 C90 220, 220 260, 420 235 C610 215, 760 250, 900 230",
      "M0 270 C140 250, 310 290, 500 265 C680 245, 830 280, 900 260",
      "M0 300 C110 280, 280 320, 460 295 C640 275, 790 310, 900 290",
      "M0 330 C80 310, 210 350, 400 325 C590 305, 760 340, 900 320",
      "M0 360 C70 340, 190 380, 380 355 C570 335, 740 370, 900 350",
      "M0 390 C130 370, 300 410, 490 385 C670 365, 820 400, 900 380",
      "M0 420 C140 400, 320 440, 520 415 C700 395, 830 430, 900 410",
      "M0 450 C90 430, 230 470, 430 445 C620 425, 770 460, 900 440",
      "M0 480 C100 460, 260 500, 440 475 C630 455, 770 490, 900 470",
    ],
  };

  const selectedPaths = paths[density];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Background layer - slower drift */}
      <svg
        viewBox="0 0 900 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={animated ? { animation: "topo-drift-slow 20s ease-in-out infinite" } : {}}
      >
        {selectedPaths.map((d, i) => (
          <path
            key={`bg-${i}`}
            d={d}
            stroke="var(--color-topo)"
            strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
            opacity={0.5 + (i % 3) * 0.15}
            fill="none"
            strokeDasharray={i % 4 === 0 ? "none" : "none"}
          />
        ))}
        {/* Closed contour rings */}
        <ellipse cx="300" cy="250" rx="80" ry="30" stroke="var(--color-topo)" strokeWidth="0.6" opacity="0.4" fill="none" />
        <ellipse cx="310" cy="248" rx="50" ry="18" stroke="var(--color-topo)" strokeWidth="0.6" opacity="0.3" fill="none" />
        <ellipse cx="650" cy="150" rx="60" ry="25" stroke="var(--color-topo)" strokeWidth="0.6" opacity="0.35" fill="none" />
        <ellipse cx="655" cy="148" rx="35" ry="14" stroke="var(--color-topo)" strokeWidth="0.6" opacity="0.25" fill="none" />
      </svg>

      {/* Foreground layer - slightly faster drift */}
      <svg
        viewBox="0 0 900 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={animated ? { animation: "topo-drift 15s ease-in-out infinite" } : {}}
      >
        {selectedPaths
          .filter((_, i) => i % 2 === 0)
          .map((d, i) => (
            <path
              key={`fg-${i}`}
              d={d}
              stroke="var(--color-topo-bright)"
              strokeWidth="0.5"
              opacity={0.3}
              fill="none"
              strokeDasharray="8 12"
              style={animated ? { animation: `dash-flow ${8 + i * 2}s linear infinite` } : {}}
            />
          ))}
      </svg>
    </div>
  );
}

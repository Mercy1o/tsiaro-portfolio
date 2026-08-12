import type { CSSProperties } from "react";

type BrushFieldProps = {
  className?: string;
  dense?: boolean;
};

const strokes = [
  [7, 10, 84, 14, -24, "var(--moss)"],
  [19, 6, 54, 12, 18, "var(--sage)"],
  [31, 13, 90, 15, -42, "var(--forest)"],
  [44, 7, 72, 13, 24, "var(--plum)"],
  [58, 12, 46, 12, -16, "var(--rust)"],
  [72, 6, 67, 14, 36, "var(--violet)"],
  [87, 13, 59, 12, -28, "var(--ochre)"],
  [11, 25, 66, 13, 31, "var(--forest)"],
  [25, 31, 98, 15, -34, "var(--moss)"],
  [38, 24, 42, 12, 17, "var(--cream)"],
  [52, 30, 82, 16, -21, "var(--sage)"],
  [67, 25, 54, 12, 44, "var(--rust)"],
  [80, 34, 91, 15, -37, "var(--forest)"],
  [93, 26, 47, 12, 22, "var(--violet)"],
  [5, 44, 73, 14, -18, "var(--plum)"],
  [18, 50, 50, 11, 39, "var(--ochre)"],
  [34, 42, 100, 16, 15, "var(--moss)"],
  [48, 51, 59, 12, -46, "var(--cream)"],
  [63, 43, 76, 14, 29, "var(--forest)"],
  [77, 53, 44, 12, -17, "var(--rust)"],
  [91, 46, 89, 15, 41, "var(--sage)"],
  [10, 65, 97, 16, 23, "var(--forest)"],
  [24, 72, 61, 13, -32, "var(--violet)"],
  [39, 64, 48, 11, 47, "var(--rust)"],
  [54, 73, 86, 15, -24, "var(--moss)"],
  [69, 66, 55, 12, 19, "var(--cream)"],
  [83, 75, 94, 16, -39, "var(--forest)"],
  [96, 67, 46, 11, 28, "var(--ochre)"],
] as const;

const liquidLines = Array.from({ length: 14 }, (_, index) => index);

export default function BrushField({ className = "", dense = true }: BrushFieldProps) {
  const items = dense ? strokes : strokes.filter((_, index) => index % 2 === 0);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-[-8%] h-[116%] w-[116%] opacity-55"
        role="presentation"
      >
        <g fill="none" stroke="rgba(239,229,193,.22)" strokeWidth="0.72" vectorEffect="non-scaling-stroke">
          {liquidLines.map((index) => (
            <path
              key={index}
              transform={`translate(${index * 4} ${index * 16})`}
              d="M-90 250 C70 160 168 302 304 222 S548 140 682 226 S925 328 1068 236 S1280 142 1460 242"
              opacity={Math.max(0.08, 0.34 - index * 0.016)}
            />
          ))}
        </g>
        <g fill="none" stroke="rgba(185,111,50,.25)" strokeWidth="0.68" vectorEffect="non-scaling-stroke">
          {liquidLines.slice(0, 8).map((index) => (
            <path
              key={`lower-${index}`}
              transform={`translate(0 ${index * 17})`}
              d="M-60 560 C120 480 260 548 410 492 S700 420 845 475 S1090 550 1270 486"
              opacity={Math.max(0.08, 0.25 - index * 0.021)}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,7,.04)_52%,rgba(7,7,7,.68)_100%)]" />

      {items.map(([left, top, width, height, rotate, color], index) => (
        <span
          key={index}
          className="paint-stroke absolute block"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}px`,
              height: `${height}px`,
              background: color,
              transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
              opacity: 0.36 + (index % 4) * 0.08,
            } as CSSProperties
          }
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-[72%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-[radial-gradient(circle_at_center,rgba(239,230,182,.11),transparent_68%)] blur-2xl" />
    </div>
  );
}

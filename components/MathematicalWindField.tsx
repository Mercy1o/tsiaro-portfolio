"use client";

import { useReducedMotion } from "motion/react";

type MathematicalWindFieldProps = {
  className?: string;
  intensity?: "subtle" | "normal" | "strong";
};

const streamLines = Array.from({ length: 28 }, (_, index) => index);
const contourRings = Array.from({ length: 12 }, (_, index) => index);

const formulas = [
  "∇φ = (∂φ/∂x, ∂φ/∂y)",
  "f(x,t) = A sin(kx − ωt)",
  "Σ Δzᵢ → terrain",
  "ψ(x,y) = e^(−r²/σ²)",
  "V = ∇ × Ψ",
  "010011 / 027.4 / 11.8",
];

export default function MathematicalWindField({
  className = "",
  intensity = "normal",
}: MathematicalWindFieldProps) {
  const reduceMotion = useReducedMotion();
  const opacity = intensity === "strong" ? 0.82 : intensity === "subtle" ? 0.24 : 0.5;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-[-8%] h-[116%] w-[116%]"
        role="presentation"
      >
        <defs>
          <linearGradient id="wind-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(239,234,223,0)" />
            <stop offset="0.16" stopColor="rgba(239,234,223,.13)" />
            <stop offset="0.48" stopColor="rgba(239,234,223,.28)" />
            <stop offset="0.78" stopColor="rgba(210,194,165,.12)" />
            <stop offset="1" stopColor="rgba(239,234,223,0)" />
          </linearGradient>
          <radialGradient id="signal-core">
            <stop offset="0" stopColor="rgba(216,188,143,.72)" />
            <stop offset="0.18" stopColor="rgba(184,148,100,.14)" />
            <stop offset="1" stopColor="rgba(184,148,100,0)" />
          </radialGradient>
        </defs>

        <g
          className={reduceMotion ? "" : "math-wind-streams"}
          fill="none"
          stroke="url(#wind-line)"
          strokeWidth="0.66"
          vectorEffect="non-scaling-stroke"
        >
          {streamLines.map((index) => {
            const y = 76 + index * 28;
            const amp = 34 + (index % 7) * 8;
            return (
              <path
                key={`stream-${index}`}
                opacity={0.14 + (index % 6) * 0.047}
                d={`M-180 ${y} C 90 ${y - amp} 270 ${y + amp * 0.54} 500 ${y - amp * 0.34} S 895 ${y + amp * 0.72} 1135 ${y - amp * 0.4} S 1480 ${y + amp * 0.5} 1780 ${y - amp * 0.22}`}
              />
            );
          })}
        </g>

        <g
          className={reduceMotion ? "" : "math-wind-contours"}
          fill="none"
          stroke="rgba(210,194,165,.18)"
          strokeWidth="0.62"
          vectorEffect="non-scaling-stroke"
        >
          {contourRings.map((index) => (
            <ellipse
              key={`ring-${index}`}
              cx="845"
              cy="486"
              rx={105 + index * 34}
              ry={46 + index * 16}
              transform={`rotate(${-11 + index * 0.5} 845 486)`}
              opacity={0.42 - index * 0.026}
            />
          ))}
        </g>

        <g opacity="0.48" stroke="rgba(220,203,174,.28)" strokeWidth="0.62" fill="none">
          <path d="M180 204 H520" strokeDasharray="2 15" />
          <path d="M1080 240 H1420" strokeDasharray="2 15" />
          <path d="M265 705 H610" strokeDasharray="2 15" />
          <path d="M1040 690 H1370" strokeDasharray="2 15" />
          <path d="M800 150 V750" strokeDasharray="1 18" opacity="0.34" />
          <circle cx="845" cy="486" r="3" fill="rgba(220,203,174,.78)" stroke="none" />
          <circle cx="845" cy="486" r="118" strokeDasharray="2 17" opacity="0.36" />
          <circle cx="845" cy="486" r="222" strokeDasharray="2 24" opacity="0.22" />
        </g>

        <circle cx="845" cy="486" r="190" fill="url(#signal-core)" opacity="0.06" />
      </svg>

      <div className={`absolute inset-0 ${reduceMotion ? "" : "math-code-drift"}`}>
        {formulas.map((formula, index) => (
          <span
            key={formula}
            className="absolute whitespace-nowrap font-mono text-[9px] uppercase tracking-[.18em] text-[#c8b899]/24"
            style={{
              left: `${8 + (index * 17) % 72}%`,
              top: `${14 + (index * 13) % 66}%`,
              transform: `rotate(${index % 2 === 0 ? -1.2 : 1}deg)`,
            }}
          >
            {formula}
          </span>
        ))}
      </div>

      <div className="math-wind-vignette absolute inset-0" />

      <style>{`
        .math-wind-streams {
          transform-origin: 52% 54%;
          animation: mathWindStreams 38s linear infinite;
        }
        .math-wind-contours {
          transform-origin: 53% 52%;
          animation: mathWindContours 46s ease-in-out infinite alternate;
        }
        .math-code-drift {
          animation: mathCodeDrift 29s ease-in-out infinite alternate;
        }
        .math-wind-vignette {
          background:
            radial-gradient(ellipse at 53% 50%, transparent 0%, rgba(7,7,6,.04) 43%, rgba(7,7,6,.48) 100%),
            linear-gradient(90deg, rgba(7,7,6,.42), transparent 24%, transparent 76%, rgba(7,7,6,.42));
        }
        @keyframes mathWindStreams {
          0% { transform: translate3d(-2.4%, .2%, 0) scale(1.02) skewX(-.4deg); }
          25% { transform: translate3d(-.8%, -.55%, 0) scale(1.027) skewX(-.12deg); }
          50% { transform: translate3d(.8%, .12%, 0) scale(1.034) skewX(.18deg); }
          75% { transform: translate3d(2%, .62%, 0) scale(1.041) skewX(.38deg); }
          100% { transform: translate3d(3.4%, -.18%, 0) scale(1.048) skewX(.52deg); }
        }
        @keyframes mathWindContours {
          0% { transform: rotate(-.38deg) scale(.99); }
          100% { transform: rotate(.5deg) scale(1.032); }
        }
        @keyframes mathCodeDrift {
          0% { transform: translate3d(-10px, 5px, 0); opacity: .55; }
          100% { transform: translate3d(14px, -6px, 0); opacity: .92; }
        }
      `}</style>
    </div>
  );
}

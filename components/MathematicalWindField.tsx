"use client";

import { useReducedMotion } from "motion/react";

type MathematicalWindFieldProps = {
  className?: string;
  intensity?: "subtle" | "normal" | "strong";
};

const streamLines = Array.from({ length: 22 }, (_, index) => index);
const contourRings = Array.from({ length: 11 }, (_, index) => index);

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
  const opacity = intensity === "strong" ? 0.72 : intensity === "subtle" ? 0.22 : 0.46;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-[-7%] h-[114%] w-[114%]"
        role="presentation"
      >
        <defs>
          <linearGradient id="wind-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(185,148,98,0)" />
            <stop offset="0.22" stopColor="rgba(185,148,98,.36)" />
            <stop offset="0.72" stopColor="rgba(213,193,157,.22)" />
            <stop offset="1" stopColor="rgba(185,148,98,0)" />
          </linearGradient>
          <radialGradient id="signal-core">
            <stop offset="0" stopColor="rgba(211,177,126,.8)" />
            <stop offset="0.15" stopColor="rgba(184,148,100,.18)" />
            <stop offset="1" stopColor="rgba(184,148,100,0)" />
          </radialGradient>
        </defs>

        <g
          className={reduceMotion ? "" : "math-wind-streams"}
          fill="none"
          stroke="url(#wind-line)"
          strokeWidth="0.72"
          vectorEffect="non-scaling-stroke"
        >
          {streamLines.map((index) => {
            const y = 130 + index * 29;
            const amp = 42 + (index % 6) * 9;
            return (
              <path
                key={`stream-${index}`}
                opacity={0.18 + (index % 5) * 0.055}
                d={`M-150 ${y} C 130 ${y - amp} 270 ${y + amp * 0.55} 500 ${y - amp * 0.28} S 890 ${y + amp * 0.7} 1130 ${y - amp * 0.36} S 1450 ${y + amp * 0.52} 1760 ${y - amp * 0.2}`}
              />
            );
          })}
        </g>

        <g
          className={reduceMotion ? "" : "math-wind-contours"}
          fill="none"
          stroke="rgba(184,148,100,.25)"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        >
          {contourRings.map((index) => (
            <ellipse
              key={`ring-${index}`}
              cx="845"
              cy="472"
              rx={105 + index * 35}
              ry={46 + index * 17}
              transform={`rotate(${-11 + index * 0.55} 845 472)`}
              opacity={0.5 - index * 0.032}
            />
          ))}
        </g>

        <g opacity="0.55" stroke="rgba(211,177,126,.34)" strokeWidth="0.7" fill="none">
          <path d="M180 204 H520" strokeDasharray="2 12" />
          <path d="M1080 240 H1420" strokeDasharray="2 12" />
          <path d="M265 705 H610" strokeDasharray="2 12" />
          <path d="M1040 690 H1370" strokeDasharray="2 12" />
          <path d="M800 150 V750" strokeDasharray="1 17" opacity="0.4" />
          <circle cx="845" cy="472" r="3" fill="rgba(211,177,126,.9)" stroke="none" />
          <circle cx="845" cy="472" r="118" strokeDasharray="2 16" opacity="0.42" />
          <circle cx="845" cy="472" r="222" strokeDasharray="2 22" opacity="0.26" />
        </g>

        <circle cx="845" cy="472" r="190" fill="url(#signal-core)" opacity="0.08" />
      </svg>

      <div className={`absolute inset-0 ${reduceMotion ? "" : "math-code-drift"}`}>
        {formulas.map((formula, index) => (
          <span
            key={formula}
            className="absolute whitespace-nowrap font-mono text-[9px] uppercase tracking-[.18em] text-[#b89464]/38"
            style={{
              left: `${8 + (index * 17) % 72}%`,
              top: `${14 + (index * 13) % 66}%`,
              transform: `rotate(${index % 2 === 0 ? -1.5 : 1.2}deg)`,
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
          animation: mathWindStreams 18s ease-in-out infinite alternate;
        }
        .math-wind-contours {
          transform-origin: 53% 52%;
          animation: mathWindContours 27s ease-in-out infinite alternate;
        }
        .math-code-drift {
          animation: mathCodeDrift 15s ease-in-out infinite alternate;
        }
        .math-wind-vignette {
          background:
            radial-gradient(ellipse at 53% 50%, transparent 0%, rgba(7,7,6,.06) 43%, rgba(7,7,6,.42) 100%),
            linear-gradient(90deg, rgba(7,7,6,.35), transparent 24%, transparent 76%, rgba(7,7,6,.35));
        }
        @keyframes mathWindStreams {
          0% { transform: translate3d(-1.2%, .3%, 0) scale(1.015) skewX(-.35deg); }
          45% { transform: translate3d(.5%, -.6%, 0) scale(1.03) skewX(.15deg); }
          100% { transform: translate3d(1.6%, .8%, 0) scale(1.045) skewX(.45deg); }
        }
        @keyframes mathWindContours {
          0% { transform: rotate(-.4deg) scale(.99); }
          100% { transform: rotate(.55deg) scale(1.035); }
        }
        @keyframes mathCodeDrift {
          0% { transform: translate3d(-8px, 4px, 0); opacity: .68; }
          100% { transform: translate3d(12px, -5px, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

type TopographicFieldProps = {
  className?: string;
  warm?: boolean;
};

const rings = Array.from({ length: 18 }, (_, index) => ({
  rx: 160 + index * 23,
  ry: 52 + index * 11,
  opacity: Math.max(0.06, 0.28 - index * 0.011),
}));

export default function TopographicField({
  className = "",
  warm = true,
}: TopographicFieldProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="topographic-svg absolute inset-[-12%] h-[124%] w-[124%]"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <filter id="topo-warp" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.012"
              numOctaves="3"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="42"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <radialGradient id="topo-fade" cx="50%" cy="52%" r="57%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="68%" stopColor="white" stopOpacity="0.72" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="topo-mask">
            <rect width="1200" height="760" fill="url(#topo-fade)" />
          </mask>
        </defs>

        <g
          filter="url(#topo-warp)"
          mask="url(#topo-mask)"
          fill="none"
          stroke={warm ? "rgba(211,174,122,.72)" : "rgba(235,231,219,.45)"}
          strokeWidth="1"
        >
          {rings.map((ring, index) => (
            <ellipse
              key={index}
              cx={650 + Math.sin(index * 0.72) * 34}
              cy={390 + Math.cos(index * 0.55) * 24}
              rx={ring.rx}
              ry={ring.ry}
              opacity={ring.opacity}
              transform={`rotate(${-9 + index * 0.42} 650 390)`}
            />
          ))}
        </g>

        <g fill="none" stroke={warm ? "rgba(211,174,122,.32)" : "rgba(235,231,219,.22)"} strokeWidth="0.7">
          <path d="M90 568 C260 494 365 532 510 468 S820 372 1110 428" />
          <path d="M120 603 C278 548 391 582 542 520 S846 422 1090 456" />
          <path d="M150 637 C296 592 412 620 568 566 S856 482 1060 492" />
        </g>
      </svg>

      <div className="absolute left-[61%] top-[54%] h-1.5 w-1.5 rounded-full bg-sand shadow-[0_0_28px_rgba(211,174,122,.75)]" />
      <div className="absolute left-[42%] top-[62%] h-1 w-1 rounded-full bg-bone/60" />
      <div className="absolute left-[74%] top-[46%] h-px w-[14vw] bg-gradient-to-r from-sand/40 to-transparent" />
    </div>
  );
}

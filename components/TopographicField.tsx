type TopographicFieldProps = {
  className?: string;
  warm?: boolean;
};

const rings = Array.from({ length: 24 }, (_, index) => ({
  rx: 130 + index * 22,
  ry: 48 + index * 10.8,
  opacity: Math.max(0.055, 0.32 - index * 0.0105),
}));

const secondary = Array.from({ length: 10 }, (_, index) => ({
  rx: 60 + index * 18,
  ry: 30 + index * 10,
  opacity: Math.max(0.05, 0.25 - index * 0.019),
}));

export default function TopographicField({
  className = "",
  warm = true,
}: TopographicFieldProps) {
  const primary = warm ? "rgba(218,190,147,.62)" : "rgba(238,232,218,.42)";
  const secondaryLine = warm ? "rgba(178,139,88,.32)" : "rgba(238,232,218,.20)";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        className="topographic-svg absolute inset-[-12%] h-[124%] w-[124%]"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <filter id="topo-warp" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0045 0.009"
              numOctaves="4"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="58"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <radialGradient id="topo-fade" cx="50%" cy="52%" r="63%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="66%" stopColor="white" stopOpacity="0.76" />
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
          stroke={primary}
          strokeWidth="0.78"
          vectorEffect="non-scaling-stroke"
        >
          {rings.map((ring, index) => (
            <ellipse
              key={index}
              cx={635 + Math.sin(index * 0.68) * 45}
              cy={388 + Math.cos(index * 0.49) * 31}
              rx={ring.rx}
              ry={ring.ry}
              opacity={ring.opacity}
              transform={`rotate(${-13 + index * 0.48} 635 388)`}
            />
          ))}
        </g>

        <g
          filter="url(#topo-warp)"
          fill="none"
          stroke={secondaryLine}
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        >
          {secondary.map((ring, index) => (
            <ellipse
              key={`secondary-${index}`}
              cx={935 + Math.sin(index * 0.8) * 20}
              cy={255 + Math.cos(index * 0.62) * 15}
              rx={ring.rx}
              ry={ring.ry}
              opacity={ring.opacity}
              transform={`rotate(${22 - index * 0.65} 935 255)`}
            />
          ))}
        </g>

        <g fill="none" stroke={secondaryLine} strokeWidth="0.7" vectorEffect="non-scaling-stroke">
          <path d="M-30 563 C142 487 254 527 392 484 S676 382 830 434 S1012 528 1248 455" />
          <path d="M-10 592 C158 526 280 565 420 520 S696 430 856 476 S1030 558 1230 500" />
          <path d="M18 620 C180 562 310 598 451 555 S721 477 882 520 S1042 594 1215 544" />
          <path d="M65 651 C220 602 338 632 480 596 S748 528 914 565 S1060 626 1190 585" />
        </g>

        <g opacity="0.5">
          <circle cx="656" cy="396" r="145" fill="none" stroke={secondaryLine} strokeWidth="0.65" />
          <path d="M656 232 V560 M492 396 H820" stroke={secondaryLine} strokeWidth="0.55" strokeDasharray="2 12" />
          <circle cx="656" cy="396" r="3" fill={warm ? "rgba(218,190,147,.9)" : "rgba(238,232,218,.75)"} />
        </g>
      </svg>

      <div className="absolute left-[61%] top-[54%] h-1.5 w-1.5 rounded-full bg-sand shadow-[0_0_28px_rgba(211,174,122,.75)]" />
      <div className="absolute left-[42%] top-[62%] h-1 w-1 rounded-full bg-bone/60" />
      <div className="absolute left-[74%] top-[46%] h-px w-[14vw] bg-gradient-to-r from-sand/40 to-transparent" />
    </div>
  );
}

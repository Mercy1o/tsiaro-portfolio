"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  targetActive: number;
};

type CenterConfig = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  angle: number;
  amplitude: number;
  phase: number;
};

type DynamicCenter = CenterConfig & {
  cos: number;
  sin: number;
};

type FieldSample = {
  value: number;
  gx: number;
  gy: number;
};

type Vector = {
  x: number;
  y: number;
};

const TAU = Math.PI * 2;

// Art-direction controls. These are deliberately centralized so the field can
// be tuned visually without changing the mathematical implementation.
const FIELD_CENTERS: CenterConfig[] = [
  { x: 0.08, y: 0.18, sx: 0.25, sy: 0.09, angle: 0.34, amplitude: 0.92, phase: 0.2 },
  { x: 0.35, y: 0.13, sx: 0.18, sy: 0.11, angle: -0.52, amplitude: 1.05, phase: 1.1 },
  { x: 0.72, y: 0.16, sx: 0.24, sy: 0.085, angle: 0.44, amplitude: 0.98, phase: 2.0 },
  { x: 0.94, y: 0.33, sx: 0.18, sy: 0.12, angle: -0.7, amplitude: 0.86, phase: 2.9 },
  { x: 0.22, y: 0.51, sx: 0.23, sy: 0.12, angle: -0.18, amplitude: 1.12, phase: 3.7 },
  { x: 0.57, y: 0.49, sx: 0.2, sy: 0.105, angle: 0.72, amplitude: 1.08, phase: 4.6 },
  { x: 0.82, y: 0.69, sx: 0.25, sy: 0.1, angle: -0.28, amplitude: 1.02, phase: 5.4 },
  { x: 0.36, y: 0.82, sx: 0.27, sy: 0.09, angle: 0.55, amplitude: 0.94, phase: 6.1 },
  { x: 0.05, y: 0.83, sx: 0.19, sy: 0.13, angle: -0.62, amplitude: 0.8, phase: 6.8 },
];

const CONTOUR_LEVELS = [0.2, 0.28, 0.37, 0.47, 0.59, 0.73, 0.9, 1.08];
const POINTER_RADIUS = 0.24;
const POINTER_VORTEX = 0.74;
const POINTER_REPEL = 0.18;
const WIND_STRENGTH = 0.18;

function fract(value: number) {
  return value - Math.floor(value);
}

function normalize(x: number, y: number): Vector {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function buildDynamicCenters(time: number, scroll: number): DynamicCenter[] {
  return FIELD_CENTERS.map((center, index) => {
    const driftX = Math.sin(time * 0.035 + center.phase + scroll * 2.1) * 0.018;
    const driftY = Math.cos(time * 0.029 + center.phase * 1.17 + scroll * 1.7) * 0.016;
    const scrollDriftX = Math.sin(scroll * Math.PI + center.phase) * 0.035;
    const scrollDriftY = Math.cos(scroll * Math.PI * 0.82 + center.phase) * 0.03;
    const angle = center.angle + Math.sin(time * 0.021 + scroll * 1.4 + index * 0.71) * 0.075;

    return {
      ...center,
      x: center.x + driftX + scrollDriftX,
      y: center.y + driftY + scrollDriftY,
      sx: center.sx * (1 + Math.sin(scroll * Math.PI + center.phase) * 0.06),
      sy: center.sy * (1 + Math.cos(scroll * Math.PI * 0.9 + center.phase) * 0.08),
      angle,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    };
  });
}

function fieldSample(
  x: number,
  y: number,
  time: number,
  scroll: number,
  centers: DynamicCenter[],
): FieldSample {
  let value = 0;
  let gx = 0;
  let gy = 0;

  for (const center of centers) {
    const dx = x - center.x;
    const dy = y - center.y;

    const xr = center.cos * dx + center.sin * dy;
    const yr = -center.sin * dx + center.cos * dy;

    const sx2 = center.sx * center.sx;
    const sy2 = center.sy * center.sy;
    const gaussian = center.amplitude * Math.exp(-(xr * xr / sx2 + yr * yr / sy2));

    const dXr = (-2 * xr / sx2) * gaussian;
    const dYr = (-2 * yr / sy2) * gaussian;

    value += gaussian;
    gx += dXr * center.cos - dYr * center.sin;
    gy += dXr * center.sin + dYr * center.cos;
  }

  // Low-frequency coherent waves keep the large cells from looking like
  // obvious ellipses. They are part of the potential, so fibers still follow
  // the resulting topology rather than floating independently from it.
  const p1 = TAU * (x * 0.82 + y * 0.46) + time * 0.02 + scroll * 1.4;
  const p2 = TAU * (-x * 0.37 + y * 1.06) - time * 0.016 + scroll * 0.8;
  const p3 = TAU * (x * 1.31 + y * 0.27) + time * 0.011 - scroll * 1.1;

  value += Math.sin(p1) * 0.07 + Math.sin(p2) * 0.045 + Math.cos(p3) * 0.03;
  gx += Math.cos(p1) * TAU * 0.82 * 0.07;
  gy += Math.cos(p1) * TAU * 0.46 * 0.07;
  gx += Math.cos(p2) * TAU * -0.37 * 0.045;
  gy += Math.cos(p2) * TAU * 1.06 * 0.045;
  gx += -Math.sin(p3) * TAU * 1.31 * 0.03;
  gy += -Math.sin(p3) * TAU * 0.27 * 0.03;

  return { value, gx, gy };
}

function flowVector(
  x: number,
  y: number,
  time: number,
  scroll: number,
  centers: DynamicCenter[],
  pointer: PointerState,
): Vector {
  const sample = fieldSample(x, y, time, scroll, centers);

  // Rotate the gradient by 90 degrees. This is the core relationship that
  // forces the fibers to flow around the implicit organic cells.
  let vx = -sample.gy;
  let vy = sample.gx;

  const gradientLength = Math.hypot(vx, vy);
  if (gradientLength > 0.00001) {
    vx /= gradientLength;
    vy /= gradientLength;
  }

  const windAngle = -0.08 + scroll * 0.38 + Math.sin(time * 0.045) * 0.035;
  vx += Math.cos(windAngle) * WIND_STRENGTH;
  vy += Math.sin(windAngle) * WIND_STRENGTH * 0.55;

  const dx = x - pointer.x;
  const dy = y - pointer.y;
  const distance2 = dx * dx + dy * dy;
  const influence = Math.exp(-distance2 / (POINTER_RADIUS * POINTER_RADIUS)) * pointer.active;

  if (influence > 0.001) {
    const tangent = normalize(-dy, dx);
    const radial = normalize(dx, dy);
    vx += tangent.x * POINTER_VORTEX * influence + radial.x * POINTER_REPEL * influence;
    vy += tangent.y * POINTER_VORTEX * influence + radial.y * POINTER_REPEL * influence;
  }

  return normalize(vx, vy);
}

export default function InteractiveFilamentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const ctx: CanvasRenderingContext2D = context;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let pageVisible = !document.hidden;
    let lastFrameTime = -Infinity;
    let smoothScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const pointer: PointerState = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      active: 0,
      targetActive: 0,
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.2 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = event.clientX / Math.max(window.innerWidth, 1);
      pointer.targetY = event.clientY / Math.max(window.innerHeight, 1);
      pointer.targetActive = 1;
    }

    function onPointerLeave() {
      pointer.targetActive = 0;
    }

    function onScroll() {
      targetScroll = window.scrollY;
    }

    function onVisibilityChange() {
      pageVisible = !document.hidden;
      if (pageVisible && !reduceMotion) {
        lastFrameTime = -Infinity;
        frame = window.requestAnimationFrame(draw);
      }
    }

    function pageScrollProgress() {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return Math.min(1, Math.max(0, smoothScroll / maxScroll));
    }

    function drawContours(time: number, scroll: number, centers: DynamicCenter[]) {
      const mobile = width < 720;
      const columns = mobile ? 34 : 54;
      const rows = mobile ? 26 : 38;
      const values = new Float32Array((columns + 1) * (rows + 1));

      for (let row = 0; row <= rows; row += 1) {
        const ny = row / rows;
        for (let column = 0; column <= columns; column += 1) {
          const nx = column / columns;
          values[row * (columns + 1) + column] = fieldSample(nx, ny, time, scroll, centers).value;
        }
      }

      const interpolate = (a: number, b: number, level: number) => {
        const denominator = b - a;
        if (Math.abs(denominator) < 0.00001) return 0.5;
        return Math.min(1, Math.max(0, (level - a) / denominator));
      };

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let levelIndex = 0; levelIndex < CONTOUR_LEVELS.length; levelIndex += 1) {
        const level = CONTOUR_LEVELS[levelIndex];
        ctx.beginPath();

        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const stride = columns + 1;
            const v0 = values[row * stride + column];
            const v1 = values[row * stride + column + 1];
            const v2 = values[(row + 1) * stride + column + 1];
            const v3 = values[(row + 1) * stride + column];

            const state =
              (v0 > level ? 1 : 0) |
              (v1 > level ? 2 : 0) |
              (v2 > level ? 4 : 0) |
              (v3 > level ? 8 : 0);

            if (state === 0 || state === 15) continue;

            const x0 = (column / columns) * width;
            const x1 = ((column + 1) / columns) * width;
            const y0 = (row / rows) * height;
            const y1 = ((row + 1) / rows) * height;

            const edges: [number, number][] = [
              [x0 + (x1 - x0) * interpolate(v0, v1, level), y0],
              [x1, y0 + (y1 - y0) * interpolate(v1, v2, level)],
              [x0 + (x1 - x0) * interpolate(v3, v2, level), y1],
              [x0, y0 + (y1 - y0) * interpolate(v0, v3, level)],
            ];

            let segments: [number, number][] = [];
            switch (state) {
              case 1: segments = [[3, 0]]; break;
              case 2: segments = [[0, 1]]; break;
              case 3: segments = [[3, 1]]; break;
              case 4: segments = [[1, 2]]; break;
              case 5: {
                const centerValue = (v0 + v1 + v2 + v3) * 0.25;
                segments = centerValue > level ? [[3, 2], [0, 1]] : [[3, 0], [2, 1]];
                break;
              }
              case 6: segments = [[0, 2]]; break;
              case 7: segments = [[3, 2]]; break;
              case 8: segments = [[2, 3]]; break;
              case 9: segments = [[0, 2]]; break;
              case 10: {
                const centerValue = (v0 + v1 + v2 + v3) * 0.25;
                segments = centerValue > level ? [[0, 3], [1, 2]] : [[0, 1], [3, 2]];
                break;
              }
              case 11: segments = [[1, 2]]; break;
              case 12: segments = [[1, 3]]; break;
              case 13: segments = [[0, 1]]; break;
              case 14: segments = [[3, 0]]; break;
            }

            for (const [startEdge, endEdge] of segments) {
              const start = edges[startEdge];
              const end = edges[endEdge];
              ctx.moveTo(start[0], start[1]);
              ctx.lineTo(end[0], end[1]);
            }
          }
        }

        const major = levelIndex === 2 || levelIndex === 5;
        ctx.strokeStyle = major
          ? "rgba(205,180,143,0.13)"
          : `rgba(226,214,194,${0.035 + levelIndex * 0.006})`;
        ctx.lineWidth = major ? (mobile ? 0.7 : 0.9) : (mobile ? 0.38 : 0.48);
        ctx.stroke();
      }

      ctx.restore();
    }

    function traceFiber(
      seedX: number,
      seedY: number,
      direction: number,
      steps: number,
      stepSize: number,
      time: number,
      scroll: number,
      centers: DynamicCenter[],
    ) {
      let x = seedX;
      let y = seedY;
      ctx.moveTo(x * width, y * height);

      for (let step = 0; step < steps; step += 1) {
        const k1 = flowVector(x, y, time, scroll, centers, pointer);
        const midX = x + k1.x * stepSize * direction * 0.5;
        const midY = y + k1.y * stepSize * direction * 0.5;
        const k2 = flowVector(midX, midY, time, scroll, centers, pointer);

        x += k2.x * stepSize * direction;
        y += k2.y * stepSize * direction;

        if (x < -0.05 || x > 1.05 || y < -0.05 || y > 1.05) break;
        ctx.lineTo(x * width, y * height);
      }
    }

    function drawFineFibers(time: number, scroll: number, centers: DynamicCenter[]) {
      const mobile = width < 720;
      const tablet = width < 1100;
      const fiberCount = mobile ? 76 : tablet ? 112 : 148;
      const steps = mobile ? 46 : 64;
      const stepSize = mobile ? 0.011 : 0.008;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let index = 0; index < fiberCount; index += 1) {
        const u = fract(index * 0.61803398875 + 0.071);
        const v = fract(index * 0.41421356237 + 0.173);
        const seedX = 0.02 + u * 0.96;
        const seedY = 0.02 + v * 0.96;

        const sample = fieldSample(seedX, seedY, time, scroll, centers);
        const density = Math.min(1, Math.hypot(sample.gx, sample.gy) * 0.11);
        const alpha = 0.035 + density * 0.055 + (index % 9 === 0 ? 0.025 : 0);

        ctx.beginPath();
        traceFiber(seedX, seedY, index % 2 === 0 ? 1 : -1, steps, stepSize, time, scroll, centers);
        ctx.strokeStyle = index % 11 === 0
          ? `rgba(193,153,104,${Math.min(0.13, alpha * 1.1)})`
          : `rgba(233,223,207,${Math.min(0.115, alpha)})`;
        ctx.lineWidth = mobile ? 0.42 : 0.54;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawBundles(time: number, scroll: number, centers: DynamicCenter[]) {
      const mobile = width < 720;
      const bundleCount = mobile ? 3 : 5;
      const linesPerBundle = mobile ? 14 : 24;
      const steps = mobile ? 52 : 72;
      const stepSize = mobile ? 0.009 : 0.0068;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let bundle = 0; bundle < bundleCount; bundle += 1) {
        const center = centers[(bundle * 2 + 1) % centers.length];
        const theta = bundle * 1.31 + scroll * 0.9 + time * 0.012;
        const baseX = center.x + Math.cos(theta) * center.sx * 0.82;
        const baseY = center.y + Math.sin(theta) * center.sy * 0.82;
        const tangent = flowVector(baseX, baseY, time, scroll, centers, pointer);
        const normal = { x: -tangent.y, y: tangent.x };

        for (let line = 0; line < linesPerBundle; line += 1) {
          const centered = line - (linesPerBundle - 1) * 0.5;
          const spacing = mobile ? 0.0025 : 0.00175;
          const seedX = baseX + normal.x * centered * spacing;
          const seedY = baseY + normal.y * centered * spacing;

          ctx.beginPath();
          traceFiber(seedX, seedY, bundle % 2 === 0 ? 1 : -1, steps, stepSize, time, scroll, centers);
          const edgeFade = 1 - Math.abs(centered) / Math.max(linesPerBundle * 0.5, 1);
          ctx.strokeStyle = `rgba(218,199,169,${0.045 + edgeFade * 0.05})`;
          ctx.lineWidth = mobile ? 0.52 : 0.66;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function draw(timestamp: number) {
      if (!running || !pageVisible) return;

      // Cap the procedural background near 30 fps. The typography and scroll
      // remain full-speed while the expensive geometry stays practical on laptops.
      if (!reduceMotion && timestamp - lastFrameTime < 30) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      pointer.active += (pointer.targetActive - pointer.active) * 0.045;
      smoothScroll += (targetScroll - smoothScroll) * 0.055;

      const time = timestamp * 0.001;
      const scroll = pageScrollProgress();
      const centers = buildDynamicCenters(time, scroll);

      ctx.clearRect(0, 0, width, height);
      drawContours(time, scroll, centers);
      drawFineFibers(time, scroll, centers);
      drawBundles(time, scroll, centers);

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (reduceMotion) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

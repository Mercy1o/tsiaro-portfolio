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

type Center = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  angle: number;
  strength: number;
  phase: number;
};

type Vector = { x: number; y: number };

type FieldSample = {
  value: number;
  gx: number;
  gy: number;
};

const TAU = Math.PI * 2;

const CENTERS: Center[] = [
  { x: 0.08, y: 0.18, sx: 0.28, sy: 0.085, angle: 0.35, strength: 1.05, phase: 0.2 },
  { x: 0.36, y: 0.12, sx: 0.2, sy: 0.1, angle: -0.55, strength: 1.12, phase: 1.1 },
  { x: 0.73, y: 0.17, sx: 0.27, sy: 0.08, angle: 0.47, strength: 1.0, phase: 2.1 },
  { x: 0.93, y: 0.38, sx: 0.2, sy: 0.12, angle: -0.68, strength: 0.94, phase: 2.9 },
  { x: 0.2, y: 0.55, sx: 0.25, sy: 0.11, angle: -0.2, strength: 1.16, phase: 3.8 },
  { x: 0.58, y: 0.5, sx: 0.22, sy: 0.1, angle: 0.7, strength: 1.14, phase: 4.7 },
  { x: 0.84, y: 0.72, sx: 0.28, sy: 0.09, angle: -0.3, strength: 1.06, phase: 5.6 },
  { x: 0.35, y: 0.84, sx: 0.29, sy: 0.085, angle: 0.52, strength: 0.98, phase: 6.4 },
];

const POINTER_RADIUS = 0.24;
const POINTER_VORTEX = 0.8;
const POINTER_REPEL = 0.2;
const WIND_STRENGTH = 0.17;

function normalize(x: number, y: number): Vector {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function fract(value: number) {
  return value - Math.floor(value);
}

function dynamicCenters(time: number, scroll: number) {
  return CENTERS.map((center, index) => {
    const angle = center.angle + Math.sin(time * 0.02 + scroll * 1.35 + index * 0.71) * 0.07;
    return {
      ...center,
      x: center.x + Math.sin(time * 0.03 + center.phase + scroll * 2.0) * 0.018 + Math.sin(scroll * Math.PI + center.phase) * 0.03,
      y: center.y + Math.cos(time * 0.026 + center.phase + scroll * 1.55) * 0.016 + Math.cos(scroll * Math.PI * 0.8 + center.phase) * 0.025,
      angle,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    };
  });
}

function sampleField(
  x: number,
  y: number,
  time: number,
  scroll: number,
  centers: ReturnType<typeof dynamicCenters>,
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
    const gaussian = center.strength * Math.exp(-(xr * xr / sx2 + yr * yr / sy2));
    const dxr = (-2 * xr / sx2) * gaussian;
    const dyr = (-2 * yr / sy2) * gaussian;

    value += gaussian;
    gx += dxr * center.cos - dyr * center.sin;
    gy += dxr * center.sin + dyr * center.cos;
  }

  const p1 = TAU * (x * 0.82 + y * 0.44) + time * 0.018 + scroll * 1.3;
  const p2 = TAU * (-x * 0.36 + y * 1.08) - time * 0.014 + scroll * 0.8;
  const p3 = TAU * (x * 1.28 + y * 0.28) + time * 0.01 - scroll * 1.0;

  value += Math.sin(p1) * 0.075 + Math.sin(p2) * 0.05 + Math.cos(p3) * 0.035;
  gx += Math.cos(p1) * TAU * 0.82 * 0.075;
  gy += Math.cos(p1) * TAU * 0.44 * 0.075;
  gx += Math.cos(p2) * TAU * -0.36 * 0.05;
  gy += Math.cos(p2) * TAU * 1.08 * 0.05;
  gx += -Math.sin(p3) * TAU * 1.28 * 0.035;
  gy += -Math.sin(p3) * TAU * 0.28 * 0.035;

  return { value, gx, gy };
}

function flowVector(
  x: number,
  y: number,
  time: number,
  scroll: number,
  centers: ReturnType<typeof dynamicCenters>,
  pointer: PointerState,
): Vector {
  const field = sampleField(x, y, time, scroll, centers);
  let vector = normalize(-field.gy, field.gx);

  const windAngle = -0.1 + scroll * 0.4 + Math.sin(time * 0.04) * 0.04;
  let vx = vector.x + Math.cos(windAngle) * WIND_STRENGTH;
  let vy = vector.y + Math.sin(windAngle) * WIND_STRENGTH * 0.55;

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

  vector = normalize(vx, vy);
  return vector;
}

export default function InteractiveFilamentField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const ctx = context;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let visible = !document.hidden;
    let lastFrame = -Infinity;
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

    function scrollProgress() {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return Math.min(1, Math.max(0, smoothScroll / maximum));
    }

    function traceFiber(
      seedX: number,
      seedY: number,
      direction: number,
      steps: number,
      stepSize: number,
      time: number,
      scroll: number,
      centers: ReturnType<typeof dynamicCenters>,
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

        if (x < -0.08 || x > 1.08 || y < -0.08 || y > 1.08) break;
        ctx.lineTo(x * width, y * height);
      }
    }

    function drawContours(time: number, scroll: number, centers: ReturnType<typeof dynamicCenters>) {
      const mobile = width < 720;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let centerIndex = 0; centerIndex < centers.length; centerIndex += 1) {
        const center = centers[centerIndex];
        const rings = mobile ? 5 : 7;

        for (let ring = 0; ring < rings; ring += 1) {
          const scale = 0.55 + ring * 0.17;
          const points = mobile ? 54 : 74;
          ctx.beginPath();

          for (let point = 0; point <= points; point += 1) {
            const theta = (point / points) * TAU;
            const organic =
              1 +
              Math.sin(theta * (2 + (centerIndex % 3)) + center.phase + time * 0.025) * 0.13 +
              Math.sin(theta * 5 - time * 0.018 + scroll * 1.4) * 0.055;
            const ca = Math.cos(center.angle);
            const sa = Math.sin(center.angle);
            const localX = Math.cos(theta) * center.sx * scale * organic;
            const localY = Math.sin(theta) * center.sy * scale * organic;
            const x = center.x + localX * ca - localY * sa;
            const y = center.y + localX * sa + localY * ca;

            if (point === 0) ctx.moveTo(x * width, y * height);
            else ctx.lineTo(x * width, y * height);
          }

          const major = ring === 0 || ring === rings - 2;
          ctx.strokeStyle = major
            ? "rgba(223,198,160,0.42)"
            : `rgba(232,220,199,${0.16 + ring * 0.025})`;
          ctx.lineWidth = major
            ? (mobile ? 7 : 10)
            : (mobile ? 3.2 : 4.8);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function drawFineFibers(time: number, scroll: number, centers: ReturnType<typeof dynamicCenters>) {
      const mobile = width < 720;
      const tablet = width < 1100;
      const count = mobile ? 54 : tablet ? 78 : 104;
      const steps = mobile ? 46 : 62;
      const stepSize = mobile ? 0.011 : 0.0082;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let index = 0; index < count; index += 1) {
        const seedX = 0.02 + fract(index * 0.61803398875 + 0.071) * 0.96;
        const seedY = 0.02 + fract(index * 0.41421356237 + 0.173) * 0.96;
        const field = sampleField(seedX, seedY, time, scroll, centers);
        const density = Math.min(1, Math.hypot(field.gx, field.gy) * 0.1);

        ctx.beginPath();
        traceFiber(seedX, seedY, index % 2 === 0 ? 1 : -1, steps, stepSize, time, scroll, centers);
        ctx.strokeStyle = index % 8 === 0
          ? `rgba(203,164,113,${0.28 + density * 0.16})`
          : `rgba(239,229,211,${0.22 + density * 0.16})`;
        ctx.lineWidth = mobile ? 2.4 : 3.4;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawBundles(time: number, scroll: number, centers: ReturnType<typeof dynamicCenters>) {
      const mobile = width < 720;
      const bundleCount = mobile ? 3 : 5;
      const linesPerBundle = mobile ? 10 : 18;
      const steps = mobile ? 54 : 72;
      const stepSize = mobile ? 0.009 : 0.0068;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let bundle = 0; bundle < bundleCount; bundle += 1) {
        const center = centers[(bundle * 2 + 1) % centers.length];
        const theta = bundle * 1.31 + scroll * 0.9 + time * 0.012;
        const baseX = center.x + Math.cos(theta) * center.sx * 0.84;
        const baseY = center.y + Math.sin(theta) * center.sy * 0.84;
        const tangent = flowVector(baseX, baseY, time, scroll, centers, pointer);
        const normal = { x: -tangent.y, y: tangent.x };

        for (let line = 0; line < linesPerBundle; line += 1) {
          const centered = line - (linesPerBundle - 1) * 0.5;
          const spacing = mobile ? 0.004 : 0.003;
          const seedX = baseX + normal.x * centered * spacing;
          const seedY = baseY + normal.y * centered * spacing;
          const edgeFade = 1 - Math.abs(centered) / Math.max(linesPerBundle * 0.5, 1);

          ctx.beginPath();
          traceFiber(seedX, seedY, bundle % 2 === 0 ? 1 : -1, steps, stepSize, time, scroll, centers);
          ctx.strokeStyle = `rgba(225,203,171,${0.3 + edgeFade * 0.24})`;
          ctx.lineWidth = mobile ? 8 : 12;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function draw(timestamp: number) {
      if (!running || !visible) return;

      if (!reduceMotion && timestamp - lastFrame < 30) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      pointer.active += (pointer.targetActive - pointer.active) * 0.045;
      smoothScroll += (targetScroll - smoothScroll) * 0.055;

      const time = timestamp * 0.001;
      const scroll = scrollProgress();
      const centers = dynamicCenters(time, scroll);

      ctx.clearRect(0, 0, width, height);
      drawContours(time, scroll, centers);
      drawFineFibers(time, scroll, centers);
      drawBundles(time, scroll, centers);

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
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
      visible = !document.hidden;
      if (visible && !reduceMotion) {
        lastFrame = -Infinity;
        frame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (reduceMotion) draw(0);
    else frame = window.requestAnimationFrame(draw);

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

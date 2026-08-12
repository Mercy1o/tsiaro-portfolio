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

type Cell = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation: number;
  phase: number;
  lobeA: number;
  lobeB: number;
  fold: number;
};

type DynamicCell = Cell & {
  cos: number;
  sin: number;
};

type Vector = { x: number; y: number };
type Point = { x: number; y: number };

const TAU = Math.PI * 2;

// Large irregular cells. Their overlap and different aspect ratios are what
// creates the reference-like "soft territories" rather than generic waves.
const CELLS: Cell[] = [
  { x: 0.08, y: 0.11, rx: 0.19, ry: 0.105, rotation: 0.58, phase: 0.2, lobeA: 0.13, lobeB: 0.055, fold: 4.9 },
  { x: 0.34, y: 0.06, rx: 0.17, ry: 0.085, rotation: -0.42, phase: 1.1, lobeA: 0.11, lobeB: 0.07, fold: 2.8 },
  { x: 0.64, y: 0.15, rx: 0.23, ry: 0.115, rotation: 0.3, phase: 2.0, lobeA: 0.15, lobeB: 0.05, fold: 5.55 },
  { x: 0.96, y: 0.22, rx: 0.21, ry: 0.1, rotation: -0.76, phase: 2.9, lobeA: 0.12, lobeB: 0.065, fold: 3.25 },
  { x: 0.18, y: 0.39, rx: 0.22, ry: 0.13, rotation: -0.22, phase: 3.8, lobeA: 0.14, lobeB: 0.055, fold: 0.65 },
  { x: 0.52, y: 0.42, rx: 0.205, ry: 0.105, rotation: 0.72, phase: 4.7, lobeA: 0.16, lobeB: 0.05, fold: 2.15 },
  { x: 0.82, y: 0.49, rx: 0.24, ry: 0.135, rotation: -0.36, phase: 5.5, lobeA: 0.12, lobeB: 0.07, fold: 4.15 },
  { x: 0.02, y: 0.68, rx: 0.2, ry: 0.11, rotation: 0.48, phase: 6.2, lobeA: 0.13, lobeB: 0.05, fold: 5.0 },
  { x: 0.33, y: 0.73, rx: 0.25, ry: 0.125, rotation: -0.58, phase: 7.0, lobeA: 0.15, lobeB: 0.06, fold: 2.95 },
  { x: 0.69, y: 0.78, rx: 0.22, ry: 0.1, rotation: 0.46, phase: 7.8, lobeA: 0.11, lobeB: 0.075, fold: 0.85 },
  { x: 0.98, y: 0.82, rx: 0.2, ry: 0.12, rotation: -0.24, phase: 8.7, lobeA: 0.15, lobeB: 0.05, fold: 3.75 },
];

const POINTER_RADIUS = 0.2;
const POINTER_PUSH = 0.035;
const FLOW_POINTER_STRENGTH = 0.5;

function normalize(x: number, y: number): Vector {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function fract(value: number) {
  return value - Math.floor(value);
}

function buildCells(time: number, scroll: number): DynamicCell[] {
  return CELLS.map((cell, index) => {
    const rotation =
      cell.rotation +
      Math.sin(time * 0.018 + cell.phase + scroll * 1.4 + index * 0.1) * 0.045;

    return {
      ...cell,
      x:
        cell.x +
        Math.sin(time * 0.024 + cell.phase) * 0.008 +
        Math.sin(scroll * Math.PI * 1.1 + cell.phase) * 0.022,
      y:
        cell.y +
        Math.cos(time * 0.021 + cell.phase * 1.1) * 0.007 +
        Math.cos(scroll * Math.PI * 0.9 + cell.phase) * 0.018,
      rotation,
      cos: Math.cos(rotation),
      sin: Math.sin(rotation),
    };
  });
}

function organicRadius(cell: DynamicCell, theta: number, time: number, scroll: number) {
  return (
    1 +
    Math.sin(theta * 2 + cell.phase + time * 0.015 + scroll * 0.7) * cell.lobeA +
    Math.sin(theta * 3 - cell.phase * 0.7 - time * 0.011) * cell.lobeB +
    Math.sin(theta * 5 + cell.phase * 1.4 + scroll * 1.1) * 0.032 +
    Math.cos(theta * 7 - cell.phase + time * 0.008) * 0.018
  );
}

function cellPoint(
  cell: DynamicCell,
  theta: number,
  shell: number,
  time: number,
  scroll: number,
  pointer: PointerState,
): Point {
  const radius = organicRadius(cell, theta, time, scroll) * (1 + shell);
  const localX = Math.cos(theta) * cell.rx * radius;
  const localY = Math.sin(theta) * cell.ry * radius;

  let x = cell.x + localX * cell.cos - localY * cell.sin;
  let y = cell.y + localX * cell.sin + localY * cell.cos;

  // The pointer does not drag the drawing. It creates a soft local pressure,
  // which makes nearby contour hairs open and then settle back into place.
  const dx = x - pointer.x;
  const dy = y - pointer.y;
  const distance = Math.hypot(dx, dy);
  const influence = Math.exp(-(distance * distance) / (POINTER_RADIUS * POINTER_RADIUS)) * pointer.active;
  if (influence > 0.001) {
    const radial = normalize(dx, dy);
    x += radial.x * POINTER_PUSH * influence;
    y += radial.y * POINTER_PUSH * influence;
  }

  return { x, y };
}

function shortestAngleDelta(a: number, b: number) {
  let delta = a - b;
  while (delta > Math.PI) delta -= TAU;
  while (delta < -Math.PI) delta += TAU;
  return delta;
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
      dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.2 : 1.45);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function scrollProgress() {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      return Math.min(1, Math.max(0, smoothScroll / maximum));
    }

    function drawBackdrop() {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#211a14");
      gradient.addColorStop(0.48, "#18130f");
      gradient.addColorStop(1, "#241a12");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function strokeCell(
      cell: DynamicCell,
      shell: number,
      time: number,
      scroll: number,
      start = 0,
      span = TAU,
      points = 110,
    ) {
      ctx.beginPath();
      for (let index = 0; index <= points; index += 1) {
        const theta = start + (index / points) * span;
        const point = cellPoint(cell, theta, shell, time, scroll, pointer);
        const px = point.x * width;
        const py = point.y * height;
        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
    }

    function drawContourFamilies(time: number, scroll: number, cells: DynamicCell[]) {
      const mobile = width < 720;
      const shells = mobile ? 11 : 18;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      cells.forEach((cell, cellIndex) => {
        for (let shellIndex = 0; shellIndex < shells; shellIndex += 1) {
          const t = shellIndex / Math.max(shells - 1, 1);
          const shell = -0.2 + t * 0.46;
          strokeCell(cell, shell, time, scroll, 0, TAU, mobile ? 74 : 112);

          const edgeBias = 1 - Math.abs(t - 0.56) * 1.35;
          const alpha = 0.07 + Math.max(0, edgeBias) * 0.09 + (cellIndex % 4 === 0 ? 0.018 : 0);
          ctx.strokeStyle = `rgba(231,216,193,${alpha})`;
          ctx.lineWidth = mobile ? 0.55 : 0.78;
          ctx.stroke();
        }
      });

      ctx.restore();
    }

    function drawCompressedFolds(time: number, scroll: number, cells: DynamicCell[]) {
      const mobile = width < 720;
      const lines = mobile ? 10 : 18;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      cells.forEach((cell, cellIndex) => {
        // Not every territory gets a strong fold; keeping some quiet regions is
        // essential to match the reference's mix of dense and open areas.
        if (cellIndex % 3 === 1 && width < 900) return;

        const foldCenter = cell.fold + Math.sin(time * 0.012 + cell.phase + scroll) * 0.12;
        const span = 1.2 + (cellIndex % 3) * 0.22;

        for (let line = 0; line < lines; line += 1) {
          const centered = line - (lines - 1) * 0.5;
          const shell = 0.045 + centered * (mobile ? 0.008 : 0.0062);
          strokeCell(cell, shell, time, scroll, foldCenter - span * 0.5, span, mobile ? 42 : 64);

          const edgeFade = 1 - Math.abs(centered) / Math.max(lines * 0.5, 1);
          ctx.strokeStyle = `rgba(239,224,199,${0.11 + edgeFade * 0.17})`;
          ctx.lineWidth = mobile ? 0.7 : 0.95;
          ctx.stroke();
        }
      });

      ctx.restore();
    }

    function drawInteriorHairs(time: number, scroll: number, cells: DynamicCell[]) {
      const mobile = width < 720;
      const hairsPerCell = mobile ? 7 : 12;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      cells.forEach((cell, cellIndex) => {
        for (let hair = 0; hair < hairsPerCell; hair += 1) {
          const baseTheta = fract(hair * 0.618 + cellIndex * 0.171) * TAU;
          const length = 1.7 + (hair % 4) * 0.28;
          ctx.beginPath();

          const points = mobile ? 34 : 54;
          for (let pointIndex = 0; pointIndex <= points; pointIndex += 1) {
            const p = pointIndex / points;
            const theta = baseTheta + p * length;
            const shell =
              -0.14 +
              p * 0.22 +
              Math.sin(p * Math.PI * 2 + hair * 0.8 + time * 0.018) * 0.022;
            const point = cellPoint(cell, theta, shell, time, scroll, pointer);
            const px = point.x * width;
            const py = point.y * height;
            if (pointIndex === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          ctx.strokeStyle = hair % 5 === 0
            ? "rgba(201,160,108,0.12)"
            : "rgba(232,220,201,0.085)";
          ctx.lineWidth = mobile ? 0.42 : 0.58;
          ctx.stroke();
        }
      });

      ctx.restore();
    }

    function flowVector(x: number, y: number, cells: DynamicCell[], time: number, scroll: number): Vector {
      let vx = 0.82;
      let vy = Math.sin(y * 8 + time * 0.025 + scroll * 2.2) * 0.08;
      let totalWeight = 0.35;

      for (const cell of cells) {
        const dx = x - cell.x;
        const dy = y - cell.y;
        const localX = dx * cell.cos + dy * cell.sin;
        const localY = -dx * cell.sin + dy * cell.cos;
        const elliptical = Math.sqrt(
          (localX * localX) / (cell.rx * cell.rx * 1.5) +
          (localY * localY) / (cell.ry * cell.ry * 1.5),
        );
        const weight = Math.exp(-elliptical * elliptical * 0.9);
        if (weight < 0.002) continue;

        const tangent = normalize(-dy, dx);
        vx += tangent.x * weight;
        vy += tangent.y * weight;
        totalWeight += weight;
      }

      const pdx = x - pointer.x;
      const pdy = y - pointer.y;
      const pd2 = pdx * pdx + pdy * pdy;
      const pointerInfluence = Math.exp(-pd2 / (POINTER_RADIUS * POINTER_RADIUS)) * pointer.active;
      if (pointerInfluence > 0.001) {
        const orbit = normalize(-pdy, pdx);
        vx += orbit.x * FLOW_POINTER_STRENGTH * pointerInfluence;
        vy += orbit.y * FLOW_POINTER_STRENGTH * pointerInfluence;
      }

      return normalize(vx / totalWeight, vy / totalWeight);
    }

    function drawLooseFlow(time: number, scroll: number, cells: DynamicCell[]) {
      const mobile = width < 720;
      const count = mobile ? 22 : 42;
      const steps = mobile ? 54 : 78;
      const stepSize = mobile ? 0.014 : 0.01;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let line = 0; line < count; line += 1) {
        let x = -0.05 + fract(line * 0.381966 + 0.13) * 0.18;
        let y = 0.02 + fract(line * 0.618034 + 0.29) * 0.96;
        ctx.beginPath();
        ctx.moveTo(x * width, y * height);

        for (let step = 0; step < steps; step += 1) {
          const k1 = flowVector(x, y, cells, time, scroll);
          const mx = x + k1.x * stepSize * 0.5;
          const my = y + k1.y * stepSize * 0.5;
          const k2 = flowVector(mx, my, cells, time, scroll);
          x += k2.x * stepSize;
          y += k2.y * stepSize;
          if (x > 1.06 || y < -0.08 || y > 1.08) break;
          ctx.lineTo(x * width, y * height);
        }

        ctx.strokeStyle = line % 7 === 0
          ? "rgba(196,151,97,0.095)"
          : "rgba(228,214,193,0.07)";
        ctx.lineWidth = mobile ? 0.44 : 0.6;
        ctx.stroke();
      }

      ctx.restore();
    }

    function draw(timestamp: number) {
      if (!running || !visible) return;

      if (!reduceMotion && timestamp - lastFrame < 32) {
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
      const cells = buildCells(time, scroll);

      ctx.clearRect(0, 0, width, height);
      drawBackdrop();
      drawLooseFlow(time, scroll, cells);
      drawContourFamilies(time, scroll, cells);
      drawInteriorHairs(time, scroll, cells);
      drawCompressedFolds(time, scroll, cells);

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

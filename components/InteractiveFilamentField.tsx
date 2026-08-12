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

const TAU = Math.PI * 2;

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
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const pointer: PointerState = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      active: 0,
      targetActive: 0,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.2 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX / Math.max(window.innerWidth, 1);
      pointer.targetY = event.clientY / Math.max(window.innerHeight, 1);
      pointer.targetActive = 1;
    };

    const onPointerLeave = () => {
      pointer.targetActive = 0;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const flowAngle = (x: number, y: number, t: number, scrollPhase: number) => {
      const nx = x / Math.max(width, 1);
      const ny = y / Math.max(height, 1);

      let angle =
        Math.sin(nx * TAU * 1.55 + t * 0.14 + scrollPhase * 0.42) * 0.42 +
        Math.cos(ny * TAU * 1.18 - t * 0.11 - scrollPhase * 0.28) * 0.52 +
        Math.sin((nx + ny) * TAU * 1.9 + t * 0.08) * 0.22;

      const centers = [
        {
          x: width * (0.26 + Math.sin(scrollPhase * 0.34) * 0.045),
          y: height * (0.3 + Math.cos(scrollPhase * 0.23) * 0.06),
          sign: 1,
          power: 0.9,
        },
        {
          x: width * (0.68 + Math.cos(scrollPhase * 0.26) * 0.055),
          y: height * (0.47 + Math.sin(scrollPhase * 0.31) * 0.055),
          sign: -1,
          power: 0.72,
        },
        {
          x: width * (0.47 + Math.sin(scrollPhase * 0.19) * 0.04),
          y: height * (0.76 + Math.cos(scrollPhase * 0.29) * 0.04),
          sign: 1,
          power: 0.58,
        },
      ];

      for (const center of centers) {
        const dx = x - center.x;
        const dy = y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / Math.max(width, height) / 0.34);
        if (influence > 0) {
          const vortex = Math.atan2(dy, dx) + center.sign * Math.PI * 0.5;
          angle = angle * (1 - influence * center.power * 0.34) + vortex * influence * center.power * 0.34;
        }
      }

      const px = pointer.x * width;
      const py = pointer.y * height;
      const pdx = x - px;
      const pdy = y - py;
      const pd = Math.sqrt(pdx * pdx + pdy * pdy);
      const pointerRadius = Math.min(width, height) * 0.3;
      const pointerInfluence = Math.max(0, 1 - pd / pointerRadius) * pointer.active;

      if (pointerInfluence > 0) {
        const tangent = Math.atan2(pdy, pdx) + Math.PI * 0.5;
        angle = angle * (1 - pointerInfluence * 0.52) + tangent * pointerInfluence * 0.52;
      }

      angle += 0.16 + Math.sin(scrollPhase * 0.55) * 0.11;
      return angle;
    };

    const drawTopography = (t: number, scrollPhase: number) => {
      const mobile = width < 720;
      const families = mobile ? 3 : 5;
      const rings = mobile ? 6 : 9;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (let family = 0; family < families; family += 1) {
        const fx = ((family * 0.23 + 0.12 + Math.sin(scrollPhase * 0.13 + family) * 0.025) % 0.92) + 0.03;
        const fy = 0.16 + ((family * 0.19 + 0.07) % 0.72) + Math.cos(scrollPhase * 0.16 + family * 0.7) * 0.025;
        const cx = width * fx;
        const cy = height * fy;
        const base = Math.min(width, height) * (0.075 + (family % 3) * 0.018);

        for (let ring = 0; ring < rings; ring += 1) {
          const radius = base + ring * (mobile ? 11 : 14);
          ctx.beginPath();

          const points = mobile ? 54 : 76;
          for (let point = 0; point <= points; point += 1) {
            const theta = (point / points) * TAU;
            const organic =
              1 +
              Math.sin(theta * (2 + (family % 3)) + family * 0.9 + t * 0.08) * 0.12 +
              Math.sin(theta * 5 - t * 0.05 + ring * 0.18) * 0.045;
            const stretchX = 1.3 + Math.sin(family * 1.7) * 0.24;
            const stretchY = 0.78 + Math.cos(family * 1.3) * 0.12;
            const x = cx + Math.cos(theta) * radius * organic * stretchX;
            const y = cy + Math.sin(theta) * radius * organic * stretchY;

            if (point === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const alpha = Math.max(0.025, 0.105 - ring * 0.007);
          ctx.strokeStyle = `rgba(226, 213, 190, ${alpha})`;
          ctx.lineWidth = mobile ? 0.42 : 0.52;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawFilaments = (t: number, scrollPhase: number) => {
      const mobile = width < 720;
      const lineCount = mobile ? 26 : 48;
      const steps = mobile ? 62 : 86;
      const stepLength = mobile ? 10 : 12;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (let line = 0; line < lineCount; line += 1) {
        const band = line / Math.max(1, lineCount - 1);
        const group = Math.floor(line / (mobile ? 5 : 8));
        let x = -width * 0.08 + ((line * 37) % Math.max(width * 0.16, 1));
        let y = height * (0.05 + band * 0.9);
        y += Math.sin(line * 1.37 + scrollPhase * 0.4) * (mobile ? 12 : 18);

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let step = 0; step < steps; step += 1) {
          const angle = flowAngle(x, y, t + group * 0.08, scrollPhase);
          const gust = 0.84 + Math.sin(t * 0.52 + line * 0.41 + step * 0.03) * 0.08;
          x += Math.cos(angle) * stepLength * gust;
          y += Math.sin(angle) * stepLength * gust;
          ctx.lineTo(x, y);

          if (x > width * 1.08 || y < -height * 0.18 || y > height * 1.18) break;
        }

        const groupPulse = 0.76 + Math.sin(t * 0.34 + group * 1.1) * 0.2;
        const alpha = (0.045 + (line % 8) * 0.006) * groupPulse;
        ctx.strokeStyle = line % 7 === 0
          ? `rgba(204, 174, 128, ${Math.min(alpha * 1.35, 0.16)})`
          : `rgba(238, 229, 213, ${Math.min(alpha, 0.13)})`;
        ctx.lineWidth = line % 8 === 0 ? (mobile ? 0.72 : 0.9) : (mobile ? 0.46 : 0.58);
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = (timestamp: number) => {
      if (!running) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      pointer.active += (pointer.targetActive - pointer.active) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.055;

      ctx.clearRect(0, 0, width, height);

      const t = timestamp * 0.001;
      const scrollPhase = scrollY * 0.00135;

      drawTopography(t, scrollPhase);
      drawFilaments(t, scrollPhase);

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduceMotion) {
      draw(0);
      window.cancelAnimationFrame(frame);
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

"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type RealtimeWindThreadsProps = {
  className?: string;
  strength?: "subtle" | "normal" | "strong";
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

export default function RealtimeWindThreads({
  className = "",
  strength = "normal",
}: RealtimeWindThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = true;

    const pointer: PointerState = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    const strengthMultiplier = strength === "strong" ? 1.35 : strength === "subtle" ? 0.58 : 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.targetX = event.clientX / Math.max(window.innerWidth, 1);
      pointer.targetY = event.clientY / Math.max(window.innerHeight, 1);
    }

    function handlePointerLeave() {
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    }

    function draw(timestamp: number) {
      if (!running) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";
      context.lineCap = "round";
      context.lineJoin = "round";

      const t = timestamp * 0.001;
      const mobile = width < 720;
      const threadCount = mobile ? 24 : 46;
      const step = mobile ? 28 : 34;
      const gust = 0.68 + Math.sin(t * 0.72) * 0.16 + Math.sin(t * 1.91 + 1.4) * 0.08;
      const pointerBend = (pointer.y - 0.5) * 42;
      const pointerSpeed = (pointer.x - 0.5) * 0.6;

      for (let index = 0; index < threadCount; index += 1) {
        const ratio = threadCount <= 1 ? 0 : index / (threadCount - 1);
        const lane = height * (0.08 + ratio * 0.84);
        const phase = index * 0.71;
        const amplitude = (11 + (index % 7) * 2.8) * strengthMultiplier;
        const drift = ((t * (38 + (index % 5) * 4) * gust * strengthMultiplier) % (width + 320)) - 160;
        const verticalBias = Math.sin(t * 0.31 + phase) * 8 + pointerBend * (0.16 + ratio * 0.18);

        context.beginPath();

        let first = true;
        for (let x = -180; x <= width + 220; x += step) {
          const worldX = x + drift;
          const waveA = Math.sin(worldX * 0.0072 + t * (1.15 + pointerSpeed) + phase) * amplitude;
          const waveB = Math.sin(worldX * 0.0155 - t * 0.68 + phase * 1.8) * amplitude * 0.34;
          const gustLift = Math.sin(t * 1.28 + worldX * 0.0035 + index * 0.28) * 4.4 * strengthMultiplier;
          const y = lane + waveA + waveB + gustLift + verticalBias;

          if (first) {
            context.moveTo(worldX, y);
            first = false;
          } else {
            context.lineTo(worldX, y);
          }
        }

        const alphaBase = 0.075 + (index % 6) * 0.012;
        const pulse = 0.78 + Math.sin(t * 0.9 + phase) * 0.22;
        const alpha = Math.min(0.22, alphaBase * pulse * strengthMultiplier);
        const warmMix = index % 4 === 0;
        context.strokeStyle = warmMix
          ? `rgba(222, 205, 174, ${alpha})`
          : `rgba(244, 240, 230, ${alpha})`;
        context.lineWidth = mobile ? 0.55 : 0.68;
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

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
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion, strength]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

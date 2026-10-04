"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  drift: number;
  phase: number;
};

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const particles: Particle[] = Array.from({ length: 42 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.6 + 0.5,
      drift: Math.random() * 0.00012 + 0.00004,
      phase: index * 0.7,
    }));

    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas!.width = Math.floor(width * pixelRatio);
      canvas!.height = Math.floor(height * pixelRatio);
      context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    }

    function draw() {
      context!.clearRect(0, 0, width, height);
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim();
      const rgb = color || "124, 111, 255";
      const points = particles.map((particle, index) => {
        const wave = reducedMotion ? 0 : Math.sin(frame * particle.drift + particle.phase) * 0.025;
        return {
          x: (particle.x + wave + (pointer.x / Math.max(width, 1) - 0.5) * 0.018) * width,
          y: (particle.y + wave + (pointer.y / Math.max(height, 1) - 0.5) * 0.018) * height,
          radius: particle.radius,
          index,
        };
      });

      points.forEach((point, index) => {
        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const next = points[nextIndex];
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance < 120) {
            context!.beginPath();
            context!.strokeStyle = `rgba(${rgb}, ${(1 - distance / 120) * 0.13})`;
            context!.lineWidth = 1;
            context!.moveTo(point.x, point.y);
            context!.lineTo(next.x, next.y);
            context!.stroke();
          }
        }

        context!.beginPath();
        context!.fillStyle = `rgba(${rgb}, ${0.22 + Math.sin(frame * 0.008 + point.index) * 0.1})`;
        context!.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context!.fill();
      });

      frame += 1;
      if (!reducedMotion && !document.hidden) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resize();
    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}

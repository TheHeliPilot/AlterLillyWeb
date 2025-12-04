"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface FloatingOrbsProps {
  className?: string;
}

const COLORS = [
  { r: 232, g: 117, b: 74, glow: "rgba(232, 117, 74, 0.3)" },   // Maxine orange
  { r: 139, g: 107, b: 95, glow: "rgba(139, 107, 95, 0.3)" },   // Liliana brown
  { r: 74, g: 107, b: 79, glow: "rgba(74, 107, 79, 0.3)" },     // Forest green
  { r: 232, g: 228, b: 220, glow: "rgba(232, 228, 220, 0.15)" }, // Snow white
  { r: 139, g: 58, b: 58, glow: "rgba(139, 58, 58, 0.25)" },    // Blood red
];

export function FloatingOrbs({ className = "" }: FloatingOrbsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  const initOrbs = useCallback((width: number, height: number) => {
    const orbCount = Math.min(Math.floor((width * height) / 25000), 40);
    const orbs: Orb[] = [];

    for (let i = 0; i < orbCount; i++) {
      const colorData = COLORS[Math.floor(Math.random() * COLORS.length)];
      const baseRadius = Math.random() * 80 + 40;

      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: baseRadius,
        baseRadius: baseRadius,
        color: `${colorData.r}, ${colorData.g}, ${colorData.b}`,
        alpha: Math.random() * 0.15 + 0.05,
        baseAlpha: Math.random() * 0.15 + 0.05,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    orbsRef.current = orbs;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      if (orbsRef.current.length === 0) {
        initOrbs(width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    const handleScroll = () => {
      // Update mouse position relative to scroll
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      const scrollY = window.scrollY;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + height;

      orbsRef.current.forEach((orb) => {
        // Pulse animation
        const pulse = Math.sin(time * orb.pulseSpeed + orb.pulsePhase);
        orb.radius = orb.baseRadius + pulse * 10;
        orb.alpha = orb.baseAlpha + pulse * 0.03;

        // Mouse interaction - gentle attraction/repulsion
        const dx = mouseRef.current.x - orb.x;
        const dy = mouseRef.current.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 300 && dist > 0) {
          const force = (300 - dist) / 300;
          // Gentle push away from cursor
          orb.vx -= (dx / dist) * force * 0.02;
          orb.vy -= (dy / dist) * force * 0.02;
        }

        // Apply velocity with damping
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.vx *= 0.99;
        orb.vy *= 0.99;

        // Add gentle drift
        orb.vx += (Math.random() - 0.5) * 0.01;
        orb.vy += (Math.random() - 0.5) * 0.01;

        // Boundary wrapping
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = document.body.scrollHeight + orb.radius;
        if (orb.y > document.body.scrollHeight + orb.radius) orb.y = -orb.radius;

        // Only draw orbs in or near viewport
        const orbScreenY = orb.y - scrollY;
        if (orbScreenY > -orb.radius * 2 && orbScreenY < height + orb.radius * 2) {
          // Create gradient for soft glow effect
          const gradient = ctx.createRadialGradient(
            orb.x, orbScreenY, 0,
            orb.x, orbScreenY, orb.radius
          );

          gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 1.5})`);
          gradient.addColorStop(0.4, `rgba(${orb.color}, ${orb.alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

          ctx.beginPath();
          ctx.arc(orb.x, orbScreenY, orb.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initOrbs, prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Static subtle background for reduced motion
    return (
      <div
        className={`fixed inset-0 pointer-events-none ${className}`}
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, rgba(232, 117, 74, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(74, 107, 79, 0.05) 0%, transparent 50%)"
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ zIndex: 1 }}
    />
  );
}

export default FloatingOrbs;

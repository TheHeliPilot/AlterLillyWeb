"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

interface SnowParticlesProps {
  count?: number;
  className?: string;
}

export function SnowParticles({ count = 100, className = "" }: SnowParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  // Initialize particles
  useEffect(() => {
    if (prefersReducedMotion) {
      // Static snow for reduced motion
      setParticles(
        Array.from({ length: Math.floor(count / 3) }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: 0,
          opacity: Math.random() * 0.5 + 0.3,
          wobble: 0,
          wobbleSpeed: 0,
        }))
      );
      return;
    }

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 - 10,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));
    setParticles(newParticles);
  }, [count, prefersReducedMotion]);

  // Animate particles
  useEffect(() => {
    if (prefersReducedMotion || particles.length === 0) return;

    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newY = particle.y + particle.speed;
          let newWobble = particle.wobble + particle.wobbleSpeed;
          let newX = particle.x + Math.sin(newWobble) * 0.1;

          // Reset particle when it goes off screen
          if (newY > 110) {
            newY = -5;
            newX = Math.random() * 100;
          }

          // Wrap x position
          if (newX > 105) newX = -5;
          if (newX < -5) newX = 105;

          return {
            ...particle,
            x: newX,
            y: newY,
            wobble: newWobble,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles.length, prefersReducedMotion]);

  if (particles.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-snow-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: particle.size > 2 ? "blur(0.5px)" : "none",
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}

// Alternative CSS-based snow for better performance
export function SnowParticlesCSS({ count = 50, className = "" }: SnowParticlesProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="snow-particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            opacity: Math.random() * 0.6 + 0.2,
            animation: `snowfall ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export default SnowParticles;

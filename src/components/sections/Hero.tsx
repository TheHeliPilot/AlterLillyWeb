"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui";
import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Layer - Video with blur */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: prefersReducedMotion ? 0 : bgY }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510] via-[#0f0e0d] to-[#0a0908]" />

        {/* Video Background - blurred and darkened */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover scale-110"
              style={{
                filter: "blur(4px) brightness(0.4) saturate(0.8)",
                transform: `scale(1.1) translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <source src="/videos/video_with_changing_ingame_gifs.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-bg-dark/60" />
      </motion.div>

      {/* Midground fog layer */}
      <motion.div
        className="absolute inset-0 z-5"
        style={{ y: prefersReducedMotion ? 0 : midY }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-bg-dark/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        style={{ y: prefersReducedMotion ? 0 : textY, opacity: prefersReducedMotion ? 1 : opacity }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          {/* [PLACEHOLDER: Game Logo - Replace with actual logo image] */}
          <h1 className="font-display text-6xl md:text-8xl text-text-cream tracking-[0.15em] glow-text">
            {SITE_CONFIG.name}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-xl md:text-2xl text-text-muted mb-4 italic"
        >
          {/* [WRITER: 5-8 word atmospheric tagline] */}
          {SITE_CONFIG.tagline}
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-base md:text-lg text-text-muted/70 mb-12 max-w-2xl mx-auto"
        >
          A hand-painted 2D medieval RPG where your actions shape destiny in a village
          gripped by an unusual plague.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          {/* Watch Trailer */}
          <ButtonLink
            href="#trailer"
            variant="outline"
            size="lg"
            icon={<Icon name="play" size={20} />}
          >
            Watch Trailer
          </ButtonLink>

          {/* Wishlist on Steam - Coming Soon */}
          <ButtonLink
            href={SOCIAL_LINKS.steam.url}
            variant="secondary"
            size="lg"
            icon={<Icon name="steam" size={20} />}
            className="opacity-70 cursor-not-allowed"
            aria-disabled={true}
          >
            Wishlist on Steam
            <span className="text-xs ml-2 opacity-70">(Q1 2026)</span>
          </ButtonLink>

          {/* Itch.io - Available Now */}
          <ButtonLink
            href={SOCIAL_LINKS.itchio.url}
            variant="cta"
            size="lg"
            glow
            icon={<Icon name="itchio" size={20} />}
            external
          >
            NSFW Animations
            <span className="text-xs ml-2 bg-white/20 px-2 py-0.5 rounded">
              Available Now
            </span>
          </ButtonLink>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-text-muted/60"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-forest-green" />
            100% Hand-Painted
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-maxine-orange" />
            Live2D Animated
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-liliana-brown" />
            Living World
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted/50 hover:text-text-cream transition-colors"
          aria-label="Scroll to content"
        >
          <span className="text-xs font-ui uppercase tracking-wider">
            Discover More
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="scrollDown" size={24} />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(15, 14, 13, 0.4) 100%)",
        }}
      />
    </section>
  );
}

export default Hero;

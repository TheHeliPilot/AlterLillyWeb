"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ButtonLink } from "@/components/ui";
import { Icon } from "@/components/ui/Icons";
import { SOCIAL_LINKS, CHARACTERS } from "@/lib/constants";

// Animation previews - these would be replaced with actual preview images/gifs
const ANIMATION_PREVIEWS = [
  {
    id: "idle",
    name: "Idle Breathing",
    description: "Natural breathing animations bring characters to life with subtle chest movement and gentle swaying.",
    character: "liliana",
  },
  {
    id: "expressions",
    name: "Dynamic Expressions",
    description: "Over 20 unique facial expressions per character - from shy glances to passionate intensity.",
    character: "maxine",
  },
  {
    id: "interactions",
    name: "Interactive Scenes",
    description: "Full Live2D animated scenes that respond to your choices. Every intimate moment is fully animated.",
    character: "liliana",
  },
  {
    id: "physics",
    name: "Physics Simulation",
    description: "Hair, clothing, and body physics react naturally to movement, creating unmatched realism.",
    character: "sophie",
  },
];

export function Live2DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [activePreview, setActivePreview] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const activeAnimation = ANIMATION_PREVIEWS[activePreview];
  const character = CHARACTERS.find(c => c.id === activeAnimation?.character);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-b from-bg-dark via-bg-mid to-bg-dark relative overflow-hidden"
      id="live2d"
    >
      {/* Atmospheric Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${character?.themeColor || '#E8754A'}15 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Animated accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-maxine-orange/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-forest-green/20 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Extra Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-maxine-orange/10 border border-maxine-orange/30 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-maxine-orange animate-pulse" />
            <span className="text-maxine-orange text-sm font-ui uppercase tracking-wider">
              Premium Live2D Animation
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl text-text-cream tracking-wider mb-4">
            Characters That{" "}
            <span className="text-maxine-orange">Breathe</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Every character in Alter Lily is brought to life with premium Live2D animation.
            Watch them breathe, emote, and react with unparalleled fluidity.
          </p>
        </motion.div>

        {/* Main Showcase Area */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Preview Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all duration-500"
              style={{
                borderColor: isHovering ? (character?.themeColor || '#E8754A') : 'var(--border)',
                boxShadow: isHovering ? `0 0 60px ${character?.themeColor || '#E8754A'}20` : 'none'
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Preview Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-mid to-bg-dark flex items-center justify-center">
                {/* Character Placeholder - Replace with actual Live2D preview or video */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreview}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="text-center p-8"
                  >
                    <div
                      className="w-40 h-40 mx-auto rounded-full flex items-center justify-center text-6xl font-display mb-6"
                      style={{
                        backgroundColor: `${character?.themeColor || '#E8754A'}20`,
                        color: character?.themeColor || '#E8754A',
                        animation: 'breathe 3s ease-in-out infinite'
                      }}
                    >
                      {character?.name[0] || 'L'}
                    </div>
                    <p className="text-text-muted/60 text-sm font-ui uppercase tracking-wider">
                      Live2D Preview
                    </p>
                    <p className="text-text-muted/40 text-xs mt-2">
                      {character?.name || 'Character'} - {activeAnimation?.name}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Animated breathing indicator */}
                <motion.div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2 text-text-muted/50 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-maxine-orange animate-pulse" />
                    Live Animation
                  </div>
                </motion.div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg-dark/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-maxine-orange/20 border-2 border-maxine-orange flex items-center justify-center">
                  <Icon name="play" size={32} className="text-maxine-orange ml-1" />
                </div>
              </div>
            </div>

            {/* Character name badge */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-bg-dark border rounded-full"
              style={{ borderColor: character?.themeColor || '#E8754A' }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span
                className="font-display tracking-wider"
                style={{ color: character?.themeColor || '#E8754A' }}
              >
                {character?.name || 'Liliana'}
              </span>
            </motion.div>
          </motion.div>

          {/* Animation Types */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-4">
              {ANIMATION_PREVIEWS.map((preview, index) => (
                <button
                  key={preview.id}
                  onClick={() => setActivePreview(index)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                    activePreview === index
                      ? 'bg-maxine-orange/10 border-maxine-orange'
                      : 'bg-bg-dark/50 border-border/50 hover:border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activePreview === index ? 'bg-maxine-orange/20' : 'bg-border/30'
                    }`}>
                      <Icon
                        name="animation"
                        size={20}
                        className={activePreview === index ? 'text-maxine-orange' : 'text-text-muted'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-display text-lg tracking-wide mb-1 ${
                        activePreview === index ? 'text-maxine-orange' : 'text-text-cream'
                      }`}>
                        {preview.name}
                      </h3>
                      <p className="text-text-muted/70 text-sm leading-relaxed">
                        {preview.description}
                      </p>
                    </div>
                    {activePreview === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-maxine-orange flex-shrink-0 mt-2"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: "4+", label: "Animated Characters" },
            { value: "20+", label: "Expressions Each" },
            { value: "60fps", label: "Smooth Animation" },
            { value: "100%", label: "Hand-Crafted" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-bg-dark/50 border border-border/30 rounded-xl"
            >
              <div className="font-display text-2xl md:text-3xl text-maxine-orange mb-1">
                {stat.value}
              </div>
              <div className="text-text-muted/60 text-xs font-ui uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-gradient-to-r from-maxine-orange/5 via-maxine-orange/10 to-maxine-orange/5 border border-maxine-orange/20 rounded-2xl">
            <div className="text-center sm:text-left">
              <p className="text-text-cream font-display text-lg tracking-wide mb-1">
                Experience the Animations Now
              </p>
              <p className="text-text-muted text-sm">
                Premium NSFW animations available on Itch.io
              </p>
            </div>
            <ButtonLink
              href={SOCIAL_LINKS.itchio.url}
              variant="cta"
              size="lg"
              glow
              icon={<Icon name="play" size={20} />}
              external
            >
              View Live2D Content
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Live2DShowcase;

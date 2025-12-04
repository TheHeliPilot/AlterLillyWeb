"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icons";
import { ENVIRONMENTS } from "@/lib/constants";

const STATS = [
  { icon: "paintbrush", label: "100% Hand-Painted", description: "Every pixel crafted with care" },
  { icon: "animation", label: "Fully Animated Live2D", description: "Characters that breathe and react" },
  { icon: "people", label: "Living Breathing World", description: "NPCs with daily routines" },
  { icon: "crossroads", label: "Actions Define Story", description: "No dialogue trees, only deeds" },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate gallery images
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ENVIRONMENTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-dark relative overflow-hidden"
      id="about"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--maxine-orange) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, var(--forest-green) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider mb-4">
            Enter the Village
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto" />
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Side - Rotating Gallery (60% on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
              {/* Image Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* [PLACEHOLDER: Environment Images - Replace with actual screenshots] */}
                  <div className="w-full h-full bg-gradient-to-br from-bg-mid to-bg-dark flex items-center justify-center">
                    <div className="text-center text-text-muted/50">
                      <Icon name="image" size={48} className="mx-auto mb-2" />
                      <p className="text-sm font-ui">
                        {ENVIRONMENTS[currentImageIndex].name}
                      </p>
                      <p className="text-xs mt-1 max-w-xs mx-auto px-4">
                        {ENVIRONMENTS[currentImageIndex].caption}
                      </p>
                    </div>
                  </div>
                  {/* Actual image would be:
                  <img
                    src={`/images/environments/${ENVIRONMENTS[currentImageIndex].id}.jpg`}
                    alt={ENVIRONMENTS[currentImageIndex].name}
                    className="w-full h-full object-cover"
                  />
                  */}
                </motion.div>
              </AnimatePresence>

              {/* Image Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-display text-text-cream">
                  {ENVIRONMENTS[currentImageIndex].name}
                </p>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {ENVIRONMENTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-maxine-orange w-6"
                        : "bg-text-muted/30 hover:bg-text-muted/50"
                    }`}
                    aria-label={`View ${ENVIRONMENTS[index].name}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -inset-2 border border-border/30 rounded-lg -z-10" />
            <div className="absolute -inset-4 border border-border/10 rounded-lg -z-10" />
          </motion.div>

          {/* Right Side - Text Content (40% on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h3 className="font-display text-2xl text-text-cream tracking-wide mb-6">
              A World of Consequence
            </h3>

            {/* [WRITER: 150-200 words covering game description] */}
            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                You are <span className="text-text-cream">Liliana</span>, a young woman
                whose world shatters when a mysterious plague descends upon her village.
                But this is no ordinary disease—its effects are strange, disturbing,
                and deeply intimate.
              </p>
              <p>
                In Alter Lily, there are no dialogue trees. No moral choices presented
                as buttons. Your character is defined by what you <em>do</em>, not what
                you say. Help the desperate, exploit the vulnerable, or simply survive—
                the village watches, remembers, and responds.
              </p>
              <p>
                Every NPC lives their own life, following routines that shift with time
                of day and circumstance. Every action ripples outward, creating stories
                unique to your playthrough. In a world this alive, even inaction is a choice.
              </p>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-maxine-orange hover:text-text-cream transition-colors font-ui group"
              >
                Discover what makes Alter Lily unique
                <Icon
                  name="chevronRight"
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.7 + index * 0.1,
                }}
                className="text-center p-6 bg-bg-mid/50 border border-border/50 rounded-lg hover:border-border transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-maxine-orange/10 flex items-center justify-center">
                  <Icon
                    name={stat.icon as keyof typeof import("@/components/ui/Icons").Icons}
                    size={24}
                    className="text-maxine-orange"
                  />
                </div>
                <h4 className="font-display text-text-cream text-sm tracking-wide mb-1">
                  {stat.label}
                </h4>
                <p className="text-text-muted/60 text-xs">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@/components/ui/Icons";
import { CHARACTERS } from "@/lib/constants";

export function Characters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-dark relative overflow-hidden"
      id="characters"
    >
      {/* Subtle background gradient based on character colors */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 10% 50%, ${CHARACTERS[0]?.themeColor}15 0%, transparent 40%),
              radial-gradient(ellipse at 35% 50%, ${CHARACTERS[1]?.themeColor}15 0%, transparent 40%),
              radial-gradient(ellipse at 65% 50%, ${CHARACTERS[2]?.themeColor}15 0%, transparent 40%),
              radial-gradient(ellipse at 90% 50%, ${CHARACTERS[3]?.themeColor}15 0%, transparent 40%)
            `,
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
            Meet the Cast
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Every character has depth, desires, and secrets. Click to discover their stories.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Characters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CHARACTERS.map((character, index) => {
            const isThighUp = character.imageType === "thigh-up";
            const isSilhouette = character.isSilhouette;

            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
              >
                <Link
                  href={`/characters/${character.id}`}
                  className="group block"
                >
                  <div
                    className="relative rounded-xl overflow-hidden border-2 transition-all duration-500"
                    style={{
                      borderColor: "var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = character.themeColor;
                      e.currentTarget.style.boxShadow = `0 0 40px ${character.themeColor}25, 0 20px 40px rgba(0,0,0,0.3)`;
                      e.currentTarget.style.transform = "translateY(-8px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Portrait Area - Different aspect ratios for thigh-up vs waist-up */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: isThighUp ? "3/4" : "3/3.5",
                      }}
                    >
                      {/* Background gradient using character palette */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg,
                            ${character.palette?.hair || character.accentColor}30 0%,
                            ${character.palette?.skin || character.themeColor}20 30%,
                            ${character.palette?.top || character.themeColor}30 60%,
                            ${character.palette?.bottom || character.accentColor}50 100%
                          )`,
                        }}
                      />

                      {/* Character Image */}
                      {character.image ? (
                        <div className={`absolute inset-0 ${isSilhouette ? 'opacity-50' : ''}`}>
                          <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className={`object-contain object-bottom transition-transform duration-500 group-hover:scale-105 ${
                              !isThighUp ? "scale-110 translate-y-[8%]" : ""
                            }`}
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-6xl font-display opacity-20"
                            style={{ color: character.themeColor }}
                          >
                            {character.name[0]}
                          </span>
                        </div>
                      )}

                      {/* Silhouette tint overlay */}
                      {isSilhouette && (
                        <div
                          className="absolute inset-0 mix-blend-color"
                          style={{
                            background: `linear-gradient(180deg, ${character.themeColor}60 0%, ${character.accentColor}80 100%)`,
                          }}
                        />
                      )}

                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(180deg, transparent 50%, ${character.themeColor}40 100%)`,
                        }}
                      />

                      {/* View profile indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-ui uppercase tracking-wider flex items-center gap-1.5"
                          style={{
                            backgroundColor: `${character.themeColor}90`,
                            color: '#0F0E0D',
                          }}
                        >
                          View Profile
                          <Icon name="chevronRight" size={12} />
                        </span>
                      </div>

                      {/* Bottom gradient fade */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1/3"
                        style={{
                          background: `linear-gradient(to top, ${character.palette?.bottom || '#0F0E0D'}, transparent)`,
                        }}
                      />
                    </div>

                    {/* Character Info */}
                    <div
                      className="p-4 md:p-5"
                      style={{
                        background: `linear-gradient(180deg, ${character.palette?.bottom || character.accentColor}40 0%, #0F0E0D 100%)`,
                      }}
                    >
                      {/* Name */}
                      <h3
                        className="font-display text-xl md:text-2xl tracking-wide mb-1 transition-colors duration-300"
                        style={{ color: character.themeColor }}
                      >
                        {character.name}
                      </h3>

                      {/* Role */}
                      <p className="text-text-muted text-sm mb-3">{character.role}</p>

                      {/* Teaser - truncated */}
                      <p className="text-text-muted/60 text-xs md:text-sm leading-relaxed line-clamp-2">
                        {character.teaser}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to explore all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted/60 text-sm">
            Click any character to explore their full story, personality, and role in the plague-stricken village.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Characters;

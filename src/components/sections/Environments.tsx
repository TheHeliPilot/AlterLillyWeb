"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui";
import { ENVIRONMENTS } from "@/lib/constants";

export function Environments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % ENVIRONMENTS.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + ENVIRONMENTS.length) % ENVIRONMENTS.length);
  };

  // Scroll handlers
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-dark relative overflow-hidden"
      id="environments"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider mb-4">
            Explore the World
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Every corner of Alter Lily has been hand-painted with meticulous attention to detail
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto mt-6" />
        </motion.div>
      </div>

      {/* Full-width Horizontal Scroll Gallery */}
      <div className="relative">
        {/* Scroll Buttons - Desktop */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-dark/80 border border-border rounded-full items-center justify-center text-text-muted hover:text-text-cream hover:border-maxine-orange transition-colors"
          aria-label="Scroll left"
        >
          <Icon name="chevronLeft" size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-dark/80 border border-border rounded-full items-center justify-center text-text-muted hover:text-text-cream hover:border-maxine-orange transition-colors"
          aria-label="Scroll right"
        >
          <Icon name="chevronRight" size={24} />
        </button>

        {/* Gallery Container */}
        <div
          ref={scrollRef}
          className="horizontal-scroll flex gap-6 px-4 md:px-8 pb-4"
        >
          {ENVIRONMENTS.map((env, index) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              className="flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[600px]"
            >
              <button
                onClick={() => openLightbox(index)}
                className="w-full group relative rounded-lg overflow-hidden border border-border hover:border-maxine-orange/50 transition-colors cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-video bg-bg-mid">
                  {env.image ? (
                    <Image
                      src={env.image}
                      alt={env.name}
                      fill
                      className="object-cover gallery-image transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, 600px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted/30 bg-gradient-to-br from-bg-mid to-bg-dark">
                      <Icon name="image" size={48} className="mb-2" />
                      <p className="font-display text-lg">{env.name}</p>
                    </div>
                  )}

                  {/* Expand Button */}
                  <div
                    className="absolute top-4 left-4 z-10 p-2 bg-bg-dark/80 border border-border rounded-lg text-text-muted group-hover:text-maxine-orange group-hover:border-maxine-orange transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="View fullscreen"
                  >
                    <Icon name="expand" size={20} />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-60" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-display text-xl text-text-cream tracking-wide mb-2">
                    {env.name}
                  </h3>
                  <p className="text-text-muted/80 text-sm leading-relaxed line-clamp-2">
                    {env.caption}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator - Mobile */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <span className="text-text-muted/50 text-xs font-ui">
            Swipe to explore
          </span>
          <Icon name="chevronRight" size={14} className="text-text-muted/50" />
        </div>
      </div>

      {/* Location Quick Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap justify-center gap-2">
          {ENVIRONMENTS.map((env, index) => (
            <button
              key={env.id}
              onClick={() => {
                const element = scrollRef.current?.children[index] as HTMLElement;
                element?.scrollIntoView({ behavior: "smooth", inline: "center" });
              }}
              className="px-4 py-2 bg-bg-mid/50 border border-border/50 rounded-full text-text-muted text-sm hover:border-maxine-orange hover:text-text-cream transition-colors"
            >
              {env.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={ENVIRONMENTS[currentIndex]?.image || ""}
        alt={ENVIRONMENTS[currentIndex]?.name || ""}
        caption={ENVIRONMENTS[currentIndex]?.caption}
        onPrev={prevImage}
        onNext={nextImage}
        showDownload={false}
      />
    </section>
  );
}

export default Environments;

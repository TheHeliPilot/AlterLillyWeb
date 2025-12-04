"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Modal } from "@/components/ui";
import { Icon, Icons } from "@/components/ui/Icons";
import { FEATURES } from "@/lib/constants";

interface Feature {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  expandedDescription: string;
}

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // Map feature icons to actual icon names
  const getIconName = (iconId: string): keyof typeof Icons => {
    const iconMap: Record<string, keyof typeof Icons> = {
      paintbrush: "paintbrush",
      people: "people",
      dagger: "dagger",
      animation: "animation",
      "sun-moon": "sunMoon",
      ecosystem: "ecosystem",
      crossroads: "crossroads",
      scroll: "scroll",
      map: "map",
    };
    return iconMap[iconId] || "star";
  };

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-mid relative overflow-hidden"
      id="features"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='%23E8DCC4' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "50px 50px",
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
            A Unique Experience
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover what sets Alter Lily apart from other games
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Features Grid - 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
            >
              <button
                onClick={() => setSelectedFeature(feature)}
                className="w-full text-left feature-card p-6 rounded-lg group h-full"
                aria-label={`Learn more about ${feature.title}`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-maxine-orange/10 flex items-center justify-center mb-4 group-hover:bg-maxine-orange/20 transition-colors">
                  <Icon
                    name={getIconName(feature.icon)}
                    size={28}
                    className="text-maxine-orange"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg text-text-cream tracking-wide mb-2 group-hover:text-maxine-orange transition-colors">
                  {feature.title}
                </h3>

                {/* Short Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {feature.shortDescription}
                </p>

                {/* Preview Media Placeholder */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-dark/50 mb-4">
                  {/* [PLACEHOLDER: Feature GIF/Video Preview] */}
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted/30">
                    <Icon name="play" size={32} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-maxine-orange/0 group-hover:bg-maxine-orange/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-text-cream text-sm font-ui">
                      Click to learn more
                    </span>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex items-center gap-2 text-text-muted/50 group-hover:text-maxine-orange transition-colors text-sm font-ui">
                  <span>Discover more</span>
                  <Icon
                    name="chevronRight"
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      <Modal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.title}
        size="lg"
      >
        {selectedFeature && (
          <div className="p-6">
            {/* Header with Icon */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-maxine-orange/10 flex items-center justify-center flex-shrink-0">
                <Icon
                  name={getIconName(selectedFeature.icon)}
                  size={32}
                  className="text-maxine-orange"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl text-text-cream tracking-wide">
                  {selectedFeature.title}
                </h3>
                <p className="text-text-muted mt-1">
                  {selectedFeature.shortDescription}
                </p>
              </div>
            </div>

            {/* Media Preview */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-bg-dark mb-6">
              {/* [PLACEHOLDER: Feature Media - Replace with actual GIF/video] */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted/50">
                <Icon name="image" size={48} className="mb-2" />
                <p className="text-sm font-ui">Feature Preview</p>
                <p className="text-xs mt-1">GIF or video showcasing {selectedFeature.title.toLowerCase()}</p>
              </div>
            </div>

            {/* Expanded Description */}
            {/* [WRITER: Each feature needs 150-200 word expanded description] */}
            <div className="prose prose-invert max-w-none">
              <p className="text-text-muted leading-relaxed whitespace-pre-line">
                {selectedFeature.expandedDescription}
              </p>
            </div>

            {/* Related Features */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-display text-sm text-text-muted/70 uppercase tracking-wider mb-4">
                Related Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {FEATURES.filter((f) => f.id !== selectedFeature.id)
                  .slice(0, 3)
                  .map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature)}
                      className="px-3 py-1.5 bg-bg-dark/50 border border-border rounded text-text-muted text-sm hover:border-maxine-orange hover:text-text-cream transition-colors"
                    >
                      {feature.title}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default Features;

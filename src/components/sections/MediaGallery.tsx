"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui";

type MediaType = "all" | "screenshots" | "gameplay" | "characters" | "environments" | "behind-scenes";

interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  thumbnail: string;
  alt: string;
  caption?: string;
  isVideo?: boolean;
  videoUrl?: string;
}

// Sample media items - replace with actual content
const MEDIA_ITEMS: MediaItem[] = [
  { id: "1", type: "screenshots", src: "/images/gallery/screenshot-1.jpg", thumbnail: "/images/gallery/screenshot-1-thumb.jpg", alt: "Village Square during day", caption: "The village square at dawn" },
  { id: "2", type: "screenshots", src: "/images/gallery/screenshot-2.jpg", thumbnail: "/images/gallery/screenshot-2-thumb.jpg", alt: "Dark Forest entrance", caption: "Entering the dark forest" },
  { id: "3", type: "gameplay", src: "/images/gallery/gameplay-1.gif", thumbnail: "/images/gallery/gameplay-1-thumb.jpg", alt: "Stealth gameplay", caption: "Stealth mechanics in action" },
  { id: "4", type: "gameplay", src: "/images/gallery/gameplay-2.gif", thumbnail: "/images/gallery/gameplay-2-thumb.jpg", alt: "Combat encounter", caption: "Combat requires strategy" },
  { id: "5", type: "characters", src: "/images/gallery/character-liliana.jpg", thumbnail: "/images/gallery/character-liliana-thumb.jpg", alt: "Liliana portrait", caption: "Liliana, our protagonist" },
  { id: "6", type: "characters", src: "/images/gallery/character-maxine.jpg", thumbnail: "/images/gallery/character-maxine-thumb.jpg", alt: "Maxine portrait", caption: "Maxine, childhood friend" },
  { id: "7", type: "environments", src: "/images/gallery/env-tavern.jpg", thumbnail: "/images/gallery/env-tavern-thumb.jpg", alt: "Tavern interior", caption: "The village tavern" },
  { id: "8", type: "environments", src: "/images/gallery/env-sophie.jpg", thumbnail: "/images/gallery/env-sophie-thumb.jpg", alt: "Sophie's home", caption: "Sophie's home interior" },
  { id: "9", type: "behind-scenes", src: "/images/gallery/bts-concept.jpg", thumbnail: "/images/gallery/bts-concept-thumb.jpg", alt: "Concept art", caption: "Early concept sketches" },
  { id: "trailer", type: "all", src: "", thumbnail: "/images/gallery/trailer-thumb.jpg", alt: "Game trailer", caption: "Watch the trailer", isVideo: true, videoUrl: "https://youtube.com/watch?v=placeholder" },
];

const FILTER_OPTIONS: { value: MediaType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "screenshots", label: "Screenshots" },
  { value: "gameplay", label: "Gameplay" },
  { value: "characters", label: "Characters" },
  { value: "environments", label: "Environments" },
  { value: "behind-scenes", label: "Behind the Scenes" },
];

export function MediaGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [filter, setFilter] = useState<MediaType>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  // Filter media items
  const filteredItems = filter === "all"
    ? MEDIA_ITEMS
    : MEDIA_ITEMS.filter((item) => item.type === filter || item.type === "all");

  // Lightbox navigation
  const openLightbox = (index: number) => {
    const item = filteredItems[index];
    if (item?.isVideo) {
      setTrailerOpen(true);
    } else {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  const nextImage = () => {
    let next = currentIndex + 1;
    while (next < filteredItems.length && filteredItems[next]?.isVideo) {
      next++;
    }
    if (next < filteredItems.length) setCurrentIndex(next);
  };

  const prevImage = () => {
    let prev = currentIndex - 1;
    while (prev >= 0 && filteredItems[prev]?.isVideo) {
      prev--;
    }
    if (prev >= 0) setCurrentIndex(prev);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-dark relative overflow-hidden"
      id="media"
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
            Media Gallery
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Explore screenshots, gameplay footage, and behind-the-scenes content
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Trailer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-border group">
            {/* [PLACEHOLDER: Trailer Video or Coming Soon] */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-mid to-bg-dark flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-maxine-orange/20 flex items-center justify-center mb-4 group-hover:bg-maxine-orange/30 transition-colors">
                <Icon name="play" size={40} className="text-maxine-orange" />
              </div>
              <h3 className="font-display text-2xl text-text-cream mb-2">
                Trailer Coming Soon
              </h3>
              <p className="text-text-muted text-sm">
                Stay tuned for the official gameplay trailer
              </p>
            </div>
            <button
              onClick={() => setTrailerOpen(true)}
              className="absolute inset-0 z-10"
              aria-label="Play trailer"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-full font-ui text-sm transition-all ${
                filter === option.value
                  ? "bg-maxine-orange text-bg-dark"
                  : "bg-bg-mid/50 text-text-muted hover:text-text-cream border border-border/50 hover:border-border"
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid - Masonry-like */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : index * 0.05,
              }}
              className={`relative group ${
                // Make some items span 2 columns for masonry effect
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <button
                onClick={() => openLightbox(index)}
                className="w-full aspect-video md:aspect-square relative rounded-lg overflow-hidden border border-border hover:border-maxine-orange/50 transition-colors"
              >
                {/* [PLACEHOLDER: Gallery Images - Replace with actual images] */}
                <div className="absolute inset-0 bg-gradient-to-br from-bg-mid to-bg-dark flex flex-col items-center justify-center">
                  <Icon
                    name={item.isVideo ? "play" : "image"}
                    size={24}
                    className="text-text-muted/30 mb-2"
                  />
                  <span className="text-text-muted/50 text-xs font-ui">{item.alt}</span>
                </div>
                {/* Actual image would be:
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                */}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <Icon
                      name={item.isVideo ? "play" : "expand"}
                      size={24}
                      className="text-maxine-orange mx-auto mb-2"
                    />
                    {item.caption && (
                      <p className="text-text-cream text-sm px-4">{item.caption}</p>
                    )}
                  </div>
                </div>

                {/* Video Badge */}
                {item.isVideo && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-blood-red/80 rounded text-snow-white text-xs font-ui">
                    Video
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More - Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8"
        >
          <button
            className="px-6 py-3 bg-bg-mid/50 border border-border rounded-lg text-text-muted hover:text-text-cream hover:border-maxine-orange transition-colors font-ui"
            disabled
          >
            More Coming Soon
          </button>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={filteredItems[currentIndex]?.src || ""}
        alt={filteredItems[currentIndex]?.alt || ""}
        caption={filteredItems[currentIndex]?.caption}
        onPrev={prevImage}
        onNext={nextImage}
        showDownload={true}
      />

      {/* Trailer Modal */}
      {trailerOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTrailerOpen(false)}
        >
          <button
            onClick={() => setTrailerOpen(false)}
            className="absolute top-4 right-4 p-3 text-text-muted hover:text-text-cream hover:bg-white/10 rounded-full transition-colors z-10"
            aria-label="Close trailer"
          >
            <Icon name="close" size={24} />
          </button>

          <div className="w-full max-w-5xl aspect-video mx-4 rounded-lg overflow-hidden bg-bg-dark flex items-center justify-center">
            {/* [PLACEHOLDER: YouTube Embed or Coming Soon] */}
            <div className="text-center">
              <Icon name="play" size={64} className="text-text-muted/30 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-text-cream mb-2">
                Trailer Coming Soon
              </h3>
              <p className="text-text-muted">
                Subscribe to be notified when the trailer drops
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default MediaGallery;

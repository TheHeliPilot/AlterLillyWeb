"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Icon, Icons } from "@/components/ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";

const platformIcons: Record<string, keyof typeof Icons> = {
  discord: "discord",
  patreon: "patreon",
  itchio: "itchio",
  steam: "steam",
  twitter: "twitter",
  youtube: "youtube",
};

interface Platform {
  key: string;
  name: string;
  url: string;
  description: string;
  color: string;
  gradient: string;
  available: boolean;
  highlight?: boolean;
  memberCount?: string;
  viewCount?: string;
}

const platforms: Platform[] = [
  {
    key: "patreon",
    ...SOCIAL_LINKS.patreon,
    description: "Support Development - Get Exclusive Content",
    gradient: "from-[#FF424D] to-[#E8303B]",
    available: true,
    highlight: true, // Main support option until Steam
  },
  {
    key: "itchio",
    ...SOCIAL_LINKS.itchio,
    gradient: "from-[#FA5C5C] to-[#E84545]",
    available: true,
  },
  {
    key: "discord",
    ...SOCIAL_LINKS.discord,
    gradient: "from-[#5865F2] to-[#4752C4]",
    available: true,
  },
  {
    key: "steam",
    ...SOCIAL_LINKS.steam,
    gradient: "from-[#1B2838] to-[#0D1318]",
    available: false,
  },
  {
    key: "twitter",
    ...SOCIAL_LINKS.twitter,
    gradient: "from-[#000000] to-[#14171A]",
    available: true,
  },
  {
    key: "youtube",
    ...SOCIAL_LINKS.youtube,
    gradient: "from-[#FF0000] to-[#CC0000]",
    available: true,
  },
];

export function Community() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-mid relative overflow-hidden"
      id="community"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--maxine-orange) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
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
            Join the Community
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Connect with fellow adventurers, get the latest updates, and support the development
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-maxine-orange to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
            >
              <a
                href={platform.available ? platform.url : undefined}
                target={platform.available ? "_blank" : undefined}
                rel={platform.available ? "noopener noreferrer" : undefined}
                className={`block group relative rounded-lg overflow-hidden border transition-all duration-300 ${
                  platform.available
                    ? "border-border hover:border-transparent cursor-pointer"
                    : "border-border/50 cursor-not-allowed opacity-60"
                } ${platform.highlight ? "ring-2 ring-maxine-orange/50" : ""}`}
              >
                {/* Gradient Background (shows on hover) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Default Background */}
                <div className="absolute inset-0 bg-bg-dark group-hover:opacity-0 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Platform Icon */}
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <Icon
                        name={platformIcons[platform.key]}
                        size={28}
                        className="transition-colors duration-300"
                        style={{ color: platform.color }}
                      />
                    </div>

                    {/* Available Badge */}
                    {platform.available && platform.highlight && (
                      <span className="px-2 py-1 bg-maxine-orange text-bg-dark text-xs font-ui font-semibold rounded">
                        Available Now
                      </span>
                    )}
                    {!platform.available && (
                      <span className="px-2 py-1 bg-border text-text-muted text-xs font-ui rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {/* Platform Name */}
                  <h3 className="font-display text-xl text-text-cream group-hover:text-white transition-colors mb-2">
                    {platform.name}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted group-hover:text-white/80 transition-colors mb-4">
                    {platform.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    {"memberCount" in platform && platform.memberCount && (
                      <span className="text-text-muted/60 group-hover:text-white/60 text-sm flex items-center gap-1">
                        <Icon name="users" size={14} />
                        {platform.memberCount} members
                      </span>
                    )}
                    {"viewCount" in platform && platform.viewCount && (
                      <span className="text-text-muted/60 group-hover:text-white/60 text-sm flex items-center gap-1">
                        <Icon name="user" size={14} />
                        {platform.viewCount} views
                      </span>
                    )}

                    {/* Arrow */}
                    {platform.available && (
                      <Icon
                        name="externalLink"
                        size={16}
                        className="text-text-muted group-hover:text-white transition-colors"
                      />
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 60px ${platform.color}`,
                  }}
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted/60 text-sm mb-4">
            Want to support development directly?
          </p>
          <a
            href={SOCIAL_LINKS.patreon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF424D] text-white rounded-lg font-ui font-medium hover:bg-[#E8303B] transition-colors"
          >
            <Icon name="patreon" size={20} />
            Become a Patron
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Community;

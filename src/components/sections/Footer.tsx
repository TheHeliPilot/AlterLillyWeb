"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  // Fetch visitor count
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const res = await fetch("/api/analytics/visitors");
        const data = await res.json();
        setVisitorCount(data.totalVisitors || 0);
      } catch {
        // Silently fail - visitor count is non-critical
        setVisitorCount(null);
      }
    };
    fetchVisitorCount();
  }, []);

  return (
    <footer className="bg-bg-dark border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Column */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl text-text-cream tracking-widest"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 text-text-muted leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            <p className="mt-4 text-text-muted/60 text-sm">
              A hand-painted 2D medieval RPG where your actions shape destiny.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.discord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-[#5865F2] hover:bg-border/50 transition-colors"
                aria-label="Discord"
              >
                <Icon name="discord" size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.patreon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-[#FF424D] hover:bg-border/50 transition-colors"
                aria-label="Patreon"
              >
                <Icon name="patreon" size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.itchio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-[#FA5C5C] hover:bg-border/50 transition-colors"
                aria-label="Itch.io"
              >
                <Icon name="itchio" size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
                aria-label="Twitter/X"
              >
                <Icon name="twitter" size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-border/30 rounded-lg text-text-muted hover:text-[#FF0000] hover:bg-border/50 transition-colors"
                aria-label="YouTube"
              >
                <Icon name="youtube" size={20} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-display text-lg text-text-cream tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.main.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-maxine-orange transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-display text-lg text-text-cream tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Age Notice */}
            <div className="mt-6 p-4 bg-blood-red/10 border border-blood-red/30 rounded-lg">
              <div className="flex items-center gap-2 text-blood-red mb-2">
                <Icon name="shield" size={16} />
                <span className="font-ui text-sm font-semibold">18+ Only</span>
              </div>
              <p className="text-text-muted/70 text-xs leading-relaxed">
                This website and game contain mature content including nudity
                and sexual themes. All characters are fictional and over 18.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-text-muted/50 text-sm text-center md:text-left">
              &copy; {currentYear} {SITE_CONFIG.author}. All rights reserved.
              {SITE_CONFIG.name} is a work of fiction.
            </p>

            {/* Visitor Counter */}
            {visitorCount !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-text-muted/50 text-sm"
              >
                <Icon name="user" size={14} />
                <span>Adventurer #{visitorCount.toLocaleString()}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

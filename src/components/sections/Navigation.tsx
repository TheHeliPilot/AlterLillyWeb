"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  // Track scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-bg-dark/95 backdrop-blur-md border-b border-border/50" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl md:text-2xl text-text-cream tracking-widest hover:text-maxine-orange transition-colors"
            >
              {SITE_CONFIG.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-ui text-sm uppercase tracking-wider transition-colors link-underline ${
                    activeSection === link.href.replace("#", "")
                      ? "text-maxine-orange"
                      : "text-text-muted hover:text-text-cream"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href={SOCIAL_LINKS.discord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-cream transition-colors"
                aria-label="Join Discord"
              >
                <Icon name="discord" size={20} />
              </Link>
              <Button
                variant="cta"
                size="sm"
                onClick={() => window.open(SOCIAL_LINKS.itchio.url, "_blank")}
              >
                Play Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-cream"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? "close" : "menu"} size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-bg-mid border-l border-border"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-muted hover:text-text-cream"
                  aria-label="Close menu"
                >
                  <Icon name="close" size={24} />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="px-6 py-4">
                <ul className="space-y-4">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-2 font-display text-2xl tracking-wider ${
                          activeSection === link.href.replace("#", "")
                            ? "text-maxine-orange"
                            : "text-text-cream"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-text-muted text-sm mb-4 font-ui uppercase tracking-wider">
                    Connect
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href={SOCIAL_LINKS.discord.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
                    >
                      <Icon name="discord" size={24} />
                    </Link>
                    <Link
                      href={SOCIAL_LINKS.twitter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
                    >
                      <Icon name="twitter" size={24} />
                    </Link>
                    <Link
                      href={SOCIAL_LINKS.youtube.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-border/30 rounded-lg text-text-muted hover:text-text-cream hover:bg-border/50 transition-colors"
                    >
                      <Icon name="youtube" size={24} />
                    </Link>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    variant="cta"
                    size="lg"
                    fullWidth
                    glow
                    onClick={() => {
                      window.open(SOCIAL_LINKS.itchio.url, "_blank");
                      setIsOpen(false);
                    }}
                  >
                    Play NSFW Animations
                  </Button>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;

"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Icon, Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui";
import { NEWSLETTER_BENEFITS } from "@/lib/constants";

const benefitIcons: Record<string, keyof typeof Icons> = {
  bell: "bell",
  steam: "steam",
  mail: "mail",
  image: "image",
  star: "star",
};

export function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      id="newsletter"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-mid to-bg-dark" />

      {/* Fog/Village Background Effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/environments/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider mb-4">
            Stay Connected to the Village
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Be the first to know when the demo releases, get exclusive updates,
            and join our journey through Alter Lily's development
          </p>
        </motion.div>

        {/* Newsletter Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 px-8 parchment rounded-lg"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest-green/20 flex items-center justify-center">
                  <Icon name="check" size={32} className="text-forest-green" />
                </div>
                <h3 className="font-display text-2xl text-text-cream mb-2">
                  Welcome, Adventurer
                </h3>
                <p className="text-text-muted">
                  You've joined the journey. Check your inbox for a confirmation.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-maxine-orange hover:underline text-sm"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="parchment rounded-lg p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input styled as parchment scroll */}
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 bg-bg-dark/50 border-2 border-border rounded-lg text-text-cream placeholder:text-text-muted/50 focus:border-maxine-orange focus:outline-none transition-colors font-body text-lg"
                      disabled={status === "loading"}
                    />
                    {/* Decorative scroll ends */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-8 bg-earth-brown/20 rounded-full hidden md:block" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-4 h-8 bg-earth-brown/20 rounded-full hidden md:block" />
                  </div>

                  {/* Error Message */}
                  {status === "error" && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-blood-red text-sm flex items-center gap-2"
                    >
                      <Icon name="warning" size={16} />
                      {errorMessage}
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    fullWidth
                    glow
                    loading={status === "loading"}
                  >
                    Join the Journey
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-border/30">
                  <p className="text-text-muted/60 text-sm mb-4 text-center">
                    What you'll receive:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {NEWSLETTER_BENEFITS.map((benefit, index) => (
                      <motion.div
                        key={benefit.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.3,
                          delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                        }}
                        className="flex items-center gap-3 text-text-muted text-sm"
                      >
                        <Icon
                          name={benefitIcons[benefit.icon] || "check"}
                          size={16}
                          className="text-maxine-orange flex-shrink-0"
                        />
                        <span>{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Privacy Note */}
                <p className="mt-6 text-text-muted/40 text-xs text-center">
                  We respect your privacy. Unsubscribe at any time.
                  No spam, only meaningful updates.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// Floating Newsletter CTA (minimized version for sticky corner)
export function FloatingNewsletter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Check if already subscribed or dismissed
  useState(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("newsletter-dismissed");
      if (dismissed) setIsDismissed(true);
    }
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("newsletter-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setTimeout(() => setIsDismissed(true), 3000);
    } catch {
      setStatus("idle");
    }
  };

  if (isDismissed) return null;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-bg-mid border border-border rounded-lg p-4 shadow-xl w-80"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 p-1 text-text-muted hover:text-text-cream"
              aria-label="Minimize"
            >
              <Icon name="close" size={16} />
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <Icon name="check" size={24} className="text-forest-green mx-auto mb-2" />
                <p className="text-text-cream text-sm">Thanks for subscribing!</p>
              </div>
            ) : (
              <>
                <h4 className="font-display text-text-cream text-sm mb-2">
                  Get Demo Updates
                </h4>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-bg-dark border border-border rounded text-text-cream text-sm placeholder:text-text-muted/50 focus:border-maxine-orange focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-3 py-2 bg-maxine-orange text-bg-dark rounded text-sm font-ui hover:bg-maxine-orange/80 transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "..." : "Join"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleDismiss();
            }}
            className="bg-maxine-orange text-bg-dark p-3 rounded-full shadow-lg hover:bg-maxine-orange/80 transition-colors group"
            aria-label="Subscribe to newsletter"
            title="Right-click to dismiss"
          >
            <Icon name="mail" size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blood-red rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Newsletter;

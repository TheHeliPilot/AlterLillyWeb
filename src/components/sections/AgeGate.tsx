"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icons";
import { SITE_CONFIG } from "@/lib/constants";

const AGE_GATE_KEY = "alter-lily-age-verified";
const AGE_GATE_EXPIRY_DAYS = 30;

interface AgeGateProps {
  onVerified?: () => void;
}

export function AgeGate({ onVerified }: AgeGateProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [rememberChoice, setRememberChoice] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AGE_GATE_KEY);
    if (stored) {
      const { verified, expiry } = JSON.parse(stored);
      if (verified && new Date(expiry) > new Date()) {
        setIsVerified(true);
        onVerified?.();
        return;
      }
    }
    setIsVerified(false);
  }, [onVerified]);

  const handleEnter = () => {
    if (rememberChoice) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + AGE_GATE_EXPIRY_DAYS);
      localStorage.setItem(
        AGE_GATE_KEY,
        JSON.stringify({ verified: true, expiry: expiry.toISOString() })
      );
    }
    setIsVerified(true);
    onVerified?.();
  };

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.href = "https://google.com";
    }, 500);
  };

  // Still loading
  if (isVerified === null) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  // Verified, don't show gate
  if (isVerified) return null;

  return (
    <AnimatePresence>
      {!isVerified && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg-dark flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8DCC4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <motion.div
            className="relative max-w-lg w-full bg-bg-mid border border-border rounded-lg p-8 text-center"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Logo placeholder */}
            <div className="mb-6">
              <h1 className="font-display text-4xl text-text-cream tracking-widest">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-text-muted mt-2 font-body text-lg">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blood-red/20 flex items-center justify-center">
                <Icon name="shield" size={40} className="text-blood-red" />
              </div>
            </div>

            {/* Warning Content */}
            <div className="mb-8">
              <h2 className="font-display text-2xl text-text-cream mb-4">
                Age Verification Required
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                This website contains mature content including nudity and sexual
                themes. By entering, you confirm that you are at least{" "}
                <span className="text-maxine-orange font-semibold">18 years of age</span>{" "}
                and are legally permitted to view such content in your jurisdiction.
              </p>
              <p className="text-text-muted/70 text-sm">
                All characters depicted are fictional and over 18 years of age.
              </p>
            </div>

            {/* Remember Choice */}
            <label className="flex items-center justify-center gap-3 mb-8 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberChoice}
                  onChange={(e) => setRememberChoice(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-border rounded peer-checked:bg-maxine-orange peer-checked:border-maxine-orange transition-all group-hover:border-text-muted">
                  {rememberChoice && (
                    <Icon
                      name="check"
                      size={16}
                      className="text-bg-dark absolute top-0.5 left-0.5"
                    />
                  )}
                </div>
              </div>
              <span className="text-text-muted text-sm group-hover:text-text-cream transition-colors">
                Remember my choice for 30 days
              </span>
            </label>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleExit}
                className="min-w-[140px]"
              >
                Exit
              </Button>
              <Button
                variant="cta"
                size="lg"
                onClick={handleEnter}
                className="min-w-[140px]"
              >
                I am 18+ Enter
              </Button>
            </div>

            {/* Legal Note */}
            <p className="mt-6 text-text-muted/50 text-xs">
              By clicking "Enter", you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AgeGate;

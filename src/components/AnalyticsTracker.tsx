"use client";

import { useEffect, useRef, useCallback } from "react";

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("analytics-session");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("analytics-session", sessionId);
  }
  return sessionId;
}

// Track an analytics event
async function trackEvent(
  type: "pageview" | "section" | "click",
  data: Record<string, unknown>
) {
  try {
    const sessionId = getSessionId();
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data, sessionId }),
    });
  } catch {
    // Silently fail - analytics shouldn't break the site
  }
}

export function AnalyticsTracker() {
  const hasTrackedPageview = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const trackedSections = useRef<Set<string>>(new Set());

  // Track page view on mount
  useEffect(() => {
    if (hasTrackedPageview.current) return;
    hasTrackedPageview.current = true;

    trackEvent("pageview", {
      path: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
  }, []);

  // Track section views with intersection observer
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (!trackedSections.current.has(sectionId)) {
              trackedSections.current.add(sectionId);
              trackEvent("section", { section: sectionId });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Track click events on interactive elements
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Track button clicks
      const button = target.closest("button, a[href]");
      if (button) {
        const identifier =
          button.getAttribute("aria-label") ||
          button.getAttribute("data-track") ||
          button.textContent?.trim().slice(0, 50) ||
          "unknown-button";

        trackEvent("click", { element: identifier });
      }

      // Track character card clicks
      const characterCard = target.closest("[data-character]");
      if (characterCard) {
        const character = characterCard.getAttribute("data-character");
        trackEvent("click", { element: `character-${character}` });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // This component doesn't render anything
}

// Hook for manual tracking
export function useAnalytics() {
  const trackClick = useCallback((element: string) => {
    trackEvent("click", { element });
  }, []);

  const trackSection = useCallback((section: string) => {
    trackEvent("section", { section });
  }, []);

  const trackPageview = useCallback((path: string) => {
    trackEvent("pageview", { path });
  }, []);

  return { trackClick, trackSection, trackPageview };
}

export default AnalyticsTracker;

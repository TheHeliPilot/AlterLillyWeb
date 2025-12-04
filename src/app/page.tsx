"use client";

import { useState, useEffect } from "react";
import {
  AgeGate,
  Hero,
  Navigation,
  Footer,
  Timeline,
  About,
  Features,
  Environments,
  Characters,
  Live2DShowcase,
  MediaGallery,
  Community,
  Newsletter,
  FloatingNewsletter,
} from "@/components/sections";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client before rendering age-gated content
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // SSR placeholder
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      {/* Age Gate */}
      <AgeGate onVerified={() => setIsAgeVerified(true)} />

      {/* Main Content - Only render after age verification */}
      <div className={!isAgeVerified ? "age-gate-blur" : ""}>
        {/* Analytics Tracker */}
        <AnalyticsTracker />

        {/* Navigation */}
        <Navigation />

        {/* Main Sections */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* MAIN ATTRACTIONS - Live2D & Characters First */}
          {/* Live2D Animation Showcase - The star of the show */}
          <Live2DShowcase />

          {/* Characters - Meet the cast */}
          <Characters />

          {/* Timeline / Roadmap - Development progress */}
          <Timeline />

          {/* About Section */}
          <About />

          {/* Features Grid */}
          <Features />

          {/* Environment Showcase */}
          <Environments />

          {/* Media Gallery */}
          <MediaGallery />

          {/* Community Links */}
          <Community />

          {/* Newsletter Signup */}
          <Newsletter />

          {/* Wiki Coming Soon Placeholder */}
          <WikiPlaceholder />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Newsletter CTA */}
        <FloatingNewsletter />
      </div>
    </>
  );
}

// Wiki Coming Soon Section
function WikiPlaceholder() {
  return (
    <section className="py-24 bg-bg-dark border-t border-border" id="wiki">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-earth-brown/10 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-10 h-10 text-earth-brown"
          >
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl text-text-cream tracking-wider mb-4">
          Wiki Coming Soon
        </h2>

        {/* Description */}
        {/* [WRITER: 2-3 sentences about planned wiki] */}
        <p className="text-text-muted max-w-xl mx-auto mb-8">
          A comprehensive guide to the world of Alter Lily is in development.
          Explore lore, character backgrounds, gameplay mechanics, and hidden secrets
          once the wiki launches.
        </p>

        {/* Planned Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          {[
            { name: "Lore", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
            { name: "Characters", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
            { name: "Locations", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
            { name: "Combat Guide", icon: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" },
            { name: "Items", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
            { name: "Secrets", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
          ].map((section) => (
            <div
              key={section.name}
              className="p-4 bg-bg-mid/50 border border-border/50 rounded-lg opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-6 h-6 mx-auto mb-2 text-text-muted"
              >
                <path d={section.icon} />
              </svg>
              <span className="text-text-muted text-sm">{section.name}</span>
            </div>
          ))}
        </div>

        {/* Notify Button (Disabled) */}
        <button
          disabled
          className="px-6 py-3 bg-border/50 text-text-muted rounded-lg font-ui cursor-not-allowed"
        >
          Get Notified When Available
        </button>
      </div>
    </section>
  );
}

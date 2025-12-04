"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Modal } from "@/components/ui";
import { Icon } from "@/components/ui/Icons";
import { TIMELINE_EVENTS, DEMO_RELEASE_DATE, TimelineEvent, TimelineStatus } from "@/lib/constants";
import { useCountdown } from "@/lib/hooks";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Countdown for demo release
  const countdown = useCountdown(DEMO_RELEASE_DATE);

  const getStatusStyles = (status: TimelineStatus) => {
    switch (status) {
      case "completed":
        return {
          node: "bg-forest-green border-forest-green",
          line: "bg-forest-green",
          text: "text-forest-green",
        };
      case "current":
        return {
          node: "bg-maxine-orange border-maxine-orange animate-pulse",
          line: "bg-gradient-to-r from-forest-green to-maxine-orange",
          text: "text-maxine-orange",
        };
      case "upcoming":
        return {
          node: "bg-earth-brown border-earth-brown",
          line: "bg-gradient-to-r from-maxine-orange to-border",
          text: "text-earth-brown",
        };
      case "future":
        return {
          node: "bg-transparent border-border",
          line: "bg-border",
          text: "text-text-muted",
        };
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-24 bg-bg-mid overflow-hidden"
      id="timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-text-cream tracking-wider mb-4">
            Development Journey
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Follow the creation of Alter Lily from concept to completion
          </p>
        </motion.div>

        {/* Countdown to Demo */}
        {countdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="max-w-md mx-auto bg-bg-dark border border-maxine-orange/30 rounded-lg p-6 text-center">
              <p className="text-text-muted text-sm mb-3 font-ui uppercase tracking-wider">
                Demo Release Countdown
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-display text-maxine-orange">
                    {countdown.days}
                  </span>
                  <span className="text-xs text-text-muted/60 uppercase">Days</span>
                </div>
                <span className="text-2xl text-text-muted/30">:</span>
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-display text-maxine-orange">
                    {countdown.hours}
                  </span>
                  <span className="text-xs text-text-muted/60 uppercase">Hours</span>
                </div>
                <span className="text-2xl text-text-muted/30">:</span>
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-display text-maxine-orange">
                    {countdown.minutes}
                  </span>
                  <span className="text-xs text-text-muted/60 uppercase">Mins</span>
                </div>
                <span className="text-2xl text-text-muted/30">:</span>
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-display text-maxine-orange">
                    {countdown.seconds}
                  </span>
                  <span className="text-xs text-text-muted/60 uppercase">Secs</span>
                </div>
              </div>
              <p className="text-text-muted/50 text-xs mt-4">Q1 2026 Target</p>
            </div>
          </motion.div>
        )}

        {/* Timeline - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative flex justify-between items-start">
              {/* Connection Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />

              {TIMELINE_EVENTS.map((event, index) => {
                const styles = getStatusStyles(event.status);
                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.6,
                      delay: prefersReducedMotion ? 0 : index * 0.1,
                    }}
                    className="relative flex flex-col items-center flex-1"
                  >
                    {/* Node */}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className={`
                        relative z-10 w-12 h-12 rounded-full border-4
                        ${styles.node}
                        flex items-center justify-center
                        transition-transform hover:scale-110
                        focus-visible:ring-2 focus-visible:ring-maxine-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-mid
                      `}
                      aria-label={`View details for ${event.title}`}
                    >
                      {event.status === "completed" && (
                        <Icon name="check" size={20} className="text-snow-white" />
                      )}
                      {event.milestone && event.status !== "completed" && (
                        <Icon name="star" size={20} className="text-snow-white" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="mt-4 text-center max-w-[150px]">
                      <span className={`font-display text-lg ${styles.text}`}>
                        {event.year}
                      </span>
                      <h3 className="font-display text-text-cream text-sm mt-1 tracking-wide">
                        {event.title}
                      </h3>
                      {event.status === "current" && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-maxine-orange/20 text-maxine-orange text-xs rounded font-ui">
                          Current Phase
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Vertical Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

              {TIMELINE_EVENTS.map((event, index) => {
                const styles = getStatusStyles(event.status);
                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.6,
                      delay: prefersReducedMotion ? 0 : index * 0.1,
                    }}
                    className="relative pb-8 last:pb-0"
                  >
                    {/* Node */}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className={`
                        absolute left-0 w-6 h-6 rounded-full border-2
                        ${styles.node}
                        flex items-center justify-center
                        -translate-x-1/2
                      `}
                      aria-label={`View details for ${event.title}`}
                    >
                      {event.status === "completed" && (
                        <Icon name="check" size={12} className="text-snow-white" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="ml-8">
                      <span className={`font-display text-sm ${styles.text}`}>
                        {event.year}
                      </span>
                      <h3 className="font-display text-text-cream mt-1">
                        {event.title}
                      </h3>
                      <p className="text-text-muted/70 text-sm mt-1">
                        {event.description}
                      </p>
                      {event.status === "current" && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-maxine-orange/20 text-maxine-orange text-xs rounded font-ui">
                          Current Phase
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        size="md"
      >
        {selectedEvent && (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-display text-2xl ${getStatusStyles(selectedEvent.status).text}`}
              >
                {selectedEvent.year}
              </span>
              {selectedEvent.status === "current" && (
                <span className="px-2 py-0.5 bg-maxine-orange/20 text-maxine-orange text-xs rounded font-ui">
                  Current
                </span>
              )}
              {selectedEvent.milestone && (
                <span className="px-2 py-0.5 bg-earth-brown/20 text-earth-brown text-xs rounded font-ui flex items-center gap-1">
                  <Icon name="star" size={12} />
                  Milestone
                </span>
              )}
            </div>
            <p className="text-text-muted leading-relaxed">
              {selectedEvent.description}
            </p>

            {/* Additional details could be added here */}
            {selectedEvent.milestone && selectedEvent.status === "upcoming" && (
              <div className="mt-6 p-4 bg-bg-dark border border-border rounded-lg">
                <p className="text-text-cream text-sm font-ui">
                  This is a major milestone in Alter Lily's development.
                  Join our newsletter to be notified the moment it launches!
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

export default Timeline;

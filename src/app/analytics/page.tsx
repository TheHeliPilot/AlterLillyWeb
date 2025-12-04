"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icons";
import Link from "next/link";

interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitorsCount: number;
  pageViews: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  sectionEngagement: Record<string, number>;
  clickRates: Record<string, number>;
  characterPopularity: Record<string, number>;
  funStats: {
    mostPopularCharacter: { name: string; clicks: number } | null;
    peakHour: { hour: number; views: number } | null;
  };
}

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/analytics", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid password");
      }

      const analyticsData = await response.json();
      setData(analyticsData);
      setIsAuthenticated(true);
      sessionStorage.setItem("analytics-password", password);
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check for stored session
  useEffect(() => {
    const storedPassword = sessionStorage.getItem("analytics-password");
    if (storedPassword) {
      setPassword(storedPassword);
      fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${storedPassword}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          sessionStorage.removeItem("analytics-password");
        });
    }
  }, []);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-maxine-orange transition-colors mb-8"
          >
            <Icon name="chevronLeft" size={16} />
            Back to Home
          </Link>

          <div className="bg-bg-mid border border-border rounded-lg p-8">
            <div className="text-center mb-6">
              <Icon name="shield" size={48} className="text-maxine-orange mx-auto mb-4" />
              <h1 className="font-display text-2xl text-text-cream">Analytics Dashboard</h1>
              <p className="text-text-muted text-sm mt-2">
                Enter your admin password to access analytics
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin Password"
                  className="w-full px-4 py-3 bg-bg-dark border border-border rounded-lg text-text-cream placeholder:text-text-muted/50 focus:border-maxine-orange focus:outline-none"
                  required
                />
              </div>

              {error && (
                <p className="text-blood-red text-sm flex items-center gap-2">
                  <Icon name="warning" size={16} />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-maxine-orange text-bg-dark rounded-lg font-ui font-medium hover:bg-maxine-orange/80 transition-colors disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Access Dashboard"}
              </button>
            </form>

            <p className="text-text-muted/50 text-xs text-center mt-4">
              Default password: alter-lily-admin
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Dashboard
  return (
    <main className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="bg-bg-mid border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-text-muted hover:text-maxine-orange transition-colors mb-2"
              >
                <Icon name="chevronLeft" size={16} />
                Back to Home
              </Link>
              <h1 className="font-display text-3xl text-text-cream">Analytics Dashboard</h1>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setData(null);
                sessionStorage.removeItem("analytics-password");
              }}
              className="text-text-muted hover:text-blood-red transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data ? (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Visitors"
                value={data.totalVisitors}
                icon="users"
                color="maxine-orange"
              />
              <StatCard
                title="Page Views (24h)"
                value={data.pageViews.last24h}
                icon="user"
                color="forest-green"
              />
              <StatCard
                title="Page Views (7d)"
                value={data.pageViews.last7d}
                icon="calendar"
                color="earth-brown"
              />
              <StatCard
                title="Page Views (30d)"
                value={data.pageViews.last30d}
                icon="clock"
                color="liliana-brown"
              />
            </div>

            {/* Fun Stats */}
            <div className="bg-bg-mid border border-border rounded-lg p-6">
              <h2 className="font-display text-xl text-text-cream mb-4">Fun Stats</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-bg-dark/50 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Most Popular Character</p>
                  <p className="font-display text-lg text-maxine-orange">
                    {data.funStats.mostPopularCharacter
                      ? `${data.funStats.mostPopularCharacter.name} (${data.funStats.mostPopularCharacter.clicks} clicks)`
                      : "No data yet"}
                  </p>
                </div>
                <div className="p-4 bg-bg-dark/50 rounded-lg">
                  <p className="text-text-muted text-sm mb-1">Peak Activity Hour</p>
                  <p className="font-display text-lg text-forest-green">
                    {data.funStats.peakHour
                      ? `${data.funStats.peakHour.hour}:00 (${data.funStats.peakHour.views} views)`
                      : "No data yet"}
                  </p>
                </div>
              </div>
            </div>

            {/* Section Engagement */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-bg-mid border border-border rounded-lg p-6">
                <h2 className="font-display text-xl text-text-cream mb-4">Section Engagement</h2>
                {Object.keys(data.sectionEngagement).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(data.sectionEngagement)
                      .sort((a, b) => b[1] - a[1])
                      .map(([section, count]) => (
                        <div key={section} className="flex items-center justify-between">
                          <span className="text-text-muted capitalize">{section}</span>
                          <span className="text-text-cream">{count}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-text-muted/50">No section data yet</p>
                )}
              </div>

              <div className="bg-bg-mid border border-border rounded-lg p-6">
                <h2 className="font-display text-xl text-text-cream mb-4">Click Events</h2>
                {Object.keys(data.clickRates).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(data.clickRates)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([element, count]) => (
                        <div key={element} className="flex items-center justify-between">
                          <span className="text-text-muted truncate max-w-[200px]">{element}</span>
                          <span className="text-text-cream">{count}</span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-text-muted/50">No click data yet</p>
                )}
              </div>
            </div>

            {/* Character Popularity */}
            <div className="bg-bg-mid border border-border rounded-lg p-6">
              <h2 className="font-display text-xl text-text-cream mb-4">Character Popularity</h2>
              {Object.keys(data.characterPopularity).length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(data.characterPopularity)
                    .sort((a, b) => b[1] - a[1])
                    .map(([character, clicks]) => (
                      <div
                        key={character}
                        className="p-4 bg-bg-dark/50 rounded-lg text-center"
                      >
                        <p className="font-display text-text-cream capitalize">{character}</p>
                        <p className="text-text-muted text-sm">{clicks} clicks</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-text-muted/50">No character click data yet</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="spinner" size={32} className="text-maxine-orange mx-auto animate-spin" />
            <p className="text-text-muted mt-4">Loading analytics...</p>
          </div>
        )}
      </div>
    </main>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-bg-mid border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon name={icon as any} size={20} className={`text-${color}`} />
        </div>
        <p className="text-text-muted text-sm">{title}</p>
      </div>
      <p className="font-display text-3xl text-text-cream">{value.toLocaleString()}</p>
    </div>
  );
}

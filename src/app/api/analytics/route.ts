import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

interface PageView {
  timestamp: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
}

interface SectionView {
  section: string;
  timestamp: string;
  sessionId: string;
  duration?: number;
}

interface ClickEvent {
  element: string;
  timestamp: string;
  sessionId: string;
}

interface AnalyticsData {
  pageViews: PageView[];
  sectionViews: SectionView[];
  clickEvents: ClickEvent[];
  uniqueVisitors: string[];
  totalVisitors: number;
}

// Ensure data directory and file exist
async function ensureDataFile(): Promise<AnalyticsData> {
  const dataDir = path.join(process.cwd(), "data");

  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    const initialData: AnalyticsData = {
      pageViews: [],
      sectionViews: [],
      clickEvents: [],
      uniqueVisitors: [],
      totalVisitors: 0,
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

// Generate simple session ID
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// POST - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: eventData, sessionId } = body;

    const analyticsData = await ensureDataFile();
    const timestamp = new Date().toISOString();
    const session = sessionId || generateSessionId();

    // Track based on event type
    switch (type) {
      case "pageview":
        analyticsData.pageViews.push({
          timestamp,
          path: eventData.path || "/",
          referrer: eventData.referrer,
          userAgent: eventData.userAgent,
          sessionId: session,
        });

        // Track unique visitor
        if (!analyticsData.uniqueVisitors.includes(session)) {
          analyticsData.uniqueVisitors.push(session);
          analyticsData.totalVisitors++;
        }
        break;

      case "section":
        analyticsData.sectionViews.push({
          section: eventData.section,
          timestamp,
          sessionId: session,
          duration: eventData.duration,
        });
        break;

      case "click":
        analyticsData.clickEvents.push({
          element: eventData.element,
          timestamp,
          sessionId: session,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Unknown event type" },
          { status: 400 }
        );
    }

    // Limit stored data to prevent file bloat (keep last 10000 entries)
    const maxEntries = 10000;
    if (analyticsData.pageViews.length > maxEntries) {
      analyticsData.pageViews = analyticsData.pageViews.slice(-maxEntries);
    }
    if (analyticsData.sectionViews.length > maxEntries) {
      analyticsData.sectionViews = analyticsData.sectionViews.slice(-maxEntries);
    }
    if (analyticsData.clickEvents.length > maxEntries) {
      analyticsData.clickEvents = analyticsData.clickEvents.slice(-maxEntries);
    }

    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(analyticsData, null, 2));

    return NextResponse.json({
      success: true,
      sessionId: session,
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// GET - Get analytics data (authenticated)
export async function GET(request: NextRequest) {
  try {
    // Check for admin auth
    const authHeader = request.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "alter-lily-admin";

    if (authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await ensureDataFile();

    // Calculate statistics
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Page views by time period
    const pageViewsLast24h = data.pageViews.filter(
      (pv) => new Date(pv.timestamp) > last24h
    ).length;
    const pageViewsLast7d = data.pageViews.filter(
      (pv) => new Date(pv.timestamp) > last7d
    ).length;
    const pageViewsLast30d = data.pageViews.filter(
      (pv) => new Date(pv.timestamp) > last30d
    ).length;

    // Section popularity
    const sectionCounts: Record<string, number> = {};
    data.sectionViews.forEach((sv) => {
      sectionCounts[sv.section] = (sectionCounts[sv.section] || 0) + 1;
    });

    // Click event counts
    const clickCounts: Record<string, number> = {};
    data.clickEvents.forEach((ce) => {
      clickCounts[ce.element] = (clickCounts[ce.element] || 0) + 1;
    });

    // Character popularity (from click events)
    const characterClicks: Record<string, number> = {};
    data.clickEvents
      .filter((ce) => ce.element.startsWith("character-"))
      .forEach((ce) => {
        const character = ce.element.replace("character-", "");
        characterClicks[character] = (characterClicks[character] || 0) + 1;
      });

    // Most popular character
    const mostPopularCharacter = Object.entries(characterClicks).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // Peak hour calculation
    const hourCounts: Record<number, number> = {};
    data.pageViews.forEach((pv) => {
      const hour = new Date(pv.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    const peakHour = Object.entries(hourCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return NextResponse.json({
      totalVisitors: data.totalVisitors,
      uniqueVisitorsCount: data.uniqueVisitors.length,
      pageViews: {
        total: data.pageViews.length,
        last24h: pageViewsLast24h,
        last7d: pageViewsLast7d,
        last30d: pageViewsLast30d,
      },
      sectionEngagement: sectionCounts,
      clickRates: clickCounts,
      characterPopularity: characterClicks,
      funStats: {
        mostPopularCharacter: mostPopularCharacter
          ? { name: mostPopularCharacter[0], clicks: mostPopularCharacter[1] }
          : null,
        peakHour: peakHour
          ? { hour: parseInt(peakHour[0]), views: peakHour[1] }
          : null,
      },
      // Raw data for detailed analysis
      recentPageViews: data.pageViews.slice(-100),
      recentClicks: data.clickEvents.slice(-100),
    });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

// GET - Public endpoint to get visitor count
export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), "data");

    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    let totalVisitors = 0;

    try {
      const data = await fs.readFile(DATA_FILE, "utf-8");
      const analyticsData = JSON.parse(data);
      totalVisitors = analyticsData.totalVisitors || 0;
    } catch {
      // File doesn't exist yet, return 0
    }

    return NextResponse.json({
      totalVisitors,
    });
  } catch (error) {
    console.error("Visitor count fetch error:", error);
    return NextResponse.json(
      { totalVisitors: 0 },
      { status: 200 }
    );
  }
}

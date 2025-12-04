import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "newsletter.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
  source?: string;
  confirmed: boolean;
}

interface NewsletterData {
  subscribers: Subscriber[];
}

// Ensure data directory and file exist
async function ensureDataFile(): Promise<NewsletterData> {
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
    const initialData: NewsletterData = { subscribers: [] };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

// Validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = "website" } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Get current data
    const data = await ensureDataFile();

    // Check if already subscribed
    const existingSubscriber = data.subscribers.find(
      (sub) => sub.email === normalizedEmail
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "You're already subscribed!", alreadySubscribed: true },
        { status: 200 }
      );
    }

    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      source,
      confirmed: false, // Would be true after email confirmation
    };

    data.subscribers.push(newSubscriber);

    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));

    // TODO: Integrate with actual email service (Mailchimp, ConvertKit, etc.)
    // For now, just store in JSON

    return NextResponse.json(
      {
        message: "Successfully subscribed! Check your inbox for confirmation.",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

// GET - Get subscriber count (public) or full list (authenticated)
export async function GET(request: NextRequest) {
  try {
    const data = await ensureDataFile();

    // Check for admin auth (simple password for now)
    const authHeader = request.headers.get("authorization");
    const isAdmin =
      authHeader === `Bearer ${process.env.ADMIN_PASSWORD || "alter-lily-admin"}`;

    if (isAdmin) {
      // Return full subscriber list for admin
      return NextResponse.json({
        total: data.subscribers.length,
        subscribers: data.subscribers,
      });
    }

    // Public: only return count
    return NextResponse.json({
      total: data.subscribers.length,
    });
  } catch (error) {
    console.error("Newsletter fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriber data" },
      { status: 500 }
    );
  }
}

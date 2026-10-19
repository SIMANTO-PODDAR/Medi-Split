import { NextResponse, userAgent } from "next/server";
import { getAdminDb, FieldValue } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getDhakaDate(): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

function extractClientIp(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

function sanitizeIp(ip: string): string {
  return ip.replace(/[^a-zA-Z0-9.-]/g, "_");
}

export async function POST(request: Request) {
  try {
    let body: { timeSpent?: number } = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const additionalSeconds = Math.max(
      0,
      Math.floor(Number(body?.timeSpent) || 0)
    );
    const safeSeconds = Math.min(additionalSeconds, 3600);

    const ipAddress = extractClientIp(request);
    const date = getDhakaDate();
    const sanitizedIp = sanitizeIp(ipAddress);
    const docId = `${date}_${sanitizedIp}`;

    const { device, os } = userAgent(request);

    let deviceType: "Desktop" | "Mobile" | "Tablet" = "Desktop";
    if (device.type === "mobile") {
      deviceType = "Mobile";
    } else if (device.type === "tablet") {
      deviceType = "Tablet";
    }

    const deviceModel = device.model?.trim() || null;
    const operatingSystem = os.name
      ? os.version
        ? `${os.name} ${os.version}`
        : os.name
      : null;

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      null;

    const region =
      request.headers.get("x-vercel-ip-country-region") ||
      request.headers.get("cf-region") ||
      null;

    const rawCity =
      request.headers.get("x-vercel-ip-city") ||
      request.headers.get("cf-ipcity");
    const city = rawCity ? decodeURIComponent(rawCity) : null;

    const db = getAdminDb();
    const docRef = db.collection("medi-split-visitors").doc(docId);

    await db.runTransaction(async (transaction) => {
      const docSnap = await transaction.get(docRef);

      if (!docSnap.exists) {
        transaction.set(docRef, {
          ipAddress,
          date,
          totalTimeSpent: safeSeconds,
          deviceType,
          deviceModel,
          operatingSystem,
          country,
          region,
          city,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
      } else {
        const updateData: Record<string, any> = {          // eslint-disable-line @typescript-eslint/no-explicit-any
          totalTimeSpent: FieldValue.increment(safeSeconds),
          updatedAt: FieldValue.serverTimestamp(),
        };

        const existing = docSnap.data();
        if (!existing?.deviceModel && deviceModel) {
          updateData.deviceModel = deviceModel;
        }
        if (!existing?.country && country) {
          updateData.country = country;
        }
        if (!existing?.region && region) {
          updateData.region = region;
        }
        if (!existing?.city && city) {
          updateData.city = city;
        }

        transaction.update(docRef, updateData);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {    // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("Visitor tracking error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/train?number=<trainNo>
 *
 * Returns the journeyDate (YYYYMMDD) for tomorrow — computed server-side
 * so the browser never needs to worry about timezone.
 *
 * The browser uses this date to call IRCTC directly:
 *   https://www.irctc.co.in/.../trnscheduleenquiry/<number>?journeyDate=<date>
 *
 * We do NOT proxy the IRCTC call server-side because the corporate network
 * proxy (McAfee) intercepts and blocks HTTPS from Node.js. The browser's
 * own session cookies + network stack handle it fine.
 */
export async function GET(request: NextRequest) {
  const number = request.nextUrl.searchParams.get("number")?.trim() ?? "";

  if (!number || !/^\d{4,5}$/.test(number)) {
    return NextResponse.json(
      { error: "Provide a valid 4–5 digit train number." },
      { status: 422 }
    );
  }

  const d = new Date();
  d.setDate(d.getDate() + 1);
  const journeyDate =
    `${d.getFullYear()}` +
    `${String(d.getMonth() + 1).padStart(2, "0")}` +
    `${String(d.getDate()).padStart(2, "0")}`;

  return NextResponse.json({ journeyDate });
}

/**
 * IRCTC seat-availability client — BROWSER-SIDE ONLY.
 *
 * The availability endpoint lives under /eticketing/protected/ and therefore
 * requires the user's logged-in IRCTC session. Those cookies only exist in the
 * browser, so this request is made directly from the browser with
 * `credentials: "include"` — never proxied through a Next.js route (the server
 * has no session and the corporate proxy blocks Node→IRCTC HTTPS anyway).
 *
 * Endpoint (POST):
 *   /eticketing/protected/mapps1/avlFarenquiry/
 *     {trainNumber}/{journeyDate(YYYYMMDD)}/{fromStn}/{toStn}/{class}/{quota}/N
 *
 * Body:
 *   { paymentFlag:"N", quotaCode, moreThanOneDay:true, trainNumber,
 *     fromStnCode, toStnCode, journeyDate, classCode }
 */

const AVAIL_BASE =
  "https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry";

const IRCTC_HEADERS: HeadersInit = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  bmirak: "webbm",
  "content-language": "en",
  "content-type": "application/json; charset=UTF-8",
  greq: "1",
  origin: "https://www.irctc.co.in",
  referer: "https://www.irctc.co.in/nget/booking/train-list",
};

interface AvlDayItem {
  /** e.g. "28-6-2026" (no zero padding) */
  availablityDate?: string;
  /** e.g. "AVAILABLE-0015", "REGRET/WL...", "RAC...", "NOT AVAILABLE" */
  availablityStatus?: string;
}

interface AvlResponse {
  avlDayList?: AvlDayItem[];
  errorMessage?: string;
}

export interface FetchQuotaParams {
  trainNumber: string;
  fromStnCode: string;
  toStnCode: string;
  /** YYYYMMDD */
  journeyDate: string;
  classCode: string;
  quotaCode: "TQ" | "PT";
  signal: AbortSignal;
}

/** Does an avlDayList "28-6-2026" entry correspond to a YYYYMMDD journeyDate? */
function avlDateMatches(availablityDate: string, journeyDateYmd: string): boolean {
  const parts = availablityDate.split("-");
  if (parts.length !== 3) return false;
  const [d, m, y] = parts;
  const normalized = `${y}${m.padStart(2, "0")}${d.padStart(2, "0")}`;
  return normalized === journeyDateYmd;
}

/**
 * Fetches raw availablityStatus for one quota type on one segment for one date.
 * Returns null when the quota/class is not offered for this segment.
 * @throws on network / HTTP failure (so the caller can mark the row as errored).
 */
export async function fetchIrctcQuota(params: FetchQuotaParams): Promise<string | null> {
  const {
    trainNumber,
    fromStnCode,
    toStnCode,
    journeyDate,
    classCode,
    quotaCode,
    signal,
  } = params;

  const url =
    `${AVAIL_BASE}/${trainNumber}/${journeyDate}/${fromStnCode}/${toStnCode}` +
    `/${classCode}/${quotaCode}/N`;

  const res = await fetch(url, {
    method: "POST",
    headers: IRCTC_HEADERS,
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({
      paymentFlag: "N",
      quotaCode,
      moreThanOneDay: true,
      trainNumber,
      fromStnCode,
      toStnCode,
      journeyDate,
      classCode,
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`IRCTC returned HTTP ${res.status}`);
  }

  const data: AvlResponse = await res.json();

  const list = data.avlDayList;
  if (!list || list.length === 0) return null;

  // Pick the row for the exact requested date; fall back to the first row.
  const match =
    list.find(
      (it) => it.availablityDate && avlDateMatches(it.availablityDate, journeyDate)
    ) ?? list[0];

  return match.availablityStatus?.trim() ?? null;
}

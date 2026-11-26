/**
 * Core data contracts for the entire application.
 *
 * The UI, business logic, and the browser-side IRCTC clients
 * (irctcQuota.ts + the schedule fetch in page.tsx) all share these types.
 */

// ── Train schedule ────────────────────────────────────────────────────────────

export interface TrainStation {
  /** Station code, e.g. "NDLS" */
  code: string;
  /** Full station name, e.g. "New Delhi" */
  name: string;
  /** Scheduled arrival time "HH:MM", or "--" for the origin */
  arrivalTime: string;
  /** Scheduled departure time "HH:MM", or "--" for the terminus */
  departureTime: string;
  /**
   * Day offset from the train's origin departure.
   * 1 = same day as departure, 2 = next calendar day, etc.
   */
  dayCount: number;
  /** Cumulative distance from origin in km */
  distanceKm: number;
  /** 1-based position in the route (1 = origin) */
  serialNumber: number;
}

export interface TrainInfo {
  number: string;
  name: string;
  /** e.g. ["Mon", "Wed", "Fri"] */
  runsOnDays: string[];
  stations: TrainStation[];
}

// ── Quota availability ────────────────────────────────────────────────────────

export interface QuotaAvailability {
  /** Raw IRCTC availablityStatus string, e.g. "AVAILABLE-0007", "TQWL9/WL7". null = quota not offered. */
  tatkal: string | null;
  premiumTatkal: string | null;
}

// ── Analysis ──────────────────────────────────────────────────────────────────

export interface CombinationResult {
  fromCode: string;
  fromName: string;
  toCode: string;
  toName: string;
  fromDayCount: number;
  toDayCount: number;
  /** Null when the request failed. */
  quota: QuotaAvailability | null;
  /** Non-null when the request failed. */
  error: string | null;
}

export interface AnalysisResult {
  trainInfo: TrainInfo;
  /** DD-MM-YYYY, the date used for the origin's quota check */
  originDateStr: string;
  classCode: string;
  combinations: CombinationResult[];
  requestedFromCode: string | null;
  requestedToCode: string | null;
}

// ── Fetcher progress ──────────────────────────────────────────────────────────

export interface FetchProgress {
  total: number;
  completed: number;
  /** Short human-readable status, e.g. "Checking NDLS → BCT" */
  current: string;
}

/**
 * Options accepted by QuotaFetcher.
 *
 * All fields are optional and currently informational only.
 * They are accepted so that concurrency limits, retries, and backoff
 * can be wired in later without changing the caller interface.
 */
export interface QuotaFetcherOptions {
  /** Max parallel in-flight requests. Currently not enforced. */
  concurrency?: number;
  /** Max retries per failed request. Currently not enforced. */
  retries?: number;
  /** Initial backoff delay in ms. Currently not enforced. */
  backoffMs?: number;
  /** Per-request timeout in ms. Default: 30 000. */
  timeoutMs?: number;
}

// ── History ───────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  trainNumber: string;
  trainName: string;
  originDateStr: string;
  classCode: string;
  fromCode: string | null;
  toCode: string | null;
  combinationCount: number;
}

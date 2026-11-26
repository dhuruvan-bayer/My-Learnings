/**
 * Quota fetching orchestration layer.
 *
 * The UI calls QuotaFetcher; QuotaFetcher calls the browser-side IRCTC client
 * (irctcQuota.ts) directly. This is the single place that owns concurrency
 * limiting, timeouts, and (future) retries / backoff.
 *
 * Why browser-side? The IRCTC availability endpoint is under /protected/ and
 * needs the user's logged-in session cookies, which only exist in the browser.
 *
 * Requests are run through a small concurrency pool. Firing every segment at
 * once (a long route can be 700+ pairs × 2 quota types) reliably trips IRCTC's
 * Akamai bot protection, so the pool keeps in-flight requests bounded.
 */

import type {
  CombinationResult,
  FetchProgress,
  QuotaAvailability,
  QuotaFetcherOptions,
} from "../services/types";
import type { CombinationSpec } from "./stationUtils";
import { fetchIrctcQuota } from "../services/irctcQuota";

const DEFAULT_CONCURRENCY = 4;
const DEFAULT_TIMEOUT_MS = 30_000;

export class QuotaFetcher {
  private readonly options: QuotaFetcherOptions;

  constructor(options: QuotaFetcherOptions = {}) {
    this.options = options;
  }

  /**
   * Fetches Tatkal + Premium Tatkal availability for every combination.
   *
   * @param trainNumber  - Train number
   * @param combinations - List of (from, to, journeyDate) specs
   * @param classCode    - Travel class, e.g. "SL"
   * @param signal       - AbortSignal for cancellation
   * @param onProgress   - Called after each completed request
   * @returns            - Ordered array matching `combinations`
   */
  async fetchAll(
    trainNumber: string,
    combinations: CombinationSpec[],
    classCode: string,
    signal: AbortSignal,
    onProgress: (progress: FetchProgress) => void
  ): Promise<CombinationResult[]> {
    const results: CombinationResult[] = new Array(combinations.length);
    let completed = 0;

    const runOne = async (spec: CombinationSpec, index: number): Promise<void> => {
      try {
        const quota = await this.fetchOne(trainNumber, spec, classCode, signal);
        results[index] = {
          fromCode: spec.fromStation.code,
          fromName: spec.fromStation.name,
          toCode: spec.toStation.code,
          toName: spec.toStation.name,
          fromDayCount: spec.fromStation.dayCount,
          toDayCount: spec.toStation.dayCount,
          quota,
          error: null,
        };
      } catch (err) {
        results[index] = {
          fromCode: spec.fromStation.code,
          fromName: spec.fromStation.name,
          toCode: spec.toStation.code,
          toName: spec.toStation.name,
          fromDayCount: spec.fromStation.dayCount,
          toDayCount: spec.toStation.dayCount,
          quota: null,
          error: err instanceof Error ? err.message : "Request failed",
        };
      } finally {
        completed++;
        onProgress({
          total: combinations.length,
          completed,
          current: `Checking ${spec.fromStation.code} → ${spec.toStation.code}`,
        });
      }
    };

    // Bounded worker pool. Each worker pulls the next index until the queue is
    // drained. When aborted, in-flight requests reject quickly and the
    // remaining ones fail fast, so every result slot still gets filled.
    const concurrency = Math.max(1, this.options.concurrency ?? DEFAULT_CONCURRENCY);
    let nextIndex = 0;
    const worker = async (): Promise<void> => {
      while (nextIndex < combinations.length) {
        const i = nextIndex++;
        await runOne(combinations[i], i);
      }
    };

    const poolSize = Math.min(concurrency, combinations.length);
    await Promise.all(Array.from({ length: poolSize }, () => worker()));

    return results;
  }

  private async fetchOne(
    trainNumber: string,
    spec: CombinationSpec,
    classCode: string,
    signal: AbortSignal
  ): Promise<QuotaAvailability> {
    const timeoutMs = this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onParentAbort = () => controller.abort();
    signal.addEventListener("abort", onParentAbort, { once: true });

    const base = {
      trainNumber,
      fromStnCode: spec.fromStation.code,
      toStnCode: spec.toStation.code,
      journeyDate: spec.dateStr,
      classCode,
      signal: controller.signal,
    };

    try {
      // Fetch Tatkal + Premium Tatkal. One failing doesn't fail the row;
      // only a total failure (both rejected) marks the row as errored.
      const [tq, pt] = await Promise.allSettled([
        fetchIrctcQuota({ ...base, quotaCode: "TQ" }),
        fetchIrctcQuota({ ...base, quotaCode: "PT" }),
      ]);

      if (tq.status === "rejected" && pt.status === "rejected") {
        throw tq.reason instanceof Error ? tq.reason : new Error("Request failed");
      }

      return {
        tatkal: tq.status === "fulfilled" ? tq.value : null,
        premiumTatkal: pt.status === "fulfilled" ? pt.value : null,
      };
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onParentAbort);
    }
  }
}

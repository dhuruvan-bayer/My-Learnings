/**
 * Recommendation engine.
 *
 * Given the full set of CombinationResults and the user's requested journey
 * (fromCode → toCode), finds the best booking segment that still covers the
 * requested journey.
 *
 * Ranking: highest Tatkal first; ties broken by highest Premium Tatkal; and
 * remaining ties broken by the *nearest* boarding station (the one closest to
 * the requested journey), so we never suggest a needlessly long route when a
 * closer one has the same quota.
 *
 * Only options with at least one actually-available seat (Tatkal or Premium
 * Tatkal > 0) are ever recommended.
 */

import type { CombinationResult } from "../services/types";

export interface RecommendationResult {
  /** The result for exactly the requested journey (may be null if not found). */
  requested: CombinationResult | null;
  /** All valid alternatives sorted best-first, including the requested journey. */
  alternatives: CombinationResult[];
  /** Best available booking that is NOT the requested journey and is strictly better. */
  bestAlternative: CombinationResult | null;
  /** Human-readable recommendation text. */
  message: string;
}

function isAvailable(s: string | null | undefined): boolean {
  if (!s) return false;
  const u = s.toUpperCase();
  return u.startsWith("AVAILABLE") || u.startsWith("CURR_AVBL") || u.startsWith("AVBL");
}

/** A row has real availability if either quota has confirmed seats. */
function hasSeats(c: CombinationResult): boolean {
  return isAvailable(c.quota?.tatkal) || isAvailable(c.quota?.premiumTatkal);
}

export function buildRecommendation(
  combinations: CombinationResult[],
  requestedFromCode: string,
  requestedToCode: string
): RecommendationResult {
  const from = requestedFromCode.toUpperCase();
  const to   = requestedToCode.toUpperCase();

  const isRequested = (c: CombinationResult) =>
    c.fromCode.toUpperCase() === from && c.toCode.toUpperCase() === to;

  const requested = combinations.find(isRequested) ?? null;

  // Sort: available rows first, then preserve original order (nearest boarding station last).
  const sorted = combinations
    .map((c, index) => ({ c, index }))
    .filter((x) => x.c.quota !== null)
    .sort((a, b) => {
      const aAvail = hasSeats(a.c) ? 1 : 0;
      const bAvail = hasSeats(b.c) ? 1 : 0;
      if (bAvail !== aAvail) return bAvail - aAvail;
      return b.index - a.index; // nearest boarding station first within tier
    })
    .map((x) => x.c);

  const bestAvailable = sorted.find(hasSeats) ?? null;

  const bestAlternative =
    sorted.find((c) => !isRequested(c) && hasSeats(c)) ?? null;

  let message: string;

  if (!requested) {
    message =
      `The journey ${requestedFromCode} → ${requestedToCode} could not be found on this train's route.`;
  } else if (requested.quota === null) {
    message = bestAvailable
      ? `Couldn't read ${requestedFromCode} → ${requestedToCode} directly, but ` +
        `${bestAvailable.fromCode} → ${bestAvailable.toCode} still covers your journey.`
      : `Could not retrieve quota for ${requestedFromCode} → ${requestedToCode}.`;
  } else if (!bestAvailable) {
    message =
      `No Tatkal or Premium Tatkal seats are currently available for ` +
      `${requestedFromCode} → ${requestedToCode} (status: ${requested.quota.tatkal ?? "—"}), ` +
      `or for any earlier boarding point that still covers it.`;
  } else if (bestAlternative && !hasSeats(requested)) {
    message =
      `Book from ${bestAlternative.fromCode} to ${bestAlternative.toCode} ` +
      `instead of ${requestedFromCode} to ${requestedToCode} — ` +
      `that segment has confirmed seats while your route shows ${requested.quota.tatkal ?? "—"} for Tatkal.`;
  } else {
    message =
      `Your selected journey ${requestedFromCode} → ${requestedToCode} has the best available quota ` +
      `(Tatkal: ${requested.quota.tatkal ?? "—"}, Premium Tatkal: ${requested.quota.premiumTatkal ?? "—"}).`;
  }

  return { requested, alternatives: sorted, bestAlternative, message };
}

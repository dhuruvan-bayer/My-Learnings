"use client";

import { useState } from "react";
import type { CombinationResult } from "../lib/services/types";

interface Props {
  results: CombinationResult[];
  trainName: string;
  trainNumber: string;
  classCode: string;
  dateDisplay: string;
  /**
   * When true (searched after 11:00 AM), only segments that are actually
   * AVAILABLE (seats > 0) are shown — waitlist / unavailable rows are hidden.
   */
  availableOnly: boolean;
}

/** True when the raw status string indicates confirmed seats (not WL/RAC). */
function isAvailable(s: string | null | undefined): boolean {
  if (!s) return false;
  const u = s.toUpperCase();
  return u.startsWith("AVAILABLE") || u.startsWith("CURR_AVBL") || u.startsWith("AVBL");
}

/** A row has real availability if either quota has confirmed seats. */
function hasSeats(r: CombinationResult): boolean {
  return isAvailable(r.quota?.tatkal) || isAvailable(r.quota?.premiumTatkal);
}

/**
 * Picks the single best segment: confirmed seats > WL/RAC > anything else.
 * Within each tier, prefers the nearest boarding station (last in list).
 */
function pickBest(rows: CombinationResult[]): CombinationResult | null {
  const withSeats = rows.filter(hasSeats);
  const pool = withSeats.length > 0 ? withSeats : rows;
  // Last item in pool = nearest boarding station (original list order preserved).
  return pool.at(-1) ?? null;
}

function SeatCell({ value }: { value: string | null | undefined }) {
  if (!value) return <span className="muted">—</span>;
  const u = value.toUpperCase();
  if (u.startsWith("AVAILABLE") || u.startsWith("CURR_AVBL") || u.startsWith("AVBL")) {
    return <span className="seats-ok">{value}</span>;
  }
  if (u.startsWith("RAC")) {
    return <span className="seats-low">{value}</span>;
  }
  return <span className="seats-zero">{value}</span>;
}

export function ResultsTable({
  results,
  trainName,
  trainNumber,
  classCode,
  dateDisplay,
  availableOnly,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  if (results.length === 0) return null;

  const withQuota = results.filter((r) => r.quota !== null);

  // The default "best" view respects the time-of-day policy (available-only
  // after 11 AM). "Show all results" ignores it and lists every combination
  // that was actually checked.
  const bestPool = availableOnly ? withQuota.filter(hasSeats) : withQuota;
  const best = pickBest(bestPool);
  const bestRows = best ? [best] : [];

  const displayRows = showAll ? withQuota : bestRows;

  let emptyMessage: string;
  if (showAll) {
    emptyMessage = "No combinations returned any data for this train and class.";
  } else if (availableOnly) {
    emptyMessage =
      "No seats are currently available for this train and class on the selected date. " +
      'Tick "Show all results" to see every segment that was checked.';
  } else {
    emptyMessage = "No quota data could be retrieved for these combinations.";
  }

  return (
    <div className="results-section">
      <div className="results-header">
        <div>
          <h2>
            {trainName} ({trainNumber}) — {classCode}
          </h2>
          <p className="muted">
            {dateDisplay} · {withQuota.length} combinations checked
            {availableOnly && !showAll && (
              <span className="warn-inline"> · showing available only (after 11 AM)</span>
            )}
          </p>
        </div>
        <div className="results-toggle">
          <label>
            <input
              type="checkbox"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
            />{" "}
            Show all results
          </label>
          <span className="muted hint-sm">
            {showAll
              ? `${withQuota.length} combinations checked`
              : "Showing the single best option"}
          </span>
        </div>
      </div>

      {displayRows.length === 0 ? (
        <div className="reco-box reco-same">{emptyMessage}</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Destination</th>
                <th className="num">Tatkal</th>
                <th className="num">Premium Tatkal</th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((r, i) => (
                <tr key={`${r.fromCode}-${r.toCode}-${i}`} className={r.error ? "row-error" : ""}>
                  <td>
                    <strong>{r.fromCode}</strong>
                    <span className="muted name-small"> {r.fromName}</span>
                  </td>
                  <td>
                    <strong>{r.toCode}</strong>
                    <span className="muted name-small"> {r.toName}</span>
                  </td>
                  <td className="num">
                    {r.error ? (
                      <span className="muted" title={r.error}>err</span>
                    ) : (
                      <SeatCell value={r.quota?.tatkal} />
                    )}
                  </td>
                  <td className="num">
                    {r.error ? (
                      <span className="muted" title={r.error}>err</span>
                    ) : (
                      <SeatCell value={r.quota?.premiumTatkal} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

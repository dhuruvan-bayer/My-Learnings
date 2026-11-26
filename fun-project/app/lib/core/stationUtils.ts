/**
 * Station and journey combination business logic.
 */

import type { TrainStation } from "../services/types";
import {
  dateForDayCount,
  formatDateDisplay,
  formatDateForApi,
  formatDateForIrctc,
} from "./dateUtils";

// ── Station lookup ────────────────────────────────────────────────────────────

/**
 * Finds a station by code (case-insensitive).
 * Returns null if not found.
 */
export function findStation(
  stations: TrainStation[],
  code: string
): TrainStation | null {
  const upper = code.trim().toUpperCase();
  return stations.find((s) => s.code.toUpperCase() === upper) ?? null;
}

// ── Overnight date-mismatch detection ────────────────────────────────────────

export interface OvernightWarning {
  boardingDate: Date;
  boardingDateStr: string;
  boardingDateDisplay: string;
  message: string;
}

/**
 * Checks if the user's selected boarding station is reached on a different
 * calendar date than the origin departure date (originDate).
 *
 * When this happens the user must search IRCTC using the boarding station's
 * date, not the origin's date. We stop analysis and inform them.
 *
 * Returns null when there is no mismatch (dayCount === 1).
 */
export function detectOvernightMismatch(
  fromStation: TrainStation,
  originDate: Date
): OvernightWarning | null {
  if (fromStation.dayCount <= 1) return null;

  const boardingDate = dateForDayCount(originDate, fromStation.dayCount);
  const boardingDateStr = formatDateForApi(boardingDate);
  const boardingDateDisplay = formatDateDisplay(boardingDate);
  const originDateDisplay = formatDateDisplay(originDate);

  return {
    boardingDate,
    boardingDateStr,
    boardingDateDisplay,
    message:
      `Your selected boarding station "${fromStation.name}" (${fromStation.code}) ` +
      `is reached on ${boardingDateDisplay}, not ${originDateDisplay}. ` +
      `Please search using the travel date ${boardingDateDisplay} instead of ${originDateDisplay}.`,
  };
}

// ── Combination generation ────────────────────────────────────────────────────

export interface CombinationSpec {
  fromStation: TrainStation;
  toStation: TrainStation;
  /** YYYYMMDD journeyDate for this specific departure (IRCTC quota format) */
  dateStr: string;
}

/**
 * Generates every valid forward journey (i < j) for the full route.
 * The date for each combination is derived from the from-station's dayCount
 * relative to the origin departure date.
 */
export function generateAllCombinations(
  stations: TrainStation[],
  originDate: Date
): CombinationSpec[] {
  const out: CombinationSpec[] = [];
  for (let i = 0; i < stations.length - 1; i++) {
    for (let j = i + 1; j < stations.length; j++) {
      const from = stations[i];
      const boardingDate = dateForDayCount(originDate, from.dayCount);
      out.push({
        fromStation: from,
        toStation: stations[j],
        dateStr: formatDateForIrctc(boardingDate),
      });
    }
  }
  return out;
}

/**
 * Generates every combination where from-index ≤ requested-from-index
 * AND to-index ≥ requested-to-index.
 * These are all bookings that fully cover the requested journey.
 */
export function generateCoveringCombinations(
  stations: TrainStation[],
  requestedFromCode: string,
  requestedToCode: string,
  originDate: Date
): CombinationSpec[] | { error: string } {
  const fromSt = findStation(stations, requestedFromCode);
  const toSt   = findStation(stations, requestedToCode);

  if (!fromSt) return { error: `Station "${requestedFromCode}" is not part of this train's route.` };
  if (!toSt)   return { error: `Station "${requestedToCode}" is not part of this train's route.` };
  if (fromSt.serialNumber >= toSt.serialNumber) {
    return { error: `"${requestedFromCode}" comes at or after "${requestedToCode}" on this route. Please swap them.` };
  }

  const fromIdx = stations.indexOf(fromSt);
  const toIdx   = stations.indexOf(toSt);

  const out: CombinationSpec[] = [];
  for (let i = 0; i <= fromIdx; i++) {
    for (let j = toIdx; j < stations.length; j++) {
      if (i < j) {
        const boardingDate = dateForDayCount(originDate, stations[i].dayCount);
        out.push({
          fromStation: stations[i],
          toStation: stations[j],
          dateStr: formatDateForIrctc(boardingDate),
        });
      }
    }
  }
  return out;
}

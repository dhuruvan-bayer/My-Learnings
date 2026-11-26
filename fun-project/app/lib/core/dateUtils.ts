/**
 * Date and time business logic.
 * All functions are pure and testable without any I/O.
 */

import type { TrainInfo } from "../services/types";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Returns tomorrow's date in the user's local timezone. */
export function getTomorrowDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Format a Date as DD-MM-YYYY (used for display / history). */
export function formatDateForApi(d: Date): string {
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

/** Format a Date as YYYYMMDD — the `journeyDate` format the IRCTC quota API expects. */
export function formatDateForIrctc(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

/** Format a Date as a human-readable string, e.g. "28 Jun 2026 (Sun)". */
export function formatDateDisplay(d: Date): string {
  const day = DAY_NAMES[d.getDay()];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} (${day})`;
}

/**
 * Returns the actual calendar date for a station that has a given dayCount,
 * relative to the train's origin departure date.
 *
 * dayCount = 1 → same as originDate
 * dayCount = 2 → originDate + 1 day
 */
export function dateForDayCount(originDate: Date, dayCount: number): Date {
  const d = new Date(originDate);
  d.setDate(d.getDate() + (dayCount - 1));
  return d;
}

/**
 * Checks whether the current local time falls inside the preferred
 * Tatkal analysis window (01:00 – 09:50 AM).
 *
 * Outside this window the quota numbers may not reflect the initial
 * Tatkal allocation because some seats will already have been sold.
 */
export interface TatkalWindowStatus {
  inWindow: boolean;
  warning: string;
}

export function checkTatkalWindow(): TatkalWindowStatus {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  const windowStartMin = 1 * 60;       // 01:00
  const windowEndMin   = 9 * 60 + 50;  // 09:50

  if (totalMinutes >= windowStartMin && totalMinutes < windowEndMin) {
    return { inWindow: true, warning: "" };
  }

  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  return {
    inWindow: false,
    warning:
      `Current time is ${hh}:${mm}, which is outside the Tatkal analysis ` +
      `window (01:00 – 09:50 AM). The results will reflect current availability ` +
      `rather than the initial Tatkal allocation. You may still proceed.`,
  };
}

/**
 * After 11:00 AM, Tatkal booking is already underway and seats are being sold,
 * so only options that are actually AVAILABLE (seats > 0) are meaningful —
 * waitlist / regret / "not available" rows are just noise at that point.
 */
export function isTatkalSellingStarted(now: Date = new Date()): boolean {
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  return totalMinutes >= 11 * 60;
}

/**
 * Determines whether the train runs on the given date based on its weekly
 * schedule. Returns false if the train's runsOnDays is empty (unknown).
 */
export function isTrainRunningOnDate(train: TrainInfo, date: Date): boolean {
  if (!train.runsOnDays || train.runsOnDays.length === 0) return true; // unknown → assume yes
  const dayName = DAY_NAMES[date.getDay()];
  return train.runsOnDays.includes(dayName);
}

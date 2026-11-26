import type { HistoryEntry } from "./services/types";

const STORAGE_KEY = "tqa-history-v2";
const MAX_ENTRIES = 20;

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
  } catch {
    /* ignore quota exceeded */
  }
}

export function addHistoryEntry(entry: HistoryEntry): HistoryEntry[] {
  const existing = loadHistory().filter((e) => e.id !== entry.id);
  const next = [entry, ...existing].slice(0, MAX_ENTRIES);
  saveHistory(next);
  return next;
}

export function removeHistoryEntry(id: string): HistoryEntry[] {
  const next = loadHistory().filter((e) => e.id !== id);
  saveHistory(next);
  return next;
}

export function clearAllHistory(): HistoryEntry[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return [];
}

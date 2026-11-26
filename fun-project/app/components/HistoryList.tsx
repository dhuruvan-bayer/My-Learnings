"use client";

import type { HistoryEntry } from "../lib/services/types";

interface Props {
  entries: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function HistoryList({ entries, onRestore, onDelete, onClear }: Props) {
  if (entries.length === 0) {
    return (
      <div className="history-section">
        <h3>Search History</h3>
        <p className="muted">No past analyses yet.</p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Search History</h3>
        <button className="btn-text" onClick={onClear}>
          Clear all
        </button>
      </div>
      <ul className="history-list">
        {entries.map((e) => (
          <li key={e.id} className="history-item">
            <button className="history-restore" onClick={() => onRestore(e)}>
              <span className="history-train">
                {e.trainName} ({e.trainNumber})
              </span>
              <span className="muted history-meta">
                {e.classCode} · {e.originDateStr}
                {e.fromCode && e.toCode
                  ? ` · ${e.fromCode}→${e.toCode}`
                  : ` · ${e.combinationCount} combinations`}
                {" · "}{timeAgo(e.timestamp)}
              </span>
            </button>
            <button
              className="btn-text history-delete"
              onClick={() => onDelete(e.id)}
              aria-label="Delete"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

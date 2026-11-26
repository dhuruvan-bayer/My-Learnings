"use client";

import { useEffect, useRef } from "react";
import type { FetchProgress } from "../lib/services/types";

interface Props {
  lines: string[];
  analyzing: boolean;
  progress?: FetchProgress | null;
  onCancel: () => void;
}

export function StatusLog({ lines, analyzing, progress, onCancel }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [lines]);

  if (lines.length === 0) return null;

  const total = progress?.total ?? 0;
  const completed = progress?.completed ?? 0;
  const hasCount = total > 0;
  const pct = hasCount ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  return (
    <div className="status-log">
      <div className="status-log-header">
        <span className="status-log-title">
          {analyzing && <span className="spinner" aria-hidden="true" />}
          <span className="muted">{analyzing ? "Analyzing…" : "Processing log"}</span>
        </span>
        <div className="status-log-actions">
          {analyzing && hasCount && (
            <span className="muted progress-count">
              {completed} / {total} ({pct}%)
            </span>
          )}
          {analyzing && (
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {analyzing && (
        <div className="progress-track">
          {hasCount ? (
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          ) : (
            <div className="progress-fill progress-indeterminate" />
          )}
        </div>
      )}

      <div className="status-log-body">
        {lines.map((line, i) => (
          <div key={i} className="log-line">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

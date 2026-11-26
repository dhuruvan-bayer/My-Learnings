"use client";

import { useRef } from "react";
import type { TrainInfo, TrainStation } from "../lib/services/types";

/** Full label map for every class code IRCTC may return */
const CLASS_LABELS: Record<string, string> = {
  "1A": "1A — AC First Class",
  "2A": "2A — AC 2 Tier",
  "3A": "3A — AC 3 Tier",
  "3E": "3E — AC 3 Economy",
  "SL": "SL — Sleeper",
  "CC": "CC — Chair Car",
  "2S": "2S — Second Sitting",
  "EC": "EC — Executive Chair Car",
  "FC": "FC — First Class",
  "EA": "EA — Anubhuti Class",
};

export interface FormValues {
  trainNumber: string;
  classCode: string;
  fromCode: string;
  toCode: string;
}

interface Props {
  value: FormValues;
  onChange: (v: FormValues) => void;
  trainInfo: TrainInfo | null;
  trainLoading: boolean;
  trainError: string | null;
  /** Classes fetched live from IRCTC for this train. null = still loading, [] = none returned */
  availableClasses: string[] | null;
  classesLoading: boolean;
  /** Set when IRCTC says the train is not bookable for Tatkal on this date */
  classesError: string | null;
  analyzing: boolean;
  onAnalyze: () => void;
}

// Simple station autocomplete using <datalist>
function StationInput({
  id,
  value,
  onChange,
  stations,
  placeholder,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (code: string) => void;
  stations: TrainStation[];
  placeholder: string;
  disabled?: boolean;
}) {
  const listId = `${id}-list`;
  const inputRef = useRef<HTMLInputElement>(null);

  // When the user types, try to match a station code
  const handleChange = (raw: string) => {
    // Accept "CODE - Name" format or bare code
    const parts = raw.split(" - ");
    const candidate = parts[0].trim().toUpperCase();
    onChange(candidate);
  };

  // Display value: "CODE - Name" when matched, otherwise raw input
  const matched = stations.find(
    (s) => s.code.toUpperCase() === value.toUpperCase()
  );
  const displayValue = matched ? `${matched.code} - ${matched.name}` : value;

  return (
    <>
      <input
        id={id}
        ref={inputRef}
        type="text"
        list={listId}
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled || stations.length === 0}
        className="field"
        autoComplete="off"
      />
      <datalist id={listId}>
        {stations.map((s) => (
          <option key={s.code} value={`${s.code} - ${s.name}`} />
        ))}
      </datalist>
    </>
  );
}

export function SearchForm({
  value,
  onChange,
  trainInfo,
  trainLoading,
  trainError,
  availableClasses,
  classesLoading,
  classesError,
  analyzing,
  onAnalyze,
}: Props) {
  const set = (patch: Partial<FormValues>) => onChange({ ...value, ...patch });

  const stations = trainInfo?.stations ?? [];

  const canAnalyze =
    !analyzing &&
    trainInfo !== null &&
    value.classCode !== "" &&
    !trainLoading;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canAnalyze) onAnalyze();
      }}
      className="search-form"
    >
      {/* Row 1: Train number + class */}
      <div className="form-row">
        <div className="field-group" style={{ flex: 2 }}>
          <label htmlFor="train-number">Train Number</label>
          <input
            id="train-number"
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={value.trainNumber}
            onChange={(e) =>
              set({ trainNumber: e.target.value.replace(/\D/g, "").slice(0, 5) })
            }
            placeholder="e.g. 12951"
            disabled={analyzing}
            className="field"
          />
        </div>

        <div className="field-group" style={{ flex: 1 }}>
          <label htmlFor="class-code">
            Class{classesLoading && <span className="muted"> (loading…)</span>}
          </label>
          <select
            id="class-code"
            value={value.classCode}
            onChange={(e) => set({ classCode: e.target.value })}
            disabled={analyzing || classesLoading || !trainInfo}
            className="field"
          >
            <option value="">
              {classesLoading
                ? "Fetching classes…"
                : classesError
                  ? "Not available for this date"
                  : "Select class"}
            </option>
            {availableClasses !== null && availableClasses.length > 0
              ? availableClasses.map((code) => (
                  <option key={code} value={code}>
                    {CLASS_LABELS[code] ?? code}
                  </option>
                ))
              : (Object.entries(CLASS_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                )))}
          </select>
        </div>
      </div>

      {/* Train info feedback */}
      {trainLoading && (
        <p className="status-info">Fetching train information…</p>
      )}
      {trainError && !trainLoading && (
        <p className="status-error">{trainError}</p>
      )}
      {trainInfo && !trainLoading && (
        <div className="train-badge">
          <strong>{trainInfo.name}</strong>
          <span className="muted"> · {trainInfo.number}</span>
          {trainInfo.runsOnDays.length > 0 && (
            <span className="muted"> · Runs: {trainInfo.runsOnDays.join(", ")}</span>
          )}
          <span className="muted"> · {trainInfo.stations.length} stations</span>
        </div>
      )}
      {classesError && !classesLoading && trainInfo && !trainLoading && (
        <p className="status-error" role="alert">{classesError}</p>
      )}

      {/* Row 2: From / To */}
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="from-station">Journey From (optional)</label>
          <StationInput
            id="from-station"
            value={value.fromCode}
            onChange={(code) => set({ fromCode: code })}
            stations={stations}
            placeholder="e.g. NDLS"
            disabled={analyzing}
          />
        </div>
        <div className="field-group">
          <label htmlFor="to-station">Journey To (optional)</label>
          <StationInput
            id="to-station"
            value={value.toCode}
            onChange={(code) => set({ toCode: code })}
            stations={stations}
            placeholder="e.g. BCT"
            disabled={analyzing}
          />
        </div>
      </div>

      <p className="hint">
        {value.fromCode && value.toCode
          ? "Recommendation mode: will find every booking option that covers your journey."
          : "Full scan mode: will check every station pair on the route."}
      </p>

      <button
        type="submit"
        disabled={!canAnalyze}
        className="btn-primary"
      >
        {analyzing ? "Analyzing…" : "Analyze"}
      </button>
    </form>
  );
}

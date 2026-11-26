"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QuotaFetcher } from "./lib/core/quotaFetcher";
import { buildRecommendation } from "./lib/core/recommendation";
import {
  checkTatkalWindow,
  formatDateDisplay,
  formatDateForApi,
  getTomorrowDate,
  isTatkalSellingStarted,
  isTrainRunningOnDate,
} from "./lib/core/dateUtils";
import {
  detectOvernightMismatch,
  findStation,
  generateAllCombinations,
  generateCoveringCombinations,
} from "./lib/core/stationUtils";
import {
  addHistoryEntry,
  clearAllHistory,
  loadHistory,
  removeHistoryEntry,
} from "./lib/history";
import type {
  AnalysisResult,
  FetchProgress,
  HistoryEntry,
  TrainInfo,
} from "./lib/services/types";
import type { RecommendationResult } from "./lib/core/recommendation";
import { SearchForm, type FormValues } from "./components/SearchForm";
import { StatusLog } from "./components/StatusLog";
import { ResultsTable } from "./components/ResultsTable";
import { RecommendationPanel } from "./components/RecommendationPanel";
import { HistoryList } from "./components/HistoryList";
import { WarningDialog } from "./components/WarningDialog";

// ── Constants ────────────────────────────────────────────────────────────────

const EMPTY_FORM: FormValues = {
  trainNumber: "",
  classCode: "",
  fromCode: "",
  toCode: "",
};

// ── Fetch available classes (module-level to avoid deep nesting) ──────────────

interface FetchClassesParams {
  trainNumber: string;
  srcStn: string;
  destStn: string;
  journeyDate: string;
  signal: AbortSignal;
  onResult: (result: { classes: string[]; error: string | null }) => void;
  onDone: () => void;
}

/** Turns IRCTC altAvlEnq error text into a short, user-facing message. */
function formatIrctcClassesError(raw: string): string {
  const msg = raw.trim();
  if (/no direct trains available/i.test(msg)) {
    return (
      "This train is not available for Tatkal booking on the selected date. " +
      "It may not be running on this day — check the schedule and try another date."
    );
  }
  return msg;
}

function fetchAvailableClasses(params: FetchClassesParams): void {
  const { trainNumber, srcStn, destStn, journeyDate, signal, onResult, onDone } = params;

  void fetch(
    "https://www.irctc.co.in/eticketing/protected/mapps1/altAvlEnq/TC",
    {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        bmirak: "webbm",
        "content-language": "en",
        "content-type": "application/json; charset=UTF-8",
        greq: "1",
        origin: "https://www.irctc.co.in",
        referer: "https://www.irctc.co.in/nget/booking/train-list",
      },
      credentials: "include",
      body: JSON.stringify({
        srcStn,
        destStn,
        jrnyClass: "",
        jrnyDate: journeyDate,
        quotaCode: "TQ",
        currentBooking: "false",
        flexiFlag: false,
        handicapFlag: false,
        ticketType: "E",
        loyaltyRedemptionBooking: false,
        ftBooking: false,
      }),
      signal,
    }
  )
    .then(async (res) => {
      if (!res.ok) {
        onResult({
          classes: [],
          error: "Could not fetch available classes from IRCTC.",
        });
        return;
      }
      const data = await res.json() as {
        errorMessage?: string;
        trainBtwnStnsList?: Array<{ trainNumber?: string; avlClasses?: string[] }>;
      };

      if (data.errorMessage?.trim()) {
        onResult({
          classes: [],
          error: formatIrctcClassesError(data.errorMessage),
        });
        return;
      }

      const match = data.trainBtwnStnsList?.find((t) => t.trainNumber === trainNumber);
      const classes = match?.avlClasses ?? [];

      // No matching train (or no bookable classes) means this train isn't
      // open for Tatkal booking on the selected date.
      if (!match || classes.length === 0) {
        onResult({
          classes: [],
          error:
            "This train is not available for Tatkal booking on the selected date. " +
            "It may not run on this day — check the schedule and try another date.",
        });
        return;
      }

      onResult({ classes, error: null });
    })
    .catch(() => {
      onResult({
        classes: [],
        error: "Could not fetch available classes from IRCTC.",
      });
    })
    .finally(() => { onDone(); });
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function Home() {
  // Form state
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);

  // Train-fetch state
  const [trainInfo, setTrainInfo] = useState<TrainInfo | null>(null);
  const [trainLoading, setTrainLoading] = useState(false);
  const [trainError, setTrainError] = useState<string | null>(null);

  // Available classes (fetched live from IRCTC after train info resolves)
  const [availableClasses, setAvailableClasses] = useState<string[] | null>(null);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState<string | null>(null);

  // Analysis state
  const [analyzing, setAnalyzing] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [progress, setProgress] = useState<FetchProgress | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Warning/dialog state
  const [pendingWarning, setPendingWarning] = useState<string | null>(null);
  // Ref-based flag so the "confirmed" path in runAnalysis never needs
  // setState in an effect or a self-reference in useCallback.
  const skipWindowCheckRef = useRef(false);

  // History
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Abort ref
  const abortRef = useRef<AbortController | null>(null);

  // Load history on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadHistory());
  }, []);

  // ── Train auto-fetch (debounced) ────────────────────────────────────────
  useEffect(() => {
    const number = form.trainNumber.trim();
    const controller = new AbortController();

    const run = async () => {
      if (!number || !/^\d{4,5}$/.test(number)) {
        setTrainInfo(null);
        setAvailableClasses(null);
        setClassesError(null);
        setClassesLoading(false);
        setTrainError(
          number.length >= 4 && !/^\d{4,5}$/.test(number)
            ? "Enter a valid 4–5 digit train number."
            : null
        );
        setTrainLoading(false);
        return;
      }

      setTrainLoading(true);
      setTrainError(null);
      setTrainInfo(null);

      try {
        // Get journeyDate from the server (server knows tomorrow's date reliably)
        const metaRes = await fetch(`/api/train?number=${number}`, {
          signal: controller.signal,
        });
        const meta = await metaRes.json();
        if (!metaRes.ok) throw new Error(meta.error ?? `HTTP ${metaRes.status}`);

        // Browser calls IRCTC directly — uses the user's own session cookies,
        // goes through the browser's network stack (not the McAfee server proxy).
        const irctcUrl =
          `https://www.irctc.co.in/eticketing/protected/mapps1/trnscheduleenquiry` +
          `/${number}?journeyDate=${meta.journeyDate as string}`;

        const irctcRes = await fetch(irctcUrl, {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            bmirak: "webbm",
            "content-language": "en",
            greq: "1",
            referer: "https://www.irctc.co.in/nget/booking/train-list",
          },
          credentials: "include",
          signal: controller.signal,
        });

        if (!irctcRes.ok) {
          throw new Error(`IRCTC returned HTTP ${irctcRes.status}. Are you logged in to IRCTC?`);
        }

        // ── IRCTC response types ──────────────────────────────────────
        interface IrctcStation {
          stationCode: string;
          stationName: string;
          arrivalTime: string;
          departureTime: string;
          distance: string;
          dayCount: string;
          stnSerialNumber: string;
        }
        interface IrctcTrainResponse {
          trainNumber?: string;
          trainName?: string;
          stationFrom?: string;
          stationTo?: string;
          stationList?: IrctcStation[];
          trainRunsOnMon?: string;
          trainRunsOnTue?: string;
          trainRunsOnWed?: string;
          trainRunsOnThu?: string;
          trainRunsOnFri?: string;
          trainRunsOnSat?: string;
          trainRunsOnSun?: string;
          errorMessage?: string;
          // Some versions nest under trainScheduleDto, handle both
          trainScheduleDto?: IrctcTrainResponse;
        }
        // ─────────────────────────────────────────────────────────────

        const raw: IrctcTrainResponse = await irctcRes.json();

        // IRCTC returns data either at root or nested under trainScheduleDto
        const dto: IrctcTrainResponse = raw.trainScheduleDto ?? raw;

        if (!dto.stationList || dto.stationList.length < 2) {
          throw new Error(
            dto.errorMessage ??
              "No station data returned by IRCTC. Please make sure you are logged in to irctc.co.in."
          );
        }

        const dayMap: Record<string, keyof IrctcTrainResponse> = {
          Mon: "trainRunsOnMon",
          Tue: "trainRunsOnTue",
          Wed: "trainRunsOnWed",
          Thu: "trainRunsOnThu",
          Fri: "trainRunsOnFri",
          Sat: "trainRunsOnSat",
          Sun: "trainRunsOnSun",
        };
        const runsOnDays = Object.entries(dayMap)
          .filter(([, key]) => (dto[key] as string | undefined)?.toUpperCase() === "Y")
          .map(([label]) => label);

        const train: TrainInfo = {
          number: String(dto.trainNumber ?? number).trim(),
          name: String(dto.trainName ?? `Train ${number}`).trim(),
          runsOnDays,
          stations: dto.stationList.map((s, idx) => ({
            code: s.stationCode.trim().toUpperCase(),
            name: s.stationName.trim(),
            arrivalTime:
              !s.arrivalTime || s.arrivalTime === "--" || s.arrivalTime === "None"
                ? "--"
                : s.arrivalTime.trim(),
            departureTime:
              !s.departureTime || s.departureTime === "--" || s.departureTime === "None"
                ? "--"
                : s.departureTime.trim(),
            dayCount: Number(s.dayCount) || 1,
            distanceKm: Number.parseInt(s.distance ?? "0", 10) || 0,
            serialNumber: Number(s.stnSerialNumber) || idx + 1,
          })),
        };

        setTrainInfo(train);
        setTrainError(null);
        setAvailableClasses(null);
        setClassesError(null);
        setForm((f) => ({
          ...f,
          fromCode: findStation(train.stations, f.fromCode) ? f.fromCode : "",
          toCode: findStation(train.stations, f.toCode) ? f.toCode : "",
          // Reset class since available classes will change
          classCode: "",
        }));

        // ── Fetch available classes for this train from IRCTC ──────────
        // Uses stationFrom/stationTo from the schedule response to query
        // altAvlEnq/TC, then matches on trainNumber to get avlClasses.
        const srcStn = String(raw.stationFrom ?? "").trim().toUpperCase();
        const destStn = String(raw.stationTo ?? "").trim().toUpperCase();

        if (srcStn && destStn) {
          setClassesLoading(true);
          fetchAvailableClasses({
            trainNumber: number,
            srcStn,
            destStn,
            journeyDate: meta.journeyDate as string,
            signal: controller.signal,
            onResult: ({ classes, error }) => {
              setAvailableClasses(classes);
              setClassesError(error);
              if (classes.length > 0) {
                setForm((f) => ({ ...f, classCode: classes[0] }));
              }
            },
            onDone: () => setClassesLoading(false),
          });
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setTrainError(err instanceof Error ? err.message : "Could not fetch train.");
        setTrainInfo(null);
        setAvailableClasses(null);
        setClassesError(null);
        setClassesLoading(false);
      } finally {
        setTrainLoading(false);
      }
    };

    const timer = setTimeout(run, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [form.trainNumber]);

  // ── Log helper ──────────────────────────────────────────────────────────
  const addLog = useCallback((line: string) => {
    setLog((prev) => [...prev, line]);
  }, []);

  // ── Core analysis routine ────────────────────────────────────────────────
  const runAnalysis = useCallback(
    async () => {
      if (!trainInfo || !form.classCode) return;

      const originDate = getTomorrowDate();
      const originDateStr = formatDateForApi(originDate);
      const originDateDisplay = formatDateDisplay(originDate);

      // ── 1. Tatkal time window check ────────────────────────────────────
      // skipWindowCheckRef is set by the warning-dialog onContinue handler
      // before this function is called, so reading it here is safe.
      if (!skipWindowCheckRef.current) {
        const windowStatus = checkTatkalWindow();
        if (!windowStatus.inWindow) {
          setPendingWarning(windowStatus.warning);
          return;
        }
      }
      skipWindowCheckRef.current = false;
      setPendingWarning(null);

      // ── 2. Train running on date check ─────────────────────────────────
      if (!isTrainRunningOnDate(trainInfo, originDate)) {
        setAnalysisError(
          `This train does not run on ${originDateDisplay} ` +
            `(${originDate.toLocaleDateString(undefined, { weekday: "long" })}). ` +
            `Check the schedule and try the next valid date.`
        );
        return;
      }

      // ── 3. Overnight mismatch check (when From is specified) ───────────
      if (form.fromCode) {
        const fromSt = findStation(trainInfo.stations, form.fromCode);
        if (fromSt) {
          const mismatch = detectOvernightMismatch(fromSt, originDate);
          if (mismatch) {
            setAnalysisError(mismatch.message);
            return;
          }
        }
      }

      // ── 4. Build combinations ──────────────────────────────────────────
      setAnalyzing(true);
      setAnalysisResult(null);
      setRecommendation(null);
      setAnalysisError(null);
      setLog([]);
      setProgress(null);

      addLog(`Train: ${trainInfo.name} (${trainInfo.number})`);
      addLog(`Date: ${originDateDisplay}`);
      addLog(`Class: ${form.classCode}`);
      addLog(`Fetching station combinations…`);

      const hasJourney = form.fromCode && form.toCode;
      let combinations;

      if (hasJourney) {
        const result = generateCoveringCombinations(
          trainInfo.stations,
          form.fromCode,
          form.toCode,
          originDate
        );
        if ("error" in result) {
          setAnalysisError(result.error);
          setAnalyzing(false);
          return;
        }
        combinations = result;
        addLog(
          `Mode: Recommendation (covering ${form.fromCode} → ${form.toCode})`
        );
      } else {
        combinations = generateAllCombinations(trainInfo.stations, originDate);
        addLog(`Mode: Full route scan`);
      }

      addLog(`Generated ${combinations.length} combinations.`);

      if (combinations.length === 0) {
        setAnalysisError("No valid combinations could be generated for the given inputs.");
        setAnalyzing(false);
        return;
      }

      // ── 5. Fetch quotas ────────────────────────────────────────────────
      const controller = new AbortController();
      abortRef.current = controller;

      const fetcher = new QuotaFetcher({
        timeoutMs: 30_000,
        // concurrency, retries, backoffMs: reserved for future use
      });

      const onProgress = (p: FetchProgress) => {
        setProgress(p);
        setLog((prev) => {
          const next = [...prev];
          const last = next[next.length - 1] ?? "";
          const progressLine = `Checking ${p.completed} of ${p.total} — ${p.current}`;
          // Replace the last progress line rather than appending every tick
          if (last.startsWith("Checking ")) {
            next[next.length - 1] = progressLine;
          } else {
            next.push(progressLine);
          }
          return next;
        });
      };

      // Seed the loader so the progress bar appears immediately at 0%.
      setProgress({ total: combinations.length, completed: 0, current: "Starting…" });

      try {
        const results = await fetcher.fetchAll(
          trainInfo.number,
          combinations,
          form.classCode,
          controller.signal,
          onProgress
        );

        const failed = results.filter((r) => r.error !== null).length;
        addLog(
          `Done. ${results.length} combinations · ${results.length - failed} succeeded · ${failed} failed.`
        );

        const result: AnalysisResult = {
          trainInfo,
          originDateStr,
          classCode: form.classCode,
          combinations: results,
          requestedFromCode: form.fromCode || null,
          requestedToCode: form.toCode || null,
        };
        setAnalysisResult(result);

        // Recommendation
        if (form.fromCode && form.toCode) {
          setRecommendation(
            buildRecommendation(results, form.fromCode, form.toCode)
          );
        }

        // Save history
        const entry: HistoryEntry = {
          id: `${trainInfo.number}-${form.classCode}-${originDateStr}-${Date.now()}`,
          timestamp: Date.now(),
          trainNumber: trainInfo.number,
          trainName: trainInfo.name,
          originDateStr,
          classCode: form.classCode,
          fromCode: form.fromCode || null,
          toCode: form.toCode || null,
          combinationCount: results.length,
        };
        setHistory(addHistoryEntry(entry));
      } catch (err) {
        if (controller.signal.aborted) {
          addLog("Analysis cancelled.");
        } else {
          const msg = err instanceof Error ? err.message : "Analysis failed.";
          setAnalysisError(msg);
          addLog(`Error: ${msg}`);
        }
      } finally {
        setAnalyzing(false);
        setProgress(null);
        abortRef.current = null;
      }
    },
    [trainInfo, form, addLog]
  );

  const handleCancel = () => {
    abortRef.current?.abort();
  };

  const handleRestoreHistory = (entry: HistoryEntry) => {
    setForm((f) => ({
      ...f,
      trainNumber: entry.trainNumber,
      classCode: entry.classCode,
      fromCode: entry.fromCode ?? "",
      toCode: entry.toCode ?? "",
    }));
    setAnalysisResult(null);
    setRecommendation(null);
    setAnalysisError(null);
    setLog([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Derived display values ───────────────────────────────────────────────
  const originDate = getTomorrowDate();
  const originDateDisplay = formatDateDisplay(originDate);

  return (
    <>
      {/* Warning dialog */}
      {pendingWarning && (
        <WarningDialog
          message={pendingWarning}
          onContinue={() => {
            // Set the ref before dismissing so runAnalysis skips the check
            skipWindowCheckRef.current = true;
            setPendingWarning(null);
            void runAnalysis();
          }}
          onCancel={() => {
            setPendingWarning(null);
          }}
        />
      )}

      {/* Header */}
      <header className="app-header">
        <div>
          <h1>Tatkal Quota Analyzer</h1>
          <p>
            Analyze Tatkal and Premium Tatkal allocations across every station pair.
            Analyzing for: <strong>{originDateDisplay}</strong>
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="app-main">
        {/* Search form */}
        <SearchForm
          value={form}
          onChange={setForm}
          trainInfo={trainInfo}
          trainLoading={trainLoading}
          trainError={trainError}
          availableClasses={availableClasses}
          classesLoading={classesLoading}
          classesError={classesError}
          analyzing={analyzing}
          onAnalyze={() => void runAnalysis()}
        />

        {/* Analysis error */}
        {analysisError && (
          <div className="error-banner" role="alert">
            {analysisError}
          </div>
        )}

        {/* Processing log */}
        <StatusLog lines={log} analyzing={analyzing} progress={progress} onCancel={handleCancel} />

        {/* Results */}
        {analysisResult && (
          <ResultsTable
            results={analysisResult.combinations}
            trainName={analysisResult.trainInfo.name}
            trainNumber={analysisResult.trainInfo.number}
            classCode={analysisResult.classCode}
            dateDisplay={formatDateDisplay(originDate)}
            availableOnly={isTatkalSellingStarted()}
          />
        )}

        {/* Recommendation */}
        {recommendation &&
          analysisResult?.requestedFromCode &&
          analysisResult?.requestedToCode && (
            <RecommendationPanel
              recommendation={recommendation}
              requestedFrom={analysisResult.requestedFromCode}
              requestedTo={analysisResult.requestedToCode}
            />
          )}

        {/* History */}
        <HistoryList
          entries={history}
          onRestore={handleRestoreHistory}
          onDelete={(id) => setHistory(removeHistoryEntry(id))}
          onClear={() => setHistory(clearAllHistory())}
        />
      </main>
    </>
  );
}

// ── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tqa-theme", next); } catch { /* ignore */ }
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      <span className="theme-label-dark">☀ Light</span>
      <span className="theme-label-light">☾ Dark</span>
    </button>
  );
}

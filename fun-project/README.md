# Tatkal Quota Analyzer

A clean, minimal web application that analyzes **Tatkal (TQ)** and **Premium Tatkal (PT)** seat allocations for Indian Railway trains across every source→destination pair on a route — and recommends better booking segments when applicable.

## Features

- **Dynamic date** — automatically analyzes for tomorrow's date; no date picker needed
- **Full route scan** — enter only a train number to check every possible S→D pair
- **Recommendation mode** — enter From + To to find the best-quota booking that covers your journey
- **Overnight train detection** — warns when your boarding station is reached on a different calendar day
- **Tatkal time window** — warns if the current time is outside 01:00–09:50 AM (when initial Tatkal allocation is visible)
- **Compressed results** — consecutive rows with identical quotas are collapsed; expand to see all
- **Dark mode** — system preference + manual toggle, no flash on load
- **Search history** — saved to localStorage, restore any past analysis in one click

## Architecture

```
UI (app/page.tsx + app/components/)
    ↓  calls
Business Logic (app/lib/core/)
    ↓  calls /api/* routes
API Route Handlers (app/api/)
    ↓  calls
Rail Service Adapter (app/lib/services/railAdapter.ts)
    ↓  calls
External API (indianrailapi.com or any provider)
```

The UI and business logic never call external APIs directly. Swapping the data provider requires only editing `railAdapter.ts` — nothing else changes.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run

```bash
npm run dev        # development
npm run build      # production build
npm run start      # production server
```

No environment variables are required. Just make sure you are **logged in to
irctc.co.in** in the same browser before running an analysis.

## Data source — IRCTC (direct, browser-side)

This app talks to IRCTC directly. No third-party API key or `RAIL_API_BASE_URL`
is required. Because the relevant endpoints live under `/eticketing/protected/`,
they need the user's **logged-in IRCTC session cookies** — so those calls are
made from the **browser** (`credentials: "include"`), not from the Next.js
server. **You must be signed in to irctc.co.in in the same browser** for analysis
to work.

Endpoints used:

- **Train schedule** (browser): `GET /eticketing/protected/mapps1/trnscheduleenquiry/{number}?journeyDate={YYYYMMDD}`
- **Available classes** (browser): `POST /eticketing/protected/mapps1/altAvlEnq/TC`
- **Seat availability** (browser): `POST /eticketing/protected/mapps1/avlFarenquiry/{number}/{YYYYMMDD}/{from}/{to}/{class}/{TQ|PT}/N`

`GET /api/train` is the only server route — it just returns tomorrow's
`journeyDate` (`YYYYMMDD`) so the browser never has to reason about timezones.

The availability response's `avlDayList[].availablityStatus` is parsed into a
seat count (`AVAILABLE-0015` → 15, `WL/REGRET/RAC` → 0, `NOT AVAILABLE` → null)
for the row whose `availablityDate` matches the requested journey date.

## File structure

```
app/
  lib/
    services/
      types.ts          — shared data contracts (TrainInfo, QuotaAvailability, etc.)
      irctcQuota.ts     — browser-side IRCTC availability client (avlFarenquiry)
    core/
      dateUtils.ts      — tomorrow's date (YYYYMMDD), Tatkal window check, day-of-week check
      stationUtils.ts   — combination generation, overnight mismatch detection
      quotaFetcher.ts   — orchestrator: bounded concurrency pool, fetches TQ + PT
      recommendation.ts — finds best-quota alternative booking (Tatkal, then PT)
    history.ts          — localStorage read/write helpers
  api/
    train/route.ts      — GET /api/train?number= (returns tomorrow's journeyDate)
  components/
    SearchForm.tsx      — 3-field form with live train validation
    StatusLog.tsx       — plain-text processing log with cancel button
    ResultsTable.tsx    — compressed quota table with expand toggle
    RecommendationPanel.tsx — concise recommendation with best alternative stats
    HistoryList.tsx     — past analyses with restore / delete
    WarningDialog.tsx   — modal for Tatkal window and overnight warnings
  globals.css           — minimal CSS with dark/light theme tokens
  layout.tsx            — flash-free theme initialization
  page.tsx              — main orchestrator
```

## Rate-limiting / throttling

`QuotaFetcher` runs requests through a bounded **concurrency pool** (default 4)
to avoid tripping IRCTC's bot protection on long routes. Tune it via the
`concurrency` option; `retries` and `backoffMs` are accepted and reserved for a
future retry implementation. `timeoutMs` (default 30 000) is enforced per
request.

"use client";

import type { RecommendationResult } from "../lib/core/recommendation";

interface Props {
  recommendation: RecommendationResult;
  requestedFrom: string;
  requestedTo: string;
}

export function RecommendationPanel({
  recommendation,
  requestedFrom,
  requestedTo,
}: Props) {
  const { requested, bestAlternative, message } = recommendation;

  return (
    <div className="recommendation-section">
      <h3>Recommendation — {requestedFrom} → {requestedTo}</h3>

      {/* Requested journey stats */}
      {requested?.quota && (
        <div className="reco-requested">
          <span className="muted">Your journey:</span>{" "}
          <strong>{requested.fromCode} → {requested.toCode}</strong>
          <span className="muted"> · Tatkal: </span>
          <strong>{requested.quota.tatkal ?? "—"}</strong>
          <span className="muted"> · Premium Tatkal: </span>
          <strong>{requested.quota.premiumTatkal ?? "—"}</strong>
        </div>
      )}

      {/* Main recommendation message */}
      <div className={bestAlternative ? "reco-box reco-better" : "reco-box reco-same"}>
        {message}
      </div>

      {/* Best alternative details */}
      {bestAlternative?.quota && (
        <div className="reco-alt">
          <div className="reco-alt-row">
            <span className="reco-label">Best option</span>
            <strong>{bestAlternative.fromCode} → {bestAlternative.toCode}</strong>
            <span className="muted"> ({bestAlternative.fromName} → {bestAlternative.toName})</span>
          </div>
          <div className="reco-alt-row">
            <span className="reco-label">Tatkal seats</span>
            <strong>{bestAlternative.quota.tatkal ?? "—"}</strong>
            {requested?.quota?.tatkal != null &&
              bestAlternative.quota.tatkal != null && (
                <span className="seats-ok">
                  {" "}(+{bestAlternative.quota.tatkal - (requested.quota.tatkal ?? 0)} more)
                </span>
              )}
          </div>
          <div className="reco-alt-row">
            <span className="reco-label">Premium Tatkal</span>
            <strong>{bestAlternative.quota.premiumTatkal ?? "—"}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

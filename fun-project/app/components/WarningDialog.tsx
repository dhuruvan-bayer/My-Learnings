"use client";

interface Props {
  message: string;
  onContinue: () => void;
  onCancel: () => void;
}

export function WarningDialog({ message, onContinue, onCancel }: Props) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog" role="alertdialog" aria-modal="true">
        <h3>⚠ Warning</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onContinue}>
            Continue anyway
          </button>
        </div>
      </div>
    </div>
  );
}

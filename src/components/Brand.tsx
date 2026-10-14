import React from "react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <div className="brand-mark">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 4C12.3 4 6 10.1 6 17.7c0 8.8 10.6 16.4 13.1 18.1.5.3 1.2.3 1.7 0C23.4 34 34 26.5 34 17.7 34 10.1 27.7 4 20 4Z" />
          <path d="m14.5 18.5 3.8 3.8 7.7-8" />
          <path d="M26.5 27.5c2.2-.1 4.1.6 5.5 2.2-3 .6-5.5-.1-7-2" />
        </svg>
      </div>
      {!compact && (
        <div>
          <strong>EncuentraQ</strong>
          <span>El Quindío se ayuda</span>
        </div>
      )}
    </div>
  );
}

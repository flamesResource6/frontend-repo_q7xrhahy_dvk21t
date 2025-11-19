import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Insights() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/summary`).then(r => r.json()).then(setSummary);
  }, []);

  return (
    <section id="insights" className="bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-white text-2xl font-semibold">14‑day insights</h2>
            <div className="text-blue-200/80 text-sm">Medical‑grade clarity, friendly tone</div>
          </div>

          {!summary && <div className="text-blue-200/70 mt-4">Loading…</div>}
          {summary && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-blue-300 text-xs">Average</div>
                <div className="text-white text-2xl font-semibold">{summary.avg_mgdl ?? '—'} mg/dL</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-blue-300 text-xs">Time in range</div>
                <div className="text-white text-2xl font-semibold">{summary.time_in_range_pct ?? '—'}%</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-blue-300 text-xs">Readings</div>
                <div className="text-white text-2xl font-semibold">{summary.count_readings}</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-blue-300 text-xs">Window</div>
                <div className="text-white text-2xl font-semibold">{summary.days} days</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

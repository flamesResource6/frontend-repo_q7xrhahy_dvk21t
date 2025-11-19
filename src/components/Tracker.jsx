import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Stat({ label, value, suffix }) {
  return (
    <div className="flex-1 rounded-xl bg-white/5 border border-blue-500/20 p-4">
      <div className="text-blue-300 text-xs">{label}</div>
      <div className="text-white text-2xl font-semibold mt-1">
        {value ?? '—'}{suffix}
      </div>
    </div>
  );
}

export default function Tracker() {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState('manual');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchData = async () => {
    const [g, s] = await Promise.all([
      fetch(`${API_BASE}/api/glucose?limit=30&days=14`).then(r => r.json()),
      fetch(`${API_BASE}/api/summary`).then(r => r.json()),
    ]);
    setData(g.items || []);
    setSummary(s);
  };

  useEffect(() => { fetchData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!value) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/glucose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          value_mgdl: Number(value),
          mode,
          note: note || undefined,
        }),
      });
      setValue('');
      setNote('');
      await fetchData();
    } finally { setLoading(false); }
  };

  const stats = useMemo(() => ({
    avg: summary?.avg_mgdl,
    min: summary?.min_mgdl,
    max: summary?.max_mgdl,
    tir: summary?.time_in_range_pct,
  }), [summary]);

  return (
    <section id="tracker" className="bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-white text-2xl font-semibold">Quick glucose entry</h2>
            <p className="text-blue-200/80 text-sm mt-1">Fast, precise, and supportive — add a reading in seconds.</p>

            <form onSubmit={submit} className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="number"
                min="20" max="600" step="1"
                className="rounded-xl bg-white/10 text-white placeholder-blue-200/60 px-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="mg/dL"
                value={value}
                onChange={e => setValue(e.target.value)}
                required
              />
              <select
                className="rounded-xl bg-white/10 text-white px-4 py-3 border border-white/10 focus:outline-none"
                value={mode}
                onChange={e => setMode(e.target.value)}
              >
                <option value="manual">Manual</option>
                <option value="cgm">CGM</option>
              </select>
              <button disabled={loading} className="rounded-xl bg-blue-500 hover:bg-blue-400 transition text-white px-4 py-3 font-medium">
                {loading ? 'Saving…' : 'Save reading'}
              </button>
              <input
                type="text"
                className="sm:col-span-3 rounded-xl bg-white/10 text-white placeholder-blue-200/60 px-4 py-3 border border-white/10 focus:outline-none"
                placeholder="Optional note (e.g., before dinner)"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </form>

            <div className="mt-6 flex gap-3">
              <Stat label="Average" value={stats.avg?.toFixed?.(1)} suffix=" mg/dL" />
              <Stat label="Range" value={stats.min != null && stats.max != null ? `${stats.min}–${stats.max}` : '—'} />
              <Stat label="In Range" value={stats.tir?.toFixed?.(1)} suffix="%" />
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-5">
            <h3 className="text-white font-medium">Recent readings</h3>
            <div className="mt-3 grid gap-2 max-h-[320px] overflow-auto pr-2">
              {data.length === 0 && (
                <div className="text-blue-200/70 text-sm">No readings yet. Add your first above.</div>
              )}
              {data.map((r) => (
                <div key={r._id} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2">
                  <div>
                    <div className="text-white font-medium">{r.value_mgdl} mg/dL</div>
                    <div className="text-blue-200/70 text-xs">{new Date(r.timestamp).toLocaleString()} • {r.mode}</div>
                  </div>
                  {r.note && <div className="text-blue-200/80 text-sm">{r.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Medical-grade clarity • Human warmth
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Diabetes care that feels simple, supportive, and smart
          </h1>
          <p className="mt-4 text-blue-200/90 text-lg leading-relaxed">
            Track glucose, meals, medication, and activity in one calming place. Get clear insights, gentle reminders, and a path that motivates daily progress.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#tracker" className="px-5 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition shadow-lg shadow-blue-500/20">
              Start tracking
            </a>
            <a href="#insights" className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition">
              See insights
            </a>
          </div>
        </div>
        <div className="lg:block hidden" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/60 to-slate-950" />
    </section>
  );
}

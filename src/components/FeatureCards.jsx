import { Activity, Apple, Bell, Droplets, FileChartColumn, Pill, Utensils } from 'lucide-react';

const features = [
  {
    icon: Droplets,
    title: 'Glucose Monitor',
    desc: 'Trends, highs/lows, and time-in-range with CGM or manual entry.'
  },
  {
    icon: Utensils,
    title: 'Food & Nutrition',
    desc: 'Meal logging with macro insights and post-meal impact graphs.'
  },
  {
    icon: Pill,
    title: 'Medication Tracker',
    desc: 'Track insulin/oral meds, dosage patterns, and response over time.'
  },
  {
    icon: Activity,
    title: 'Activity Tracking',
    desc: 'Sync movement, see calorie burn and its effect on glucose.'
  },
  {
    icon: Bell,
    title: 'Reminders & Motivation',
    desc: 'Gentle nudges, streaks, and limits for the free plan.'
  },
  {
    icon: FileChartColumn,
    title: 'Insights & Reports',
    desc: '14‑day trends, AI insights, and export for your care team.'
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-slate-950 py-16" id="features">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">What you can do</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-blue-500/20 bg-white/5 p-5 text-blue-100 hover:bg-white/10 transition">
              <Icon className="w-6 h-6 text-blue-300" />
              <h3 className="mt-3 text-white font-medium">{title}</h3>
              <p className="mt-1 text-sm text-blue-200/80">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import Tracker from './components/Tracker';
import Insights from './components/Insights';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <FeatureCards />
      <Tracker />
      <Insights />
      <footer className="bg-slate-950 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center text-blue-300/70 text-sm">
          Health first • Simplicity second • Motivation third
        </div>
      </footer>
    </div>
  );
}

export default App

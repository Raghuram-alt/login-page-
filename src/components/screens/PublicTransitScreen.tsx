import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_PUBLIC_TRANSIT } from '../../data/publicTransitData';
import {
  Bus,
  TramFront,
  Train,
  Clock,
  IndianRupee,
  Users,
  Accessibility,
  CheckCircle,
  AlertCircle,
  Navigation,
  Sparkles,
} from 'lucide-react';

export const PublicTransitScreen: React.FC = () => {
  const { setCurrentScreen, startNavigation } = useMobility();
  const [activeTab, setActiveTab] = useState<'bus' | 'metro' | 'train'>('bus');

  const transitItems = DEMO_PUBLIC_TRANSIT.filter((item) => item.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Bus size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Unified Public Transit Hub
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Bus • Metro • Railway Schedules</h1>
        <p className="text-xs text-slate-400">
          Live simulated arrivals, occupancy analytics, fares, and step-free accessibility indicators.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 mt-5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('bus')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'bus'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bus size={15} />
            <span>City & Express Buses ({DEMO_PUBLIC_TRANSIT.filter((t) => t.type === 'bus').length})</span>
          </button>
          <button
            onClick={() => setActiveTab('metro')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'metro'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TramFront size={15} />
            <span>Coastal Metro ({DEMO_PUBLIC_TRANSIT.filter((t) => t.type === 'metro').length})</span>
          </button>
          <button
            onClick={() => setActiveTab('train')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'train'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Train size={15} />
            <span>Indian Railways ({DEMO_PUBLIC_TRANSIT.filter((t) => t.type === 'train').length})</span>
          </button>
        </div>
      </div>

      {/* Section 32: AI Crowd Prediction Component */}
      <div className="glass-panel p-5 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-slate-900/90 to-indigo-950/20">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sparkles size={16} />
            </span>
            <span className="text-xs font-bold text-white">AI Crowd Density Predictor</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
            Historical ML Model
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Current Occupancy</span>
            <span className="text-base font-bold text-amber-400 mt-1 block">Moderate (54%)</span>
            <span className="text-[10px] text-slate-500">Seating available in rear coach</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Predicted at 05:30 PM Peak</span>
            <span className="text-base font-bold text-red-400 mt-1 block">High Surge (88%)</span>
            <span className="text-[10px] text-slate-500">Board early to secure seats</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">AI Recommendation</span>
            <span className="text-base font-bold text-emerald-400 mt-1 block">Take Train 20834</span>
            <span className="text-[10px] text-slate-500">Least crowded corridor link</span>
          </div>
        </div>
      </div>

      {/* Transit Lines Cards */}
      <div className="space-y-4">
        {transitItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {item.routeCode}
                  </span>
                  <span className="text-xs text-slate-400">Current Station: {item.currentStation}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{item.name}</h3>
                <div className="text-xs text-slate-300">Destination: {item.destination}</div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {item.arrivalMinutes} min
                </div>
                <div className="text-[10px] font-bold uppercase text-emerald-500">{item.status}</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Standard Fare</span>
                <span className="text-sm font-bold text-white">₹{item.fare}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Crowd Level</span>
                <span className="text-sm font-bold text-amber-400 capitalize">{item.crowdLevel}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Accessibility</span>
                <span className="text-sm font-bold text-blue-400">Step-Free / Ramp</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">GPS Tracking</span>
                <span className="text-sm font-bold text-emerald-400">Live (Simulated)</span>
              </div>
            </div>

            {/* Next Stops */}
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                Next Upcoming Stops:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {item.nextStops.map((stop, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                  >
                    {stop}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setCurrentScreen('planner')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Plan Route With This Service</span>
                <Navigation size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

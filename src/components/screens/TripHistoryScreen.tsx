import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  History,
  Clock,
  IndianRupee,
  Leaf,
  Calendar,
  Filter,
  CheckCircle,
  TrendingDown,
  Sparkles,
  MapPin,
  Car,
  Bike,
  Bus,
  Train,
  Zap,
} from 'lucide-react';
import { TravelMode } from '../../types/mobility';

export const TripHistoryScreen: React.FC = () => {
  const { tripHistory } = useMobility();
  const [filterMode, setFilterMode] = useState<string>('all');

  const filtered = tripHistory.filter((t) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'green') return t.emissionsLabel === 'Low';
    if (filterMode === 'multimodal') return t.mode === 'multimodal';
    return t.mode === filterMode;
  });

  const totalSavedHours = (tripHistory.reduce((acc, t) => acc + (t.savedMinutes || 5), 0) / 60).toFixed(1);
  const totalCost = tripHistory.reduce((acc, t) => acc + t.cost, 0);
  const totalCarbon = tripHistory.reduce((acc, t) => acc + t.carbonKg, 0).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <History size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Travel Memory & Analytics
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Trip History & Commute Diary</h1>
        <p className="text-xs text-slate-400">
          Past route itineraries, financial breakdown, carbon offset savings, and AI efficiency records.
        </p>
      </div>

      {/* Section 48: Trip Diary / Monthly Insights Summary */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-900/90 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Travel Diary • Cumulative Summary
            </h2>
          </div>
          <span className="text-xs text-indigo-300 font-semibold">Active Profile Lifetime</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400">Completed Trips</span>
            <div className="text-2xl font-black text-white mt-1 font-mono">{tripHistory.length}</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">100% On-time Arrival</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400">Time Saved by AI</span>
            <div className="text-2xl font-black text-blue-400 mt-1 font-mono">{totalSavedHours} hrs</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Congestion avoidance</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400">Cumulative Spend</span>
            <div className="text-2xl font-black text-amber-300 mt-1 font-mono">₹{totalCost}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Fuel & public transit</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400">Carbon Footprint</span>
            <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">{totalCarbon} kg</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">~3.2 trees equivalent</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
          Filter:
        </span>
        {[
          { id: 'all', label: 'All Trips' },
          { id: 'green', label: '🌱 Green (Low Emissions)' },
          { id: 'multimodal', label: '⚡ Multi-Modal' },
          { id: 'car', label: '🚗 Car' },
          { id: 'ev', label: '🔋 EV' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterMode(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              filterMode === f.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Trip List */}
      <div className="space-y-3">
        {filtered.map((trip) => (
          <div
            key={trip.id}
            className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {trip.date}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle size={13} /> {trip.status}
                </span>
              </div>
              <span className="text-xs font-bold text-purple-400">{trip.modeLabel}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{trip.from}</span>
                  <span className="text-slate-500">➔</span>
                  <span>{trip.to}</span>
                </h3>
                <div className="text-xs text-slate-400 mt-1">
                  Traversed: <b>{trip.distanceKm} km</b> • Duration: <b>{trip.durationMin} minutes</b>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-base font-black text-amber-300 font-mono">₹{trip.cost}</div>
                  <div className="text-[10px] text-slate-500">Total tariff</div>
                </div>
                <div className="h-6 w-px bg-slate-800"></div>
                <div>
                  <div className="text-base font-black text-emerald-400 font-mono">{trip.carbonKg} kg</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">{trip.emissionsLabel} CO₂e</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Leaf,
  Award,
  TrendingDown,
  Sparkles,
  TreePine,
  Bus,
  Footprints,
  Zap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const CarbonDashboardScreen: React.FC = () => {
  const { currentUser, routes, setSelectedRoute, startNavigation } = useMobility();

  const greenRoute = routes.find((r) => r.carbonLevel === 'Low') || routes[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Leaf size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Eco-Mobility & Sustainability
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">My Carbon Impact & Green Routing</h1>
        <p className="text-xs text-slate-400">
          Measure tailpipe emissions, track offset credits, and choose sustainable multimodal corridors.
        </p>
      </div>

      {/* Section 41: Monthly Emissions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/15">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Leaf size={16} className="text-emerald-400" /> This Month's Emissions
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2 font-mono">14.8 kg</div>
          <div className="text-xs text-slate-300 mt-1">CO₂e Total Estimated</div>
          <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingDown size={12} /> 42% lower than solo car commuting
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <TreePine size={16} className="text-emerald-400" /> Trees Preserved Equivalent
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">2.8 Trees</div>
          <div className="text-xs text-slate-300 mt-1">Offset by Public Transit</div>
          <div className="text-[10px] text-slate-400 mt-2">Corridor carbon offset program</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Award size={16} className="text-purple-400" /> Mobility Eco Points
          </div>
          <div className="text-3xl font-black text-purple-400 mt-2 font-mono">
            {currentUser.mobilityPoints} pts
          </div>
          <div className="text-xs text-slate-300 mt-1">Rank: Gold Eco Commuter</div>
          <div className="text-[10px] text-purple-400 mt-2">+10 pts per electric / transit trip</div>
        </div>
      </div>

      {/* Sustainable Mode Breakdown */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white">Monthly Sustainable Mode Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Bus size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">12 Trips</div>
              <div className="text-[11px] text-slate-400">Public Transit / Train</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">6 Trips</div>
              <div className="text-[11px] text-slate-400">Electric Vehicle (Zero Tailpipe)</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Footprints size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">8 Trips</div>
              <div className="text-[11px] text-slate-400">Walking & Cycling</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 42: 🌱 Green Route Recommendation Card */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-900/90 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Leaf size={16} />
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              🌱 Recommended Green Route
            </span>
          </div>
          <span className="text-xs text-emerald-400 font-bold">Lowest Carbon Footprint</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white">{greenRoute.title}</h3>
            <p className="text-xs text-slate-300 mt-1">
              Estimated Emissions: <b className="text-emerald-400">{greenRoute.carbonKg} kg CO₂e</b> (vs ~19.6 kg in solo petrol car)
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
              <span>Duration: {greenRoute.totalDurationMin} min</span>
              <span>•</span>
              <span>Cost: ₹{greenRoute.estimatedCost}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">+25 Eco Mobility Points</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedRoute(greenRoute);
              startNavigation(greenRoute);
            }}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Select Green Route</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Section 49: Gamification & Badges */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award size={16} className="text-purple-400" /> Mobility Achievement Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30">
            <div className="text-2xl">🏆</div>
            <div className="text-xs font-bold text-white mt-1">Green Traveler</div>
            <div className="text-[10px] text-emerald-400">Unlocked • 10+ transit trips</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-blue-500/30">
            <div className="text-2xl">🛡</div>
            <div className="text-xs font-bold text-white mt-1">Safe Traveler</div>
            <div className="text-[10px] text-blue-400">Unlocked • 0 incident routes</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30">
            <div className="text-2xl">🚶</div>
            <div className="text-xs font-bold text-white mt-1">Active Traveler</div>
            <div className="text-[10px] text-amber-400">Unlocked • 25 km walked</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/30">
            <div className="text-2xl">⚡</div>
            <div className="text-xs font-bold text-white mt-1">EV Pioneer</div>
            <div className="text-[10px] text-purple-400">Unlocked • Zero tailpipe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

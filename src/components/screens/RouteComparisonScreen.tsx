import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Compass,
  ArrowRight,
  Clock,
  IndianRupee,
  Leaf,
  ShieldCheck,
  Sparkles,
  Zap,
  Car,
  Bike,
  Bus,
  Train,
  CheckCircle,
  AlertTriangle,
  Accessibility,
  ArrowLeft,
} from 'lucide-react';
import { RouteOption } from '../../types/mobility';

export const RouteComparisonScreen: React.FC = () => {
  const {
    routes,
    selectedRoute,
    setSelectedRoute,
    startNavigation,
    origin,
    destination,
    setCurrentScreen,
  } = useMobility();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'car':
        return <Car size={18} className="text-blue-400" />;
      case 'bike':
        return <Bike size={18} className="text-amber-400" />;
      case 'bus':
        return <Bus size={18} className="text-teal-400" />;
      case 'train':
      case 'metro':
        return <Train size={18} className="text-indigo-400" />;
      case 'ev':
        return <Zap size={18} className="text-emerald-400" />;
      default:
        return <Sparkles size={18} className="text-purple-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentScreen('planner')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Trip Planner
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
              AI Multi-Factor Route Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            Compare Travel Options: {origin.name.split(' ')[0]} ➔ {destination.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-400">
            {routes.length} options evaluated against current traffic, weather, safety, and personal preferences.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          View on Map
        </button>
      </div>

      {/* Routes List */}
      <div className="space-y-4">
        {routes.map((route, index) => {
          const isSelected = selectedRoute?.id === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                route.isRecommended
                  ? 'bg-gradient-to-br from-slate-900/95 via-purple-950/20 to-slate-900/90 border-purple-500/60 shadow-2xl shadow-purple-900/20 ring-1 ring-purple-500/30'
                  : isSelected
                  ? 'bg-slate-900/90 border-blue-500/60 shadow-xl'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Option Number & Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    {getModeIcon(route.mode)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Option {index + 1}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">{route.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {route.isRecommended && (
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Sparkles size={13} className="text-purple-400" /> AI RECOMMENDED
                    </span>
                  )}
                  {route.isWheelchairAccessible && (
                    <span
                      title="Wheelchair Accessible Route"
                      className="p-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      <Accessibility size={15} />
                    </span>
                  )}
                </div>
              </div>

              {/* Core Metrics: ETA, Cost, Carbon, Transfers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock size={13} className="text-blue-400" /> Predicted ETA
                  </div>
                  <div className="text-xl font-black text-white mt-1 font-mono">
                    {route.totalDurationMin} min
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Base: {route.baseTravelTimeMin}m • Traffic: +{route.trafficDelayMin}m
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <IndianRupee size={13} className="text-amber-400" /> Estimated Cost
                  </div>
                  <div className="text-xl font-black text-amber-300 mt-1 font-mono">
                    ₹{route.estimatedCost}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Toll: ₹{route.costBreakdown.toll} • Park: ₹{route.costBreakdown.parking}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Leaf size={13} className="text-emerald-400" /> Carbon Footprint
                  </div>
                  <div className="text-xl font-black text-emerald-400 mt-1 font-mono">
                    {route.carbonKg} kg
                  </div>
                  <div className="text-[10px] text-emerald-500/90 font-medium">
                    {route.carbonLevel} emissions rating
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck size={13} className="text-indigo-400" /> Safety Score
                  </div>
                  <div className="text-xl font-black text-indigo-300 mt-1 font-mono">
                    {route.safetyScore}/100
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Confidence: <b>{route.confidence}</b>
                  </div>
                </div>
              </div>

              {/* Warnings (if any) */}
              {route.warnings.length > 0 && (
                <div className="mb-4 space-y-1">
                  {route.warnings.map((warn, wIdx) => (
                    <div
                      key={wIdx}
                      className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2"
                    >
                      <AlertTriangle size={14} className="shrink-0 text-amber-400" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Explainable AI Rationale */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Why this option was suggested:
                </span>
                <div className="space-y-1">
                  {route.aiRationale.map((reason, rIdx) => (
                    <div key={rIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  {route.transfers === 0 ? 'Direct Route' : `${route.transfers} transfer`} • Walking: {route.walkingDurationMin} min
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startNavigation(route);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                    route.isRecommended
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-600/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  }`}
                >
                  <span>Select & Navigate</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

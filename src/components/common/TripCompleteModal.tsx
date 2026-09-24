import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { CheckCircle2, Award, Leaf, Clock, IndianRupee, MapPin, ArrowRight } from 'lucide-react';

export const TripCompleteModal: React.FC = () => {
  const { showTripCompleteModal, setShowTripCompleteModal, lastCompletedTrip, setCurrentScreen } = useMobility();

  if (!showTripCompleteModal || !lastCompletedTrip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl p-6 text-center bg-slate-900/95 relative overflow-hidden">
        {/* Top badge */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-lg shadow-emerald-500/30">
          <CheckCircle2 size={38} />
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          Trip Completed Successfully
        </span>

        <h2 className="text-xl font-bold text-white mt-2">Destination Reached!</h2>
        <p className="text-xs text-slate-300 mt-1">
          {lastCompletedTrip.from} ➔ {lastCompletedTrip.to}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock size={14} className="text-blue-400" /> Duration
            </div>
            <div className="text-lg font-bold text-white mt-1">{lastCompletedTrip.durationMin} min</div>
            <div className="text-[10px] text-slate-400">{lastCompletedTrip.distanceKm} km traversed</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <IndianRupee size={14} className="text-amber-400" /> Total Cost
            </div>
            <div className="text-lg font-bold text-white mt-1">₹{lastCompletedTrip.cost}</div>
            <div className="text-[10px] text-emerald-400">₹{Math.round(lastCompletedTrip.cost * 0.25)} saved vs solo cab</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Leaf size={14} className="text-emerald-400" /> Carbon Emitted
            </div>
            <div className="text-lg font-bold text-white mt-1">{lastCompletedTrip.carbonKg} kg CO₂e</div>
            <div className="text-[10px] text-emerald-400">Green rating: {lastCompletedTrip.emissionsLabel}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Award size={14} className="text-purple-400" /> Mobility Points
            </div>
            <div className="text-lg font-bold text-purple-300 mt-1">+35 Points</div>
            <div className="text-[10px] text-purple-400">Green Traveler Badge</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowTripCompleteModal(false);
              setCurrentScreen('trip_history');
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1"
          >
            <span>View in History</span>
            <ArrowRight size={13} />
          </button>
          <button
            onClick={() => {
              setShowTripCompleteModal(false);
              setCurrentScreen('dashboard');
            }}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

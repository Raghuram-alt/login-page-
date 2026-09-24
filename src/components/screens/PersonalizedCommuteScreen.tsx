import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Bell,
  MapPin,
} from 'lucide-react';

export const PersonalizedCommuteScreen: React.FC = () => {
  const { startNavigation, addNotification } = useMobility();
  const [reminderSet, setReminderSet] = useState(false);

  const handleSetReminder = () => {
    setReminderSet(true);
    addNotification('Departure Reminder Set', 'AI reminder set for 08:05 AM. Traffic alarm active.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Clock size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-purple-400">
            Predictive Daily Assistant
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">My Commute (AI Personalized)</h1>
        <p className="text-xs text-slate-400">
          Learned historical departure habits paired with real-time predictive traffic and weather insights.
        </p>
      </div>

      {/* Routine Trip Overview */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Registered Regular Commute
            </span>
            <h2 className="text-lg font-black text-white mt-0.5">Home (Kakinada) ➔ University Campus</h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Mon – Fri Schedule
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Typical Daily Departure</div>
            <div className="text-2xl font-black text-white mt-1 font-mono">08:15 AM</div>
            <div className="text-xs text-slate-500 mt-1">Based on past 34 tracked trips</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs text-slate-400">Typical Travel Duration</div>
            <div className="text-2xl font-black text-white mt-1 font-mono">48 minutes</div>
            <div className="text-xs text-slate-500 mt-1">Average door-to-door time</div>
          </div>
        </div>
      </div>

      {/* Section 39: AI Recommendation Card */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-slate-900/90 via-purple-950/20 to-slate-900/90 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Today's Predictive Commute Advisory
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
            AI ML Estimate • Live Conditions
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">Heavy Morning Bottleneck Forecasted</span>
            <span>
              Collectorate Circle construction will peak between 08:20 AM and 08:50 AM. Leaving at your usual time will incur an estimated 16-minute delay.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30">
            <div className="text-xs text-purple-300 font-semibold">Suggested Optimized Departure</div>
            <div className="text-3xl font-black text-purple-400 mt-1 font-mono">08:05 AM</div>
            <div className="text-[11px] text-slate-300 mt-1">Leave 10 minutes earlier than usual</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
            <div className="text-xs text-emerald-300 font-semibold">Estimated Time Saved</div>
            <div className="text-3xl font-black text-emerald-400 mt-1 font-mono">8 minutes net</div>
            <div className="text-[11px] text-slate-300 mt-1">Plus stress-free smooth flow</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleSetReminder}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              reminderSet
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
            }`}
          >
            {reminderSet ? <CheckCircle size={15} /> : <Bell size={15} />}
            <span>{reminderSet ? 'Reminder Set for 08:05 AM' : 'Set 08:05 AM Smart Reminder'}</span>
          </button>

          <button
            onClick={() => startNavigation()}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Start Commute Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

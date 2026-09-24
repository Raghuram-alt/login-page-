import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Users,
  MapPin,
  Clock,
  Car,
  Bus,
  Train,
  Navigation,
  Sparkles,
  Share2,
  CheckCircle,
} from 'lucide-react';

export const FamilyTripScreen: React.FC = () => {
  const { startNavigation } = useMobility();

  const members = [
    {
      id: 'm1',
      name: 'Person A (Aarav)',
      mode: 'Personal Car',
      icon: <Car size={16} className="text-blue-400" />,
      origin: 'Kakinada Port Bypass',
      etaMin: 12,
      status: 'On Highway NH-16',
    },
    {
      id: 'm2',
      name: 'Person B (Priya)',
      mode: 'Express Bus (APSRTC)',
      icon: <Bus size={16} className="text-teal-400" />,
      origin: 'Anakapalle Junction',
      etaMin: 18,
      status: 'Approaching Flyover',
    },
    {
      id: 'm3',
      name: 'Person C (Vikram)',
      mode: 'Coastal Metro Feeder',
      icon: <Train size={16} className="text-indigo-400" />,
      origin: 'Vizag Central Interchange',
      etaMin: 15,
      status: '1 stop away from Mall',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Users size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-purple-400">
            Group Coordination Engine
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Family & Group Trip Coordination</h1>
        <p className="text-xs text-slate-400">
          Synchronize multi-origin family journeys across different travel modes with automated meeting point discovery.
        </p>
      </div>

      {/* Suggested Meeting Point Card (Section 47) */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-slate-900/90 via-purple-950/20 to-slate-900/90 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Optimal AI Meeting Hub
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
            Minimizes Wait Deviation (&lt;6 min)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">CMR Central Mall & Multi-Tier Parking Hub</h2>
            <p className="text-xs text-slate-300 mt-1">
              Location: Station Road Interchange, Visakhapatnam • Equipped with metro feeder, EV chargers & family dining.
            </p>
          </div>

          <button
            onClick={() => startNavigation()}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <Navigation size={14} />
            <span>Navigate to Hub</span>
          </button>
        </div>
      </div>

      {/* Group Members Telemetry Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users size={16} className="text-blue-400" /> Live Family Members Telemetry (3 Members)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    {member.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{member.name}</h4>
                    <span className="text-[10px] text-slate-400">{member.mode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white font-mono">{member.etaMin}m</div>
                  <div className="text-[9px] uppercase font-bold text-blue-400">ETA</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                Departed: <b className="text-slate-200">{member.origin}</b>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">
                Status: {member.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 44: Carpooling Matching Simulation */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Car size={16} className="text-emerald-400" /> Verified Campus / Tech SEZ Carpool Matches
          </h3>
          <span className="text-[10px] text-slate-400">Demo Carpooling Pool</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">82% Route Overlap Match</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-300">Departure: 08:10 AM</span>
            </div>
            <div className="text-sm font-bold text-white mt-1">
              Kakinada ➔ Vizag IT SEZ Corridor Commuter Pool
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Available Seats: <b>2</b> • Overlap Distance: <b>7.4 km shared</b> • Privacy Protected
            </div>
          </div>

          <button
            onClick={() => alert('Carpool match request sent to driver (Demo Simulation).')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shrink-0"
          >
            Request Shared Ride
          </button>
        </div>
      </div>
    </div>
  );
};

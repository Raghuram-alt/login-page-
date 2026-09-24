import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_PARKING_LOCATIONS } from '../../data/parkingData';
import {
  SquareParking,
  Sparkles,
  Zap,
  Clock,
  IndianRupee,
  Navigation,
  CheckCircle,
  X,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { ParkingLocation } from '../../types/mobility';

export const SmartParkingScreen: React.FC = () => {
  const { startNavigation, addNotification } = useMobility();
  const [reservedParking, setReservedParking] = useState<ParkingLocation | null>(null);

  const handleReserve = (lot: ParkingLocation) => {
    setReservedParking(lot);
    addNotification('Demo Parking Reserved', `Slot #B-12 reserved at ${lot.name}.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
            <SquareParking size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-purple-400">
            AI Smart Parking Intelligence
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Smart Parking & Predictive Availability</h1>
        <p className="text-xs text-slate-400">
          Real-time slot telemetry, EV charging bays, automated tariffs, and predictive arrival forecasts.
        </p>
      </div>

      {/* Section 27: AI Prediction Feature Highlight */}
      <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-slate-900/95 via-purple-950/20 to-slate-900/90 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-white">AI Parking Availability Engine</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
            Predictive Model • Not Guaranteed
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The system evaluates historical Friday morning turnover rates, current occupancy, and inbound vehicle telemetry to forecast available parking at your destination upon arrival.
        </p>
      </div>

      {/* Parking List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_PARKING_LOCATIONS.map((lot) => (
          <div
            key={lot.id}
            className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{lot.name}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{lot.distanceMeters}m away from destination</div>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  lot.status === 'Available'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : lot.status === 'Limited'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {lot.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Open Slots</span>
                <span className="text-base font-black text-white font-mono">
                  {lot.availableSpots}/{lot.totalSpots}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Hourly Rate</span>
                <span className="text-base font-black text-amber-300 font-mono">
                  ₹{lot.hourlyRate}/h
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">EV Chargers</span>
                <span className="text-base font-bold text-emerald-400">
                  {lot.hasEvCharging ? 'Available' : 'None'}
                </span>
              </div>
            </div>

            {/* AI Prediction Pill (Section 27) */}
            <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs flex items-center justify-between">
              <span className="text-purple-300 flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>AI Arrival Probability:</span>
              </span>
              <span className="font-extrabold text-white font-mono">
                {lot.predictionChanceAtTime}% chance at 10:45 AM
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleReserve(lot)}
                className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Demo Reserve Slot
              </button>
              <button
                onClick={() => startNavigation()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1"
              >
                <Navigation size={13} />
                <span>Navigate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Reservation Modal */}
      {reservedParking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-purple-500/40 p-6 text-center space-y-4 bg-slate-900/95 relative">
            <button
              onClick={() => setReservedParking(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-purple-400 mx-auto">
              <CheckCircle size={30} />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase">
              Demo Reservation Confirmed
            </div>

            <h3 className="text-lg font-black text-white">{reservedParking.name}</h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Assigned Slot:</span>
                <span className="font-bold text-emerald-400">Bay #B-12 (Ground Deck)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Estimated Tariff:</span>
                <span className="font-bold text-white">₹{reservedParking.hourlyRate}/hour</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Holding Grace Period:</span>
                <span className="font-bold text-purple-400">20 minutes past ETA</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-center gap-3">
              <QrCode size={40} className="text-slate-300" />
              <div className="text-left">
                <div className="text-[11px] font-bold text-white">Demo FASTag Gate Barcode</div>
                <div className="text-[9px] text-slate-400">Scan at automated boom barrier</div>
              </div>
            </div>

            <button
              onClick={() => {
                setReservedParking(null);
                startNavigation();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Start Navigation to Parking Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

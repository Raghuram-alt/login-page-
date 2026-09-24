import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Car,
  Bike,
  Zap,
  Gauge,
  Fuel,
  BatteryCharging,
  ShieldAlert,
  CloudRain,
  Wrench,
  Navigation,
  CheckCircle,
} from 'lucide-react';

export const OwnVehicleScreen: React.FC = () => {
  const { currentUser, demoControls, setCurrentScreen, startNavigation } = useMobility();
  const [vehicleMode, setVehicleMode] = useState<'bike' | 'car' | 'ev'>('bike');

  const getRangeKm = () => {
    if (vehicleMode === 'bike') return Math.round((demoControls.fuelLevel / 100) * 360);
    if (vehicleMode === 'car') return Math.round((demoControls.fuelLevel / 100) * 580);
    return Math.round((demoControls.batteryLevel / 100) * 280);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Gauge size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Own Transport Cockpit
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Vehicle Telemetry & Smart Adaptation</h1>
        <p className="text-xs text-slate-400">
          Personalized telemetry matching your registered vehicle with weather, safety, and road hazards.
        </p>

        {/* Vehicle Mode Switcher */}
        <div className="flex items-center gap-2 mt-5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setVehicleMode('bike')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              vehicleMode === 'bike' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bike size={16} />
            <span>Two-Wheeler Mode</span>
          </button>
          <button
            onClick={() => setVehicleMode('car')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              vehicleMode === 'car' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Car size={16} />
            <span>Four-Wheeler Mode</span>
          </button>
          <button
            onClick={() => setVehicleMode('ev')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              vehicleMode === 'ev' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap size={16} />
            <span>Electric Vehicle Mode</span>
          </button>
        </div>
      </div>

      {/* Main Vehicle Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fuel / Battery */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            {vehicleMode === 'ev' ? (
              <BatteryCharging size={16} className="text-emerald-400" />
            ) : (
              <Fuel size={16} className="text-orange-400" />
            )}
            <span>{vehicleMode === 'ev' ? 'State of Charge (SoC)' : 'Tank Fuel Level'}</span>
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">
            {vehicleMode === 'ev' ? `${demoControls.batteryLevel}%` : `${demoControls.fuelLevel}%`}
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${vehicleMode === 'ev' ? 'bg-emerald-500' : 'bg-orange-500'}`}
              style={{ width: `${vehicleMode === 'ev' ? demoControls.batteryLevel : demoControls.fuelLevel}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Status: {vehicleMode === 'ev' ? 'Battery Health 94%' : 'Fuel Quality: Pure BS-VI'}
          </div>
        </div>

        {/* Estimated Range */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Gauge size={16} className="text-blue-400" />
            <span>Estimated Drivable Range</span>
          </div>
          <div className="text-3xl font-black text-blue-400 mt-2 font-mono">{getRangeKm()} km</div>
          <div className="text-xs text-slate-300 mt-2">
            Weather adjusted: <b>-12 km</b> (A/C & Rain)
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Corridor distance to Vizag: <b>140 km</b>
          </div>
        </div>

        {/* Safety & Road Factors */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert size={16} className="text-amber-400" />
            <span>Corridor Advisory</span>
          </div>
          <div className="text-base font-bold text-white mt-2">
            {vehicleMode === 'bike' ? 'Two-Wheeler Caution' : 'Highway FASTag Ready'}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {vehicleMode === 'bike'
              ? 'Rain forecast on bypass. Use waterproof protective gear and avoid coastal underpasses.'
              : 'NH-16 toll plaza fast lanes operating normally.'}
          </p>
        </div>
      </div>

      {/* Mode-Specific Capabilities Breakdown */}
      {vehicleMode === 'bike' && (
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-3">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <Bike size={16} /> Two-Wheeler Specialized Guidance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">Toll-Free Routing</span>
              <span className="text-slate-400 text-[11px]">Bypasses automated car toll gates across Godavari bridges.</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">Weather Braking Alert</span>
              <span className="text-slate-400 text-[11px]">Rain probability {demoControls.rainProbability}%: Double stopping distances.</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">Pothole Radar</span>
              <span className="text-slate-400 text-[11px]">1 deep pothole reported on Town Collectorate road.</span>
            </div>
          </div>
        </div>
      )}

      {vehicleMode === 'car' && (
        <div className="glass-panel p-5 rounded-3xl border border-blue-500/30 bg-blue-950/10 space-y-3">
          <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
            <Car size={16} /> Four-Wheeler Highway Telemetry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">FASTag Toll Estimate</span>
              <span className="text-slate-400 text-[11px]">₹160 across 2 automated plazas along NH-16.</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">Smart Parking Sync</span>
              <span className="text-slate-400 text-[11px]">Automated vacancy verification at destination prior to departure.</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="font-semibold text-white block">Traffic Delay Factor</span>
              <span className="text-slate-400 text-[11px]">+{demoControls.trafficLevel === 'heavy' ? '22' : '8'} min expected due to congestion.</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={() => startNavigation()}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <span>Navigate With Selected Vehicle Mode</span>
          <Navigation size={14} />
        </button>
      </div>
    </div>
  );
};

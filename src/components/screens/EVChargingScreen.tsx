import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_EV_CHARGERS, DEMO_BATTERY_SWAP_STATIONS } from '../../data/evAndFuelData';
import {
  Zap,
  BatteryCharging,
  Gauge,
  Clock,
  IndianRupee,
  RefreshCw,
  Navigation,
  CheckCircle,
  AlertTriangle,
  Plus,
} from 'lucide-react';

export const EVChargingScreen: React.FC = () => {
  const { demoControls, startNavigation, addNotification } = useMobility();

  const predictedRangeKm = Math.round((demoControls.batteryLevel / 100) * 280);
  const baseRangeKm = Math.round((demoControls.batteryLevel / 100) * 310);
  const weatherPenaltyKm = demoControls.weatherCondition !== 'clear' ? 14 : 5;
  const trafficPenaltyKm = demoControls.trafficLevel === 'heavy' ? 16 : 8;

  const handleAddStop = (name: string) => {
    addNotification('EV Stop Added', `${name} scheduled on current trip route.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Zap size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            Electric Vehicle Ecosystem
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">EV Fast Charging & Battery Swapping</h1>
        <p className="text-xs text-slate-400">
          Smart charging route planning, battery swap stations, and real-time port availability.
        </p>
      </div>

      {/* EV Dashboard & Section 23: Range Prediction Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-emerald-950/10">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <BatteryCharging size={16} className="text-emerald-400" /> Current Battery
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2 font-mono">
            {demoControls.batteryLevel}%
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${demoControls.batteryLevel}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2">Health (SoH): 94% Excellent</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Gauge size={16} className="text-blue-400" /> Predicted Range
          </div>
          <div className="text-3xl font-black text-blue-400 mt-2 font-mono">
            {predictedRangeKm} km
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Base: {baseRangeKm} km
          </div>
          <div className="text-[10px] text-red-400">
            Weather adj: -{weatherPenaltyKm}km • Traffic adj: -{trafficPenaltyKm}km
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock size={16} className="text-purple-400" /> Energy Efficiency
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono">16.4</div>
          <div className="text-[10px] text-slate-400 mt-2">kWh per 100 km</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Top 5% Eco Driver</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Zap size={16} className="text-amber-400" /> Nearest Supercharger
          </div>
          <div className="text-3xl font-black text-amber-300 mt-2 font-mono">1.8 km</div>
          <div className="text-[10px] text-slate-400 mt-2">Ather Grid / EZ Charge</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">4 of 4 ports free</div>
        </div>
      </div>

      {/* Low Battery Warning Banner if below 35% */}
      {demoControls.batteryLevel < 35 && (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/50 bg-amber-950/20 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Battery Range Insufficient for Full Corridor</span>
              <span>
                Destination is 140 km away. Tata Power 120kW Supercharger (km 42) has been automatically suggested as a stop.
              </span>
            </div>
          </div>
          <button
            onClick={() => handleAddStop('Tata Power EZ Charge (Highway)')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shrink-0 transition-colors"
          >
            Add Charging Stop
          </button>
        </div>
      )}

      {/* EV Charging Stations List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap size={16} className="text-emerald-400" /> Verified EV Fast Chargers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_EV_CHARGERS.map((charger) => (
            <div
              key={charger.id}
              className="glass-panel p-4 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                    {charger.operator}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">{charger.name}</h3>
                  <div className="text-xs text-slate-400">{charger.chargerType}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">
                    {charger.availablePorts}/{charger.totalPorts} ports free
                  </span>
                  <div className="text-[10px] text-slate-500">{charger.distanceKm} km away</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-300">
                  Rate: <b>₹{charger.pricePerKwh}</b> / kWh
                </span>
                <span className="text-slate-400">Est. 20-80%: ~{charger.chargingTimeEstMin} min</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleAddStop(charger.name)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add to Route</span>
                </button>
                <button
                  onClick={() => startNavigation()}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Navigation size={13} />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 25: Battery Swapping Hubs */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <RefreshCw size={16} className="text-cyan-400" /> Two-Wheeler Battery Swapping Network
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_BATTERY_SWAP_STATIONS.map((swap) => (
            <div
              key={swap.id}
              className="glass-panel p-4 rounded-3xl border border-cyan-500/20 bg-cyan-950/10 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{swap.name}</h3>
                  <div className="text-xs text-cyan-300 mt-0.5">{swap.compatibility}</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 font-mono">
                    {swap.availableBatteries} Ready
                  </span>
                  <div className="text-[10px] text-slate-500">{swap.distanceKm} km away</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-300">
                  Swap Time: <b>{swap.swapTimeSec} seconds</b>
                </span>
                <span className="text-emerald-400 font-semibold">Instant 100% Range</span>
              </div>

              <button
                onClick={() => startNavigation()}
                className="w-full py-2 rounded-xl bg-cyan-600/80 hover:bg-cyan-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Navigation size={13} />
                <span>Navigate to Swap Hub</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

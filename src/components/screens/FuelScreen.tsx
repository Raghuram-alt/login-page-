import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_FUEL_STATIONS } from '../../data/evAndFuelData';
import {
  Fuel,
  Gauge,
  AlertTriangle,
  Navigation,
  Plus,
  CheckCircle,
  Clock,
  Sparkles,
  Droplet,
} from 'lucide-react';

export const FuelScreen: React.FC = () => {
  const { demoControls, startNavigation, addNotification } = useMobility();

  const fuelRangeKm = Math.round((demoControls.fuelLevel / 100) * 450);
  const isLowFuel = demoControls.fuelLevel < 25;

  const handleAddStop = (name: string) => {
    addNotification('Fuel Stop Added', `${name} scheduled on current trip route.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-orange-500/20 text-orange-400">
            <Fuel size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-orange-400">
            Fuel Intelligence & Low-Fuel Radar
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Petrol & Diesel Stations</h1>
        <p className="text-xs text-slate-400">
          Live fuel pricing, verified quality stations, highway stop optimization, and low-tank alerts.
        </p>
      </div>

      {/* Fuel Level & Section 21: Low-Fuel Alert */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Droplet size={15} className="text-orange-400" /> Fuel Tank Gauge
          </div>
          <div className="text-3xl font-black text-orange-400 mt-2 font-mono">
            {demoControls.fuelLevel}%
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${isLowFuel ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
              style={{ width: `${demoControls.fuelLevel}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Status: {isLowFuel ? '⚠ Reserve Warning' : 'Normal Operational'}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Gauge size={15} className="text-blue-400" /> Usable Distance
          </div>
          <div className="text-3xl font-black text-blue-400 mt-2 font-mono">{fuelRangeKm} km</div>
          <div className="text-[10px] text-slate-400 mt-2">Corridor Destination: 140 km</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            {fuelRangeKm > 140 ? 'Sufficient for one-way' : 'Stop required on corridor'}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock size={15} className="text-emerald-400" /> Average Corridor Price
          </div>
          <div className="text-xl font-bold text-white mt-2">
            Petrol: <span className="text-amber-400 font-mono">₹108.75</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">
            Diesel: <span className="text-blue-400 font-mono">₹96.50</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">AP State VAT inclusive</div>
        </div>
      </div>

      {/* Section 21: LOW FUEL ALERT Banner */}
      {isLowFuel && (
        <div className="glass-panel p-5 rounded-3xl border border-red-500/60 bg-red-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle size={22} className="animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-red-400">
                ⚠ LOW FUEL DETECTED
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Estimated Range ({fuelRangeKm} km) is below safety buffer.
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Destination is 140 km away. Immediate top-up recommended at IndianOil Swarna Auto Care (1.1 km ahead).
              </p>
            </div>
          </div>
          <button
            onClick={() => handleAddStop('IndianOil Swarna Auto Care')}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all shrink-0"
          >
            Add Fuel Stop Ahead
          </button>
        </div>
      )}

      {/* Nearby Fuel Stations List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Fuel size={16} className="text-orange-400" /> Verified Nearby Fuel Stations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_FUEL_STATIONS.map((station) => (
            <div
              key={station.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {station.brand}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{station.name}</h3>
                  <div className="text-xs text-slate-400">
                    Petrol: <b className="text-white">₹{station.petrolPrice}/L</b> • Diesel:{' '}
                    <b className="text-white">₹{station.dieselPrice}/L</b>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400">Open 24x7</span>
                  <div className="text-[10px] text-slate-500">{station.distanceKm} km away</div>
                </div>
              </div>

              {/* Facilities tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {station.facilities.map((fac, fIdx) => (
                  <span
                    key={fIdx}
                    className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                  >
                    {fac}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleAddStop(station.name)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus size={13} />
                  <span>Add Stop</span>
                </button>
                <button
                  onClick={() => startNavigation()}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Navigation size={13} />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

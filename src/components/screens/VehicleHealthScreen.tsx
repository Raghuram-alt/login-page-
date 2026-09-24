import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Activity,
  Wrench,
  Gauge,
  BatteryCharging,
  Fuel,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Clock,
  Sparkles,
} from 'lucide-react';

export const VehicleHealthScreen: React.FC = () => {
  const { currentUser, startNavigation } = useMobility();

  const serviceCenters = [
    {
      id: 'sc_1',
      name: 'Authorized Honda & Multibrand Auto Care',
      distanceKm: 2.4,
      status: 'Open Now (Closes 07:30 PM)',
      rating: 4.8,
      specialty: 'Brake inspection, Oil service, EV battery check',
    },
    {
      id: 'sc_2',
      name: 'Tata Motors & EV Authorized Workshop',
      distanceKm: 4.1,
      status: 'Open Now (24/7 Emergency Breakdown)',
      rating: 4.9,
      specialty: 'DC Fast charging diagnostics, Suspension',
    },
    {
      id: 'sc_3',
      name: 'AP Highway Express Repair Oasis',
      distanceKm: 18.5,
      status: 'Open 24 Hours',
      rating: 4.6,
      specialty: 'Tire replacement, Wheel alignment, Nitrogen',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Activity size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Predictive Maintenance
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Vehicle Health & Service Centers</h1>
        <p className="text-xs text-slate-400">
          OBD-II simulated diagnostics, tire pressure telemetry, brake pad lifespan, and nearby authorized mechanics.
        </p>
      </div>

      {/* Section 45: Diagnostics Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle size={15} className="text-emerald-400" /> Battery Health (SoH)
          </div>
          <div className="text-2xl font-black text-white mt-1 font-mono">94%</div>
          <div className="text-[10px] text-emerald-400 mt-1">Optimal cell balance</div>
          <div className="text-[10px] text-slate-500">12.4V Aux battery normal</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <AlertTriangle size={15} className="text-amber-400" /> Tire Pressure (TPMS)
          </div>
          <div className="text-2xl font-black text-amber-300 mt-1 font-mono">31 / 34 PSI</div>
          <div className="text-[10px] text-amber-400 mt-1">Front tire slightly low (-2 PSI)</div>
          <div className="text-[10px] text-slate-500">Free air available at next fuel stop</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle size={15} className="text-emerald-400" /> Brake Pad Thickness
          </div>
          <div className="text-2xl font-black text-white mt-1 font-mono">78% Life</div>
          <div className="text-[10px] text-slate-400 mt-1">Safe braking performance</div>
          <div className="text-[10px] text-slate-500">ABS sensors active</div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Wrench size={15} className="text-blue-400" /> Next Routine Service
          </div>
          <div className="text-2xl font-black text-blue-400 mt-1 font-mono">1,200 km</div>
          <div className="text-[10px] text-slate-400 mt-1">Scheduled in ~3 weeks</div>
          <div className="text-[10px] text-slate-500">Oil & filter replacement</div>
        </div>
      </div>

      {/* Section 46: Service Center Locator */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Wrench size={16} className="text-blue-400" /> Nearby Certified Service Centers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceCenters.map((sc) => (
            <div
              key={sc.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold">★ {sc.rating} / 5.0</span>
                  <span className="text-slate-500 text-[10px]">{sc.distanceKm} km away</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1 leading-snug">{sc.name}</h3>
                <div className="text-[11px] text-emerald-400 mt-1">{sc.status}</div>
                <div className="text-[11px] text-slate-400 mt-1">{sc.specialty}</div>
              </div>

              <button
                onClick={() => startNavigation()}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Navigation size={13} />
                <span>Navigate to Center</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

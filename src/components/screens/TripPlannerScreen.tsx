import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_LOCATIONS } from '../../data/locations';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Car,
  Bike,
  Bus,
  TramFront,
  Train,
  Zap,
  ArrowRight,
  Sparkles,
  Sliders,
  Check,
} from 'lucide-react';
import { TravelMode, UserPreferences } from '../../types/mobility';

export const TripPlannerScreen: React.FC = () => {
  const {
    origin,
    setOrigin,
    destination,
    setDestination,
    preferences,
    togglePreference,
    setCurrentScreen,
  } = useMobility();

  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('Now (08:30 AM)');
  const [activeMode, setActiveMode] = useState<TravelMode>('all');

  const modes: { id: TravelMode; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Modes', icon: <Compass size={15} /> },
    { id: 'multimodal', label: 'Multi-Modal', icon: <Sparkles size={15} /> },
    { id: 'bike', label: 'Two-Wheeler', icon: <Bike size={15} /> },
    { id: 'car', label: 'Car', icon: <Car size={15} /> },
    { id: 'ev', label: 'EV', icon: <Zap size={15} /> },
    { id: 'bus', label: 'Bus', icon: <Bus size={15} /> },
    { id: 'metro', label: 'Metro', icon: <TramFront size={15} /> },
    { id: 'train', label: 'Train', icon: <Train size={15} /> },
  ];

  const preferenceItems: { key: keyof UserPreferences; label: string; desc: string }[] = [
    { key: 'lowestCost', label: 'Lowest Cost', desc: 'Prioritize subsidized public transit and minimal fuel' },
    { key: 'fastest', label: 'Fastest ETA', desc: 'Minimize total duration via highway express lanes' },
    { key: 'lowerEmissions', label: 'Lower Emissions (Green)', desc: 'Prioritize EV, cycling, train, and bus options' },
    { key: 'saferRouteFactors', label: 'Safer Route Factors', desc: 'Avoid reported potholes, unlit alleys, and hazard zones' },
    { key: 'avoidTolls', label: 'Avoid Tolls', desc: 'Reroute off NH-16 toll plaza segments' },
    { key: 'avoidHighways', label: 'Avoid Highways', desc: 'Stick to local arterial roads and coastal bypasses' },
    { key: 'wheelchairAccessible', label: 'Wheelchair Accessible', desc: 'Step-free paths, ramps, and elevator-equipped transit' },
    { key: 'fewerTransfers', label: 'Fewer Transfers', desc: 'Direct point-to-point routes with zero or one switch' },
    { key: 'lessWalking', label: 'Less Walking', desc: 'Keep first-mile and last-mile walking under 400 meters' },
    { key: 'avoidBadWeather', label: 'Avoid Bad Weather', desc: 'Penalize open two-wheeler routes during heavy rain' },
  ];

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Compass size={18} />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-blue-400">
              Multi-Modal Trip Planner
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Plan Your Multi-Factor Journey</h1>
          <p className="text-xs text-slate-400">
            Configure origin, destination, and AI routing preferences across all transit modes.
          </p>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
        {/* Origin and Destination Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <MapPin size={14} className="text-blue-400" /> Origin Location (From)
            </label>
            <select
              value={origin.id}
              onChange={(e) => {
                const found = DEMO_LOCATIONS.find((l) => l.id === e.target.value);
                if (found) setOrigin(found);
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              {DEMO_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.city})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <MapPin size={14} className="text-red-400" /> Destination (To)
            </label>
            <select
              value={destination.id}
              onChange={(e) => {
                const found = DEMO_LOCATIONS.find((l) => l.id === e.target.value);
                if (found) setDestination(found);
              }}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              {DEMO_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date, Time & Travel Mode Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Calendar size={13} /> Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Clock size={13} /> Departure Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Compass size={13} /> Corridor
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-blue-400 font-semibold truncate">
              {origin.city} ➔ {destination.city}
            </div>
          </div>
        </div>

        {/* Travel Mode Selector Buttons */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-2">Preferred Travel Mode</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  activeMode === m.id
                    ? 'bg-blue-600/30 border-blue-500 text-white shadow-md'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 7: 10 Advanced Preferences Checkboxes */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={14} className="text-purple-400" /> Multi-Factor Routing Preferences (10 Options)
            </span>
            <span className="text-[11px] text-slate-400">Influences AI scoring weights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {preferenceItems.map((item) => {
              const isChecked = preferences[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => togglePreference(item.key)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-blue-500/10 border-blue-500/40 text-white'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-blue-600 text-white' : 'border border-slate-700 bg-slate-800'
                    }`}
                  >
                    {isChecked && <Check size={12} />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentScreen('comparison')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm tracking-wide shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>PLAN MY TRIP ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};

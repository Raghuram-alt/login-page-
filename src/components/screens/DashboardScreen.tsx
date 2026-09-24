import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { MapView } from '../map/MapView';
import { DEMO_LOCATIONS } from '../../data/locations';
import {
  Search,
  MapPin,
  Car,
  Bike,
  Bus,
  TramFront,
  Train,
  Footprints,
  Zap,
  SquareParking,
  CloudRain,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Navigation,
  Sparkles,
  Sliders,
  Check,
} from 'lucide-react';
import { TravelMode } from '../../types/mobility';

export const DashboardScreen: React.FC = () => {
  const {
    currentUser,
    origin,
    setOrigin,
    destination,
    setDestination,
    routes,
    selectedRoute,
    setSelectedRoute,
    demoControls,
    setCurrentScreen,
    startNavigation,
    setIsDemoControlsOpen,
  } = useMobility();

  const [searchQuery, setSearchQuery] = useState('');
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const filteredDestinations = DEMO_LOCATIONS.filter(
    (l) => l.id !== origin.id && l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickModes: { mode: TravelMode; label: string; icon: React.ReactNode; screen: any }[] = [
    { mode: 'car', label: 'Car', icon: <Car size={16} />, screen: 'own_vehicle' },
    { mode: 'bike', label: 'Bike', icon: <Bike size={16} />, screen: 'own_vehicle' },
    { mode: 'bus', label: 'Bus', icon: <Bus size={16} />, screen: 'public_transport' },
    { mode: 'metro', label: 'Metro', icon: <TramFront size={16} />, screen: 'public_transport' },
    { mode: 'train', label: 'Train', icon: <Train size={16} />, screen: 'public_transport' },
    { mode: 'ev', label: 'EV', icon: <Zap size={16} />, screen: 'ev_charging' },
    { mode: 'all', label: 'Parking', icon: <SquareParking size={16} />, screen: 'parking' },
  ];

  const recommendedRoute = routes.find((r) => r.isRecommended) || routes[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Greeting & Location Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Welcome back
            </span>
            <span className="text-xs text-slate-400">Andhra Pradesh Intelligent Corridor</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
            Good Morning, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
            <MapPin size={13} className="text-blue-400" /> Current Origin:{' '}
            <b className="text-slate-200">{origin.name}</b> ({origin.city})
          </p>
        </div>

        {/* Destination Quick Input */}
        <div className="relative w-full md:w-96">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery || destination.name}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDestDropdown(true);
              }}
              onFocus={() => setShowDestDropdown(true)}
              placeholder="Where do you want to go?"
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
            />
            <button
              onClick={() => setCurrentScreen('planner')}
              className="absolute right-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-all shadow-md"
            >
              Plan
            </button>
          </div>

          {/* Destination Dropdown */}
          {showDestDropdown && (
            <div className="absolute left-0 right-0 mt-2 glass-panel rounded-2xl border border-slate-700 shadow-2xl p-2 z-50 max-h-60 overflow-y-auto">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                Select Destination
              </div>
              {filteredDestinations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setDestination(loc);
                    setSearchQuery('');
                    setShowDestDropdown(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {loc.name}
                    </div>
                    <div className="text-[10px] text-slate-400">{loc.city} • {loc.description}</div>
                  </div>
                  {destination.id === loc.id && <Check size={14} className="text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Mode Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Quick Modes:
        </span>
        {quickModes.map((qm, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentScreen(qm.screen)}
            className="px-3.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
          >
            <span className="text-blue-400">{qm.icon}</span>
            <span>{qm.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map + AI Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map View (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="h-[440px] w-full">
            <MapView height="100%" interactive={true} />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Showing Live Corridor: Kakinada ➔ Rajahmundry ➔ Visakhapatnam
            </span>
            <button
              onClick={() => setIsDemoControlsOpen(true)}
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              <Sliders size={12} /> Tweak simulation parameters
            </button>
          </div>
        </div>

        {/* Right: Smart Travel Suggestion & Multi-Factor Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Smart Travel Suggestion Card (Section 6 & 78) */}
          {recommendedRoute && (
            <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 relative overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-purple-950/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                      Smart Travel Suggestion
                    </span>
                    <div className="text-[10px] text-slate-400">AI multi-factor optimal ranking</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {recommendedRoute.confidence} Confidence
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {recommendedRoute.title}
                  </h3>
                  <span className="text-xl font-black text-blue-400 font-mono">
                    {recommendedRoute.totalDurationMin} min
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>₹{recommendedRoute.estimatedCost} est.</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {recommendedRoute.carbonKg} kg CO₂e ({recommendedRoute.carbonLevel} emissions)
                  </span>
                  <span>•</span>
                  <span>{recommendedRoute.transfers} transfer</span>
                </div>

                {/* AI Rationale list */}
                <div className="mt-3.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Why this was suggested:
                  </span>
                  {recommendedRoute.aiRationale.slice(0, 2).map((reason, i) => (
                    <div key={i} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => startNavigation(recommendedRoute)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Start Navigation</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setCurrentScreen('comparison')}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    Compare 5 Routes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4 Multi-Factor Quick Status Cards (Section 6) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Traffic Status */}
            <div
              onClick={() => setIsDemoControlsOpen(true)}
              className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Traffic Status</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    demoControls.trafficLevel === 'low'
                      ? 'bg-emerald-400'
                      : demoControls.trafficLevel === 'moderate'
                      ? 'bg-amber-400'
                      : 'bg-red-400 animate-ping'
                  }`}
                />
              </div>
              <div className="text-base font-bold text-white capitalize mt-1">
                {demoControls.trafficLevel}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Delay est: +{demoControls.trafficLevel === 'heavy' ? '18' : '6'} min
              </div>
            </div>

            {/* Weather Status */}
            <div
              onClick={() => setIsDemoControlsOpen(true)}
              className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Coastal Weather</span>
                <CloudRain size={13} className="text-cyan-400" />
              </div>
              <div className="text-base font-bold text-white mt-1">
                {demoControls.temperature}°C • {demoControls.weatherCondition.replace('_', ' ')}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Rain probability: {demoControls.rainProbability}%
              </div>
            </div>

            {/* Safety Alerts */}
            <div
              onClick={() => setCurrentScreen('safety_center')}
              className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Nearby Safety</span>
                <ShieldAlert size={13} className="text-amber-400" />
              </div>
              <div className="text-base font-bold text-white mt-1">
                {demoControls.activeIncident !== 'none' ? '1 Active Hazard' : '2 Reports Nearby'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Community reported & verified</div>
            </div>

            {/* Battery / Fuel & Parking */}
            <div
              onClick={() => setCurrentScreen('parking')}
              className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Smart Parking</span>
                <SquareParking size={13} className="text-purple-400" />
              </div>
              <div className="text-base font-bold text-white mt-1 capitalize">
                {demoControls.parkingAvailability}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                84% arrival spot probability
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

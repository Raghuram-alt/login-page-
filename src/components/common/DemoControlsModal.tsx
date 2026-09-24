import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  X,
  Sliders,
  AlertTriangle,
  CloudRain,
  Sun,
  BatteryCharging,
  Fuel,
  Users,
  SquareParking,
  Moon,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { TrafficLevel, WeatherCondition, CrowdLevel, IncidentType } from '../../types/mobility';

export const DemoControlsModal: React.FC = () => {
  const { demoControls, updateDemoControls, isDemoControlsOpen, setIsDemoControlsOpen } = useMobility();

  if (!isDemoControlsOpen) return null;

  const handleReset = () => {
    updateDemoControls({
      trafficLevel: 'moderate',
      weatherCondition: 'partly_cloudy',
      temperature: 28,
      rainProbability: 35,
      windSpeed: 16,
      batteryLevel: 68,
      fuelLevel: 55,
      crowdLevel: 'moderate',
      activeIncident: 'none',
      parkingAvailability: 'available',
      timeOfDay: '08:30 AM',
      isNightMode: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Live Demo & Simulation Controls</h2>
              <p className="text-xs text-slate-400">
                Adjust variables to test multi-factor AI rerouting, warnings & vehicle adaptation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700"
            >
              <RotateCcw size={12} /> Reset Defaults
            </button>
            <button
              onClick={() => setIsDemoControlsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {/* 1. Traffic Level */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-blue-400" /> Road Traffic Condition
              </span>
              <span className="text-[11px] font-semibold text-blue-400 uppercase">
                {demoControls.trafficLevel}
              </span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['low', 'moderate', 'heavy', 'gridlock'] as TrafficLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => updateDemoControls({ trafficLevel: level })}
                  className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    demoControls.trafficLevel === level
                      ? level === 'low'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : level === 'moderate'
                        ? 'bg-yellow-600 text-white shadow-md'
                        : level === 'heavy'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Heavy traffic increases car ETA and boosts Multi-Modal (Train/Metro) recommendation scores.
            </p>
          </div>

          {/* 2. Weather Condition */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <CloudRain size={14} className="text-cyan-400" /> Coastal Weather
              </span>
              <span className="text-[11px] font-semibold text-cyan-400 capitalize">
                {demoControls.weatherCondition.replace('_', ' ')}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['clear', 'partly_cloudy', 'rain', 'heavy_rain', 'flooding'] as WeatherCondition[]).map((w) => (
                <button
                  key={w}
                  onClick={() =>
                    updateDemoControls({
                      weatherCondition: w,
                      rainProbability: w === 'clear' ? 10 : w === 'rain' ? 70 : w === 'heavy_rain' ? 95 : 100,
                    })
                  }
                  className={`py-1.5 rounded-xl text-[11px] font-semibold capitalize transition-all ${
                    demoControls.weatherCondition === w
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {w.replace('_', ' ')}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Heavy rain & flooding triggers weather-awareness alerts and reduces two-wheeler safety ratings.
            </p>
          </div>

          {/* 3. EV Battery Level */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <BatteryCharging size={14} className="text-emerald-400" /> EV Battery Level
              </span>
              <span className="text-xs font-bold text-emerald-400">{demoControls.batteryLevel}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={demoControls.batteryLevel}
              onChange={(e) => updateDemoControls({ batteryLevel: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Low (20%)</span>
              <span>Med (50%)</span>
              <span>Full (100%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Below 35% triggers automatic highway EV Fast Charger stop insertion.
            </p>
          </div>

          {/* 4. ICE Fuel Level */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Fuel size={14} className="text-orange-400" /> Fuel Tank Level
              </span>
              <span className="text-xs font-bold text-orange-400">{demoControls.fuelLevel}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={demoControls.fuelLevel}
              onChange={(e) => updateDemoControls({ fuelLevel: Number(e.target.value) })}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Reserve (15%)</span>
              <span>Half (50%)</span>
              <span>Full (100%)</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Below 25% triggers Low Fuel Alert and suggests nearest petrol pump.
            </p>
          </div>

          {/* 5. Active Road Hazard / Incident */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-400" /> Active Incident Trigger
              </span>
              <span className="text-[11px] font-semibold text-amber-400 capitalize">
                {demoControls.activeIncident.replace('_', ' ')}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['none', 'pothole', 'accident', 'waterlogging', 'construction', 'broken_signal'] as IncidentType[]).map(
                (inc) => (
                  <button
                    key={inc}
                    onClick={() => updateDemoControls({ activeIncident: inc })}
                    className={`py-1.5 rounded-xl text-[10px] font-semibold capitalize transition-all ${
                      demoControls.activeIncident === inc
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {inc.replace('_', ' ')}
                  </button>
                )
              )}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Accidents & waterlogging inject immediate rerouting notifications during navigation.
            </p>
          </div>

          {/* 6. Smart Parking Availability */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <SquareParking size={14} className="text-purple-400" /> Destination Parking
              </span>
              <span className="text-[11px] font-semibold text-purple-400 capitalize">
                {demoControls.parkingAvailability}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['available', 'limited', 'full'] as const).map((prk) => (
                <button
                  key={prk}
                  onClick={() => updateDemoControls({ parkingAvailability: prk })}
                  className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    demoControls.parkingAvailability === prk
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {prk}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Full parking penalizes personal car mode and suggests park-and-ride public transit.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Simulated AI Parameters Synced
          </span>
          <button
            onClick={() => setIsDemoControlsOpen(false)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};

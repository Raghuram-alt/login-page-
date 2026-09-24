import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { MapView } from '../map/MapView';
import {
  Navigation,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle,
  Flag,
  ArrowRight,
  Shield,
  Clock,
  Compass,
  Zap,
  Fuel,
  SquareParking,
} from 'lucide-react';
import { speechService } from '../../services/speechService';

export const LiveNavigationScreen: React.FC = () => {
  const {
    selectedRoute,
    destination,
    navigation,
    advanceNavigationStep,
    triggerSimulatedIncident,
    acceptReroute,
    dismissReroute,
    completeTrip,
    safetyMode,
    toggleSafetyMode,
    demoControls,
    setCurrentScreen,
  } = useMobility();

  const currentStep = selectedRoute?.steps[navigation.currentStepIndex] || {
    instruction: `Proceed towards ${destination.name}`,
    distanceKm: navigation.remainingDistanceKm,
    durationMin: navigation.remainingTimeMin,
    mode: 'car' as const,
    icon: 'Navigation',
    detail: 'Follow highway signs and lane guidance',
  };

  const handleSpeakInstruction = () => {
    speechService.speak(currentStep.instruction);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col relative overflow-hidden rounded-3xl border border-slate-800 animate-fade-in">
      {/* Top Turn Guidance HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/80 shadow-2xl bg-slate-900/95 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Navigation size={24} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Step {navigation.currentStepIndex + 1} of {selectedRoute?.steps.length || 1}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400 font-semibold">{destination.name}</span>
              </div>
              <h2 className="text-base font-black text-white leading-tight mt-0.5">
                {currentStep.instruction}
              </h2>
              {currentStep.detail && (
                <p className="text-xs text-slate-400 mt-0.5">{currentStep.detail}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleSpeakInstruction}
              title="Repeat Voice Direction"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              <Volume2 size={18} className="text-emerald-400" />
            </button>
            <button
              onClick={advanceNavigationStep}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
            >
              <span>Next Turn</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Section 60: Real-time Rerouting Event Banner (Dynamic Road Incident Alert) */}
        {navigation.isReroutingSuggested && (
          <div className="mt-3 p-4 rounded-2xl glass-panel border border-amber-500/60 shadow-2xl bg-amber-950/90 text-white animate-bounce-subtle">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    ⚠ Incident Detected Ahead • AI Recalculating
                  </span>
                  <span className="text-[10px] text-amber-200/80">Just now</span>
                </div>
                <p className="text-xs text-amber-100 mt-1">
                  {navigation.incidentDiscovered ||
                    'Accident reported ahead on NH-16 bypass. Lane bottleneck formed.'}
                </p>
                <div className="text-[11px] text-emerald-300 font-semibold mt-1">
                  Faster Multi-Modal Corridor Found: Saves estimated 14 minutes delay.
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={acceptReroute}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    Accept Reroute
                  </button>
                  <button
                    onClick={dismissReroute}
                    className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    Keep Current Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Map View */}
      <div className="flex-1 w-full h-full relative">
        <MapView height="100%" interactive={true} />
      </div>

      {/* Bottom Floating Telemetry & Controls HUD */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/80 shadow-2xl bg-slate-900/95 flex flex-wrap items-center justify-between gap-4">
          {/* Remaining ETA & Distance */}
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Remaining Time
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {navigation.remainingTimeMin} min
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Distance
              </div>
              <div className="text-2xl font-black text-blue-400 font-mono">
                {navigation.remainingDistanceKm} km
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
            <div className="hidden sm:block">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Safety Mode
              </div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
                <Shield size={13} />
                <span>{safetyMode.enabled ? 'ACTIVE & MONITORED' : 'STANDBY'}</span>
              </div>
            </div>
          </div>

          {/* Action Simulation Triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={triggerSimulatedIncident}
              title="Simulate road hazard ahead to test dynamic AI rerouting"
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <AlertTriangle size={14} />
              <span className="hidden md:inline">Trigger Incident</span>
            </button>

            <button
              onClick={completeTrip}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
            >
              <CheckCircle size={14} />
              <span>Complete Trip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Glasses,
  Navigation,
  Volume2,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
  Camera,
  Maximize2,
} from 'lucide-react';
import { speechService } from '../../services/speechService';

export const ARNavigationScreen: React.FC = () => {
  const { destination } = useMobility();
  const [distanceRemaining, setDistanceRemaining] = useState(120);

  const handleVoice = () => {
    speechService.speak('In 120 meters, turn left at the smart intersection onto coastal expressway.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Glasses size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-purple-400">
            Next-Gen Spatial Computing
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Augmented Reality (AR) HUD Navigation</h1>
        <p className="text-xs text-slate-400">
          Simulated heads-up camera projection overlaying turn vectors and traffic signals directly onto the windshield/phone.
        </p>
      </div>

      {/* AR Camera Simulated Viewport (Section 51) */}
      <div className="relative w-full h-[480px] rounded-3xl overflow-hidden border border-purple-500/50 shadow-2xl bg-slate-950 flex flex-col justify-between p-6">
        {/* Simulated Camera Road Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 opacity-90 pointer-events-none">
          {/* Simulated Perspective Road Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 50% 100%, #3b82f6 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Top AR Header Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white border border-purple-500/40">
            <Camera size={14} className="text-purple-400 animate-pulse" />
            <span>AR DEMO • CAMERA SIMULATED</span>
          </div>

          <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Spatial Depth Tracking Active</span>
          </div>
        </div>

        {/* Center Hologram Floating Directional Arrow */}
        <div className="relative z-10 text-center flex flex-col items-center my-auto animate-bounce-subtle">
          <div className="w-28 h-28 rounded-full bg-blue-500/20 border-2 border-cyan-400/80 flex items-center justify-center text-cyan-300 shadow-2xl shadow-cyan-500/40 backdrop-blur-md">
            <ArrowUpRight size={56} className="transform rotate-[-45deg]" />
          </div>

          <div className="mt-4 glass-panel px-6 py-3 rounded-2xl border border-cyan-400/40 shadow-2xl bg-slate-900/90 max-w-md">
            <div className="text-xs uppercase tracking-widest font-black text-cyan-400">
              Turn Left in {distanceRemaining} Meters
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              Onto NH-16 Express Bypass ➔ {destination.name}
            </div>
          </div>
        </div>

        {/* Bottom AR Telemetry Bar */}
        <div className="relative z-10 glass-panel p-4 rounded-2xl border border-slate-700/80 bg-slate-900/95 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Corridor Speed</span>
              <div className="text-lg font-black text-white font-mono">54 km/h</div>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            {/* Section 52: Upcoming Traffic Signal Prediction */}
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Upcoming Signal (250m)</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>GREEN (22s remaining)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVoice}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Volume2 size={14} />
              <span>Voice Prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

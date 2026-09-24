import React, { useState, useEffect } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { AlertOctagon, PhoneCall, ShieldAlert, X, Radio, MapPin, CheckCircle } from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { safetyMode, cancelSOS, origin } = useMobility();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isDispatched, setIsDispatched] = useState(false);

  useEffect(() => {
    if (safetyMode.sosActive && !isDispatched && countdown === null) {
      setCountdown(5);
    }
  }, [safetyMode.sosActive]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsDispatched(true);
      setCountdown(null);
    }
  }, [countdown]);

  if (!safetyMode.sosActive) return null;

  const handleCancel = () => {
    setCountdown(null);
    setIsDispatched(false);
    cancelSOS();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-red-500/60 shadow-2xl p-6 text-center bg-slate-950/90 relative overflow-hidden">
        {/* Pulsing red beacon background */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-red-600/20 blur-3xl animate-pulse pointer-events-none"></div>

        <div className="w-16 h-16 rounded-3xl bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-red-500 mx-auto mb-4 animate-bounce">
          <AlertOctagon size={36} />
        </div>

        {countdown !== null ? (
          <div>
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-red-400 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
              SOS ACTIVATION INITIATED
            </span>
            <h2 className="text-xl font-black text-white mt-3">Emergency Signal Triggering</h2>
            <div className="my-6">
              <span className="text-6xl font-black text-red-400 font-mono">{countdown}</span>
              <p className="text-xs text-slate-400 mt-2">
                Dispatching simulated emergency beacon and SMS coordinates in {countdown} seconds...
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              Cancel SOS (False Alarm)
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold mb-3">
              <Radio size={14} className="animate-pulse" />
              <span>SOS ACTIVE • SIMULATED BROADCAST</span>
            </div>

            <h2 className="text-xl font-black text-white">Emergency Assistance Dispatched</h2>
            <p className="text-xs text-slate-300 mt-1">
              Your real-time GPS coordinates and route path have been forwarded to your trusted contacts.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={13} className="text-red-400" /> Current Broadcast GPS:
                </span>
                <span className="font-semibold text-white">{origin.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <PhoneCall size={13} className="text-emerald-400" /> Trusted Contacts Notified:
                </span>
                <span className="font-semibold text-emerald-400">2 / 2 Contacts</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <ShieldAlert size={13} className="text-blue-400" /> Emergency Service Demo:
                </span>
                <span className="font-semibold text-blue-400">112 Dispatch Queue (Demo Mode)</span>
              </div>
            </div>

            <div className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 mb-5 text-left">
              <b>Important Prototype Notice:</b> This is an AI Smart Mobility hackathon prototype. Real-world 112 emergency services are not contacted in demo mode.
            </div>

            <button
              onClick={handleCancel}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-600/40 transition-all"
            >
              Stand Down / End Emergency Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

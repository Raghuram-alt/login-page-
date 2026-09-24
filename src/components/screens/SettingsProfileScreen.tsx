import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Settings,
  ShieldCheck,
  User,
  Globe,
  Sliders,
  Bell,
  Lock,
  Check,
  Info,
} from 'lucide-react';

export const SettingsProfileScreen: React.FC = () => {
  const { currentUser, accessibility, updateAccessibility, addNotification } = useMobility();

  const [privacyToggles, setPrivacyToggles] = useState({
    locationHistory: true,
    personalizedRecs: true,
    tripHistoryLogging: true,
    liveTripSharing: true,
  });

  const [units, setUnits] = useState<'km' | 'miles'>('km');

  const handleToggle = (key: keyof typeof privacyToggles) => {
    setPrivacyToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      addNotification('Privacy Setting Updated', `${key} set to ${next[key] ? 'ENABLED' : 'DISABLED'}.`, 'info');
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Settings size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            User Configuration & Trust
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Platform Settings & Privacy Controls</h1>
        <p className="text-xs text-slate-400">
          Manage language preferences, metric units, voice guidance, and data privacy permissions.
        </p>
      </div>

      {/* User Profile Overview */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <User size={16} className="text-blue-400" /> Current Demo Profile
        </h2>

        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl ${currentUser.avatarColor} flex items-center justify-center text-white text-xl font-bold`}
          >
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="text-lg font-bold text-white">{currentUser.name}</div>
            <div className="text-xs text-slate-400">{currentUser.role}</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Corridor Hub: <b>{currentUser.city}</b> • Registered Vehicle: <b>{currentUser.vehicle.model}</b>
            </div>
          </div>
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe size={16} className="text-purple-400" /> Language & Regional Units
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Display & Audio Language</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'te', label: 'తెలుగు' },
                { id: 'hi', label: 'हिन्दी' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => updateAccessibility({ voiceLanguage: lang.id as any })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    accessibility.voiceLanguage === lang.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-2">Measurement Units</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUnits('km')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  units === 'km'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                Metric (km, km/h)
              </button>
              <button
                onClick={() => setUnits('miles')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  units === 'miles'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                Imperial (miles, mph)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 63: Privacy Policy & Data Toggles */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Privacy & Telemetry Permissions</h2>
          </div>
          <span className="text-[10px] text-slate-400">Zero Third-Party Advertising</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The prototype values user privacy. All simulated GPS positions, vehicle battery states, and personal commute diaries remain in your local browser sandbox and are never transmitted to third-party ad networks.
        </p>

        <div className="space-y-3 pt-2">
          {[
            {
              key: 'locationHistory' as const,
              label: 'Location History Recording',
              desc: 'Enables personalized commute departures and previous itinerary lookups.',
            },
            {
              key: 'personalizedRecs' as const,
              label: 'AI Personalized Recommendations',
              desc: 'Tailors route score rankings according to your historical transit mode choices.',
            },
            {
              key: 'tripHistoryLogging' as const,
              label: 'Trip History Logging',
              desc: 'Saves completed routes to your local carbon and financial ledger.',
            },
            {
              key: 'liveTripSharing' as const,
              label: 'Live Trip Sharing Permissions',
              desc: 'Allows trusted family contacts to observe real-time trip GPS during safety mode.',
            },
          ].map((item) => {
            const isEnabled = privacyToggles[item.key];
            return (
              <div
                key={item.key}
                onClick={() => handleToggle(item.key)}
                className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all select-none"
              >
                <div>
                  <div className="text-xs font-bold text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>

                <div
                  className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 shrink-0 ${
                    isEnabled ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

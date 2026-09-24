import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Shield,
  ShieldCheck,
  Share2,
  PhoneCall,
  AlertOctagon,
  Moon,
  Plus,
  Copy,
  Check,
  QrCode,
  Info,
  Users,
} from 'lucide-react';

export const SafetyModeScreen: React.FC = () => {
  const { safetyMode, toggleSafetyMode, toggleLiveTripSharing, addTrustedContact, activateSOS, addNotification } =
    useMobility();

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Family');
  const [copiedLink, setCopiedLink] = useState(false);
  const [nightSafetyActive, setNightSafetyActive] = useState(true);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://ai-mobility.ap.gov.in/track/demo-live-session-882');
    setCopiedLink(true);
    addNotification('Link Copied', 'Encrypted live trip tracking link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    addTrustedContact(newContactName, newContactPhone, newContactRelation);
    setNewContactName('');
    setNewContactPhone('');
    addNotification('Trusted Contact Added', `${newContactName} added to emergency notification list.`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Shield size={18} />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
              Personal Guardian Mode
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            Solo Traveler & Women's Safety System
          </h1>
          <p className="text-xs text-slate-400">
            Real-time live trip tracking, route deviation alert telemetry, and emergency SOS dispatch.
          </p>
        </div>

        {/* SOS Button */}
        <button
          onClick={activateSOS}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black tracking-wider shadow-xl shadow-red-600/40 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <AlertOctagon size={16} />
          <span>ONE-TAP SOS</span>
        </button>
      </div>

      {/* Section 14: Safety Mode Active State Card */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          safetyMode.enabled
            ? 'glass-panel border-emerald-500/50 bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-900/90 shadow-2xl shadow-emerald-950/30'
            : 'glass-panel border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                safetyMode.enabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Shield size={24} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Safety Mode Status
              </div>
              <h3 className="text-xl font-black text-white">
                {safetyMode.enabled ? 'Safety Mode ACTIVE' : 'Safety Mode Standby'}
              </h3>
            </div>
          </div>

          <button
            onClick={toggleSafetyMode}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg ${
              safetyMode.enabled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            {safetyMode.enabled ? 'Disable Safety Mode' : 'Enable Safety Mode'}
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Live Trip Sharing
            </span>
            <span
              className={`text-sm font-bold mt-1 block ${
                safetyMode.liveSharingActive ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {safetyMode.liveSharingActive ? 'Active (Live Link Synced)' : 'Disabled'}
            </span>
            <span className="text-[10px] text-slate-500">2 trusted contacts can track live GPS</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Route Deviation Alert
            </span>
            <span className="text-sm font-bold text-blue-400 mt-1 block">Active Telemetry</span>
            <span className="text-[10px] text-slate-500">Triggers prompt if deviating &gt;300m</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Emergency SOS Readiness
            </span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block">Online & Verified</span>
            <span className="text-[10px] text-slate-500">Fast 1-tap dispatch trigger ready</span>
          </div>
        </div>

        {/* Mandatory Warning (Section 14) */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
          <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <span>
            <b>Important System Disclaimer:</b> Safety mode provides assistance features, telemetry sharing, and verified route illumination data, but cannot guarantee personal safety in all circumstances.
          </span>
        </div>
      </div>

      {/* Section 16: Night Safety Route Feature */}
      <div className="glass-panel p-5 rounded-3xl border border-indigo-500/30 bg-indigo-950/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-indigo-400" />
            <span className="text-sm font-bold text-white">Night Safety Routing Preference</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            When enabled, the routing engine prioritizes verified well-lit avenues, active transit stops with CCTV, and routes with higher pedestrian activity.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-indigo-300 font-semibold mt-2">
            <span>✓ High Street Lighting</span>
            <span>•</span>
            <span>✓ Verified CCTV Corridors</span>
            <span>•</span>
            <span>✓ Fewer Reported Bottlenecks</span>
          </div>
        </div>

        <button
          onClick={() => setNightSafetyActive(!nightSafetyActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            nightSafetyActive
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {nightSafetyActive ? 'Night Mode Active' : 'Enable Night Routing'}
        </button>
      </div>

      {/* Live Trip Sharing Card */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Share2 size={16} className="text-blue-400" /> Live Trip Sharing Simulation
        </h3>
        <p className="text-xs text-slate-400">
          Share your real-time GPS location and ETA with family members or friends. Link automatically expires once trip is completed.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value="https://ai-mobility.ap.gov.in/track/demo-live-session-882"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 font-mono"
          />
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            {copiedLink ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Trusted Contacts Manager */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Trusted Contacts ({safetyMode.trustedContacts.length})</h3>
          </div>
          <span className="text-[11px] text-slate-400">Notified upon SOS trigger</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safetyMode.trustedContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {contact.relation}
                </span>
                <div className="text-sm font-bold text-white mt-0.5">{contact.name}</div>
                <div className="text-xs text-slate-400">{contact.phone}</div>
              </div>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Synced
              </span>
            </div>
          ))}
        </div>

        {/* Add Contact Form */}
        <form onSubmit={handleAddContactSubmit} className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Contact Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          />
          <input
            type="tel"
            placeholder="+91 Phone"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          />
          <select
            value={newContactRelation}
            onChange={(e) => setNewContactRelation(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          >
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="Campus Peer">Campus Peer</option>
            <option value="Guardian">Guardian</option>
          </select>
          <button
            type="submit"
            className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1"
          >
            <Plus size={14} /> Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

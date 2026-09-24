import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_INCIDENTS } from '../../data/incidentsData';
import {
  ShieldAlert,
  AlertTriangle,
  Send,
  CheckCircle,
  Plus,
  Clock,
  MapPin,
  ShieldCheck,
  Eye,
  Info,
} from 'lucide-react';
import { IncidentType } from '../../types/mobility';

export const SafetyCenterScreen: React.FC = () => {
  const { demoControls, addNotification } = useMobility();
  const [incidentsList, setIncidentsList] = useState(DEMO_INCIDENTS);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState<IncidentType>('pothole');
  const [showReportForm, setShowReportForm] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newReport = {
      id: `user_inc_${Date.now()}`,
      type: newType,
      title: newTitle,
      locationName: newLocation,
      lat: 16.965,
      lng: 82.24,
      reportedMinutesAgo: 1,
      status: 'Community reported' as const,
      impact: 'Caution advised' as const,
    };

    setIncidentsList([newReport, ...incidentsList]);
    setNewTitle('');
    setNewLocation('');
    setShowReportForm(false);
    addNotification('Hazard Reported', 'Your community road report has been submitted to the safety mesh.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldAlert size={18} />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Corridor Safety Center
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Road Hazards & Verified Incident Telemetry</h1>
          <p className="text-xs text-slate-400">
            Real-time community reports, monsoon waterlogging alerts, construction diversions, and signal health.
          </p>
        </div>

        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Report Road Hazard</span>
        </button>
      </div>

      {/* Safety Phrasing Disclaimer (Section 82) */}
      <div className="glass-panel p-4 rounded-2xl border border-blue-500/20 bg-blue-950/10 text-xs text-slate-300 flex items-start gap-3">
        <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <b>Responsible Mobility Notice:</b> Safety scores evaluate empirical telemetry including verified incidents, lighting infrastructure, and weather risk factors. We never categorize geographical neighborhoods as inherently unsafe.
        </p>
      </div>

      {/* Report Form Drawer */}
      {showReportForm && (
        <form
          onSubmit={handleReportSubmit}
          className="glass-panel p-5 rounded-3xl border border-amber-500/40 bg-slate-900/95 space-y-4 animate-slide-up"
        >
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-400" />
            <span>Submit a Community Road Safety Report</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Hazard Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as IncidentType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              >
                <option value="pothole">Monsoon Pothole Cluster</option>
                <option value="waterlogging">Waterlogging / Flooded Underpass</option>
                <option value="accident">Accident / Road Bottleneck</option>
                <option value="construction">Construction / Lane Diversion</option>
                <option value="broken_signal">Broken Traffic Signal</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Location Details</label>
              <input
                type="text"
                placeholder="e.g. Collectorate Circle or NH-16 Flyover"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Short Description</label>
            <input
              type="text"
              placeholder="e.g. Deep water logging under railway bridge; two-wheelers avoid right lane"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowReportForm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Send size={13} />
              <span>Broadcast Community Report</span>
            </button>
          </div>
        </form>
      )}

      {/* Incidents List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-400" /> Active Hazards Along Corridor ({incidentsList.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incidentsList.map((inc) => (
            <div
              key={inc.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {inc.impact}
                    </span>
                    <span className="text-xs text-slate-400">{inc.reportedMinutesAgo}m ago</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5">{inc.title}</h3>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <MapPin size={13} className="text-amber-400" />
                <span>{inc.locationName}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  Verification: <b className="text-emerald-400">{inc.status}</b>
                </span>
                <span className="text-blue-400 font-medium">Factored into AI route score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

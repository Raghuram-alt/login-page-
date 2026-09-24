import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  DownloadCloud,
  CheckCircle,
  HardDrive,
  Wifi,
  WifiOff,
  RefreshCw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const OfflineMapsScreen: React.FC = () => {
  const { addNotification } = useMobility();
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const [areas, setAreas] = useState([
    {
      id: 'area_kkn',
      name: 'Kakinada Urban & Port District',
      size: '42 MB',
      status: 'Downloaded',
      lastUpdated: 'Yesterday, 04:00 PM',
    },
    {
      id: 'area_vzg',
      name: 'Greater Visakhapatnam & IT SEZ',
      size: '78 MB',
      status: 'Downloaded',
      lastUpdated: '3 days ago',
    },
    {
      id: 'area_rjy',
      name: 'Rajahmundry & Godavari Corridor',
      size: '35 MB',
      status: 'Available to Download',
      lastUpdated: 'Online only',
    },
  ]);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setAreas((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'Downloaded', lastUpdated: 'Just now' } : a))
      );
      setDownloadingId(null);
      addNotification('Offline Map Cached', 'Vector road geometry downloaded to local cache.', 'success');
    }, 1800);
  };

  const handleToggleOffline = () => {
    const next = !isOfflineSimulated;
    setIsOfflineSimulated(next);
    if (next) {
      addNotification('Offline Mode Active', 'Basic routing enabled from cached tiles. Live feed paused.', 'warning');
    } else {
      addNotification('Network Restored', 'Syncing complete: Traffic, weather, and incidents updated.', 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <DownloadCloud size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Resilient Field Architecture
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Offline Maps & Sync Engine</h1>
        <p className="text-xs text-slate-400">
          Cache regional OpenStreetMap vector tiles for uninterrupted routing even through rural highway network dead zones.
        </p>
      </div>

      {/* Section 50: Offline Mode Toggle Banner */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isOfflineSimulated
            ? 'glass-panel border-amber-500/50 bg-amber-950/20'
            : 'glass-panel border-emerald-500/30 bg-emerald-950/10'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isOfflineSimulated ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {isOfflineSimulated ? <WifiOff size={24} /> : <Wifi size={24} />}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Network Status Simulation
              </div>
              <h3 className="text-lg font-black text-white">
                {isOfflineSimulated ? 'OFFLINE MODE SIMULATED' : 'ONLINE • LIVE DATA STREAMING'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isOfflineSimulated
                  ? 'Basic vector navigation active via local cache. Live traffic/weather paused.'
                  : 'All real-time APIs, GPS telemetry, and cloud routing enabled.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleOffline}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 ${
              isOfflineSimulated
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isOfflineSimulated ? 'Restore Online Network' : 'Simulate Offline Mode'}
          </button>
        </div>
      </div>

      {/* Downloaded Areas List */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <HardDrive size={16} className="text-blue-400" /> Offline Regional Packages
        </h2>

        <div className="space-y-3">
          {areas.map((area) => (
            <div
              key={area.id}
              className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{area.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded-full">
                    {area.size}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Status: <b className="text-slate-200">{area.status}</b> • Last sync: {area.lastUpdated}
                </div>
              </div>

              {area.status === 'Downloaded' ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
                  <CheckCircle size={15} />
                  <span>Cached Locally</span>
                </div>
              ) : (
                <button
                  onClick={() => handleDownload(area.id)}
                  disabled={downloadingId === area.id}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <DownloadCloud size={14} className={downloadingId === area.id ? 'animate-bounce' : ''} />
                  <span>{downloadingId === area.id ? 'Downloading...' : 'Download Area (35 MB)'}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

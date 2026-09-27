import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { ScreenId } from '../../types/mobility';
import {
  LayoutDashboard,
  Navigation,
  Compass,
  Bus,
  Car,
  Zap,
  Fuel,
  SquareParking,
  ShieldAlert,
  Shield,
  Accessibility,
  Clock,
  History,
  Leaf,
  Users,
  Activity,
  Glasses,
  DownloadCloud,
  Settings,
  LogIn,
} from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { currentScreen, setCurrentScreen, safetyMode, demoControls } = useMobility();

  const navigationItems: { category: string; items: NavItem[] }[] = [
    {
      category: 'Trip & Navigation',
      items: [
        { id: 'dashboard', label: 'Main Dashboard', icon: <LayoutDashboard size={18} /> },
        { id: 'planner', label: 'Trip Planner', icon: <Compass size={18} /> },
        { id: 'comparison', label: 'Route Comparison', icon: <Navigation size={18} /> },
        { id: 'navigation', label: 'Live Navigation', icon: <Navigation size={18} />, badge: 'Turn-by-turn' },
        { id: 'commute', label: 'My Commute (AI)', icon: <Clock size={18} /> },
      ],
    },
    {
      category: 'Mobility Modes',
      items: [
        { id: 'public_transport', label: 'Bus • Metro • Train', icon: <Bus size={18} /> },
        { id: 'own_vehicle', label: 'Own Vehicle (2W/4W)', icon: <Car size={18} /> },
        { id: 'ev_charging', label: 'EV & Battery Swap', icon: <Zap size={18} /> },
        { id: 'fuel', label: 'Fuel & Low-Fuel Alert', icon: <Fuel size={18} /> },
        { id: 'parking', label: 'Smart Parking (AI)', icon: <SquareParking size={18} /> },
      ],
    },
    {
      category: 'Safety & Assistance',
      items: [
        {
          id: 'safety_mode',
          label: 'Safety Mode & SOS',
          icon: <Shield size={18} />,
          badge: safetyMode.enabled ? 'ACTIVE' : undefined,
        },
        {
          id: 'safety_center',
          label: 'Safety Center & Hazards',
          icon: <ShieldAlert size={18} />,
          badge: demoControls.activeIncident !== 'none' ? 'Hazard' : undefined,
        },
        { id: 'accessibility', label: 'Accessibility', icon: <Accessibility size={18} /> },
      ],
    },
    {
      category: 'Analytics & Social',
      items: [
        { id: 'carbon', label: 'Carbon Dashboard', icon: <Leaf size={18} /> },
        { id: 'trip_history', label: 'Trip History & Diary', icon: <History size={18} /> },
        { id: 'family_trip', label: 'Family & Group Trips', icon: <Users size={18} /> },
        { id: 'vehicle_health', label: 'Vehicle Health', icon: <Activity size={18} /> },
        { id: 'ar_demo', label: 'AR Navigation Demo', icon: <Glasses size={18} /> },
        { id: 'offline_maps', label: 'Offline Maps', icon: <DownloadCloud size={18} /> },
        { id: 'settings', label: 'Settings & Privacy', icon: <Settings size={18} /> },
        { id: 'login', label: 'Sign In / Account', icon: <LogIn size={18} /> },
      ],
    },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 h-full flex flex-col justify-between shrink-0 select-none">
      {/* Scrollable Nav Items */}
      <div className="p-3 overflow-y-auto space-y-5 flex-1">
        {navigationItems.map((group, idx) => (
          <div key={idx}>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-1.5">
              {group.category}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                          item.badge === 'ACTIVE'
                            ? 'bg-emerald-400 text-emerald-950 animate-pulse'
                            : item.badge === 'Hazard'
                            ? 'bg-amber-400 text-amber-950'
                            : 'bg-blue-400/20 text-blue-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Corridor Quick Info Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-400">
        <div className="flex items-center justify-between font-semibold text-slate-300">
          <span>Active Corridor</span>
          <span className="text-blue-400">AP NH-16</span>
        </div>
        <div className="mt-0.5 text-[10px] text-slate-500">
          Kakinada ↔ Rajahmundry ↔ Vizag
        </div>
      </div>
    </aside>
  );
};

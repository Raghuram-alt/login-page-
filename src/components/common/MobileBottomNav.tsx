import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import { LayoutDashboard, Compass, History, Shield, User, Menu } from 'lucide-react';

export const MobileBottomNav: React.FC<{ onOpenDrawer: () => void }> = ({ onOpenDrawer }) => {
  const { currentScreen, setCurrentScreen, safetyMode } = useMobility();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/90 py-1.5 px-3 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => setCurrentScreen('dashboard')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors ${
          currentScreen === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <LayoutDashboard size={19} />
        <span className="text-[10px]">Home</span>
      </button>

      <button
        onClick={() => setCurrentScreen('planner')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors ${
          currentScreen === 'planner' || currentScreen === 'comparison'
            ? 'text-blue-400 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Compass size={19} />
        <span className="text-[10px]">Plan</span>
      </button>

      <button
        onClick={() => setCurrentScreen('safety_mode')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors relative ${
          currentScreen === 'safety_mode' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Shield size={19} />
        {safetyMode.enabled && (
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        )}
        <span className="text-[10px]">Safety</span>
      </button>

      <button
        onClick={() => setCurrentScreen('trip_history')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-colors ${
          currentScreen === 'trip_history' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <History size={19} />
        <span className="text-[10px]">Trips</span>
      </button>

      <button
        onClick={onOpenDrawer}
        className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-slate-400 hover:text-slate-200"
      >
        <Menu size={19} />
        <span className="text-[10px]">More</span>
      </button>
    </nav>
  );
};

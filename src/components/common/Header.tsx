import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_USERS } from '../../data/vehicleData';
import {
  Compass,
  Sliders,
  PlayCircle,
  Shield,
  Bell,
  X,
  Volume2,
  VolumeX,
  CheckCircle,
  AlertTriangle,
  Info,
  LogOut,
  LogIn,
} from 'lucide-react';
import { speechService } from '../../services/speechService';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchUser,
    demoControls,
    isDemoControlsOpen,
    setIsDemoControlsOpen,
    setIsTourOpen,
    safetyMode,
    toggleSafetyMode,
    activateSOS,
    notifications,
    dismissNotification,
    setCurrentScreen,
    isAuthenticated,
    logoutUser,
  } = useMobility();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(speechService.getMuted());

  const handleAudioToggle = () => {
    const next = !isAudioMuted;
    speechService.setMuted(next);
    setIsAudioMuted(next);
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Compass className="text-white animate-spin-slow" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
                AI SMART MOBILITY
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.4 Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              GPS • Weather-Aware • Safety-Aware • Multi-Modal Transit System
            </p>
          </div>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Section 77 & 88: RUN SMART MOBILITY DEMO prominent button */}
          <button
            onClick={() => setIsTourOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all transform hover:scale-[1.02]"
          >
            <PlayCircle size={15} className="animate-pulse" />
            <span className="hidden xs:inline">RUN SMART MOBILITY DEMO</span>
            <span className="xs:hidden">DEMO TOUR</span>
          </button>

          {/* Section 76: Demo Controls Button */}
          <button
            onClick={() => setIsDemoControlsOpen(!isDemoControlsOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              isDemoControlsOpen
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700/80'
            }`}
          >
            <Sliders size={14} />
            <span className="hidden md:inline">Demo Controls</span>
          </button>

          {/* Audio TTS Mute/Unmute */}
          <button
            onClick={handleAudioToggle}
            title={isAudioMuted ? 'Voice Guidance Muted (Click to Unmute)' : 'Voice Guidance Active'}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isAudioMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-emerald-400" />}
          </button>

          {/* Safety Mode Indicator & SOS Quick Access */}
          <button
            onClick={() => {
              setCurrentScreen('safety_mode');
              toggleSafetyMode();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              safetyMode.enabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield size={14} className={safetyMode.enabled ? 'fill-emerald-400 text-emerald-400' : ''} />
            <span className="hidden lg:inline">{safetyMode.enabled ? 'Safety Active' : 'Safety Mode'}</span>
          </button>

          <button
            onClick={activateSOS}
            className="px-2.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-black tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-1 transition-all"
          >
            <span>SOS</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Bell size={13} className="text-blue-400" /> Notifications & Alerts
                  </span>
                  <button onClick={() => setShowNotifMenu(false)} className="text-slate-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-2 max-h-64 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-xs text-slate-400 text-center py-4">No notifications yet.</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs relative ${
                          n.type === 'alert'
                            ? 'bg-red-500/10 border-red-500/30 text-red-200'
                            : n.type === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                            : n.type === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="font-semibold text-white">{n.title}</div>
                          <button
                            onClick={() => dismissNotification(n.id)}
                            className="text-slate-400 hover:text-white ml-2"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-300 mt-1">{n.body}</div>
                        <div className="text-[9px] text-slate-400 mt-1.5">{n.time}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className={`w-7 h-7 rounded-lg ${currentUser.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden xl:block pr-1">
                <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400">{currentUser.city}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-2 z-50">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">
                  Switch Demo Persona
                </div>
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition-colors ${
                      user.id === currentUser.id ? 'bg-blue-600/20 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
                    </div>
                  </button>
                ))}

                <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentScreen('login');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogIn size={13} />
                    <span>View Login Screen</span>
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

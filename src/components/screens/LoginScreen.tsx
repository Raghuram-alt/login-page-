import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_USERS } from '../../data/vehicleData';
import {
  Compass,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  HelpCircle,
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginUser, setCurrentScreen } = useMobility();

  // Mode: sign_in or sign_up
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('aarav.sharma@campus.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Validation & Loading States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Quick Persona selector
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('user_aarav');

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!email.trim()) {
      setEmailError('Email address is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await loginUser(email, selectedPersonaId);
    } catch {
      setGeneralError('Invalid credentials. Please verify your email and password.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    await loginUser('google.user@nexmobility.io', selectedPersonaId);
    setIsGoogleLoading(false);
  };

  const handleSelectPersona = (user: (typeof DEMO_USERS)[0]) => {
    setSelectedPersonaId(user.id);
    setEmail(`${user.name.toLowerCase().replace(' ', '.')}@mobility.io`);
    setPassword('SecurePass2026!');
    setFullName(user.name);
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
  };

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      return;
    }
    setForgotSuccess(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden glass-panel border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 bg-slate-950/90">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Brand Story & Kinetic Route Motif (Desktop) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#070e22] via-[#091535] to-[#040918] border-b lg:border-b-0 lg:border-r border-slate-800/80">
          {/* Subtle Route Line Background Motif */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <svg
              className="w-full h-full"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kinetic curved transit lines */}
              <path
                d="M-50 450 C 150 420, 200 250, 400 220 S 550 80, 650 40"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path
                d="M-30 200 C 100 240, 250 400, 450 360 S 580 480, 650 500"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <path
                d="M100 650 C 180 500, 320 480, 380 300 S 520 150, 620 -20"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />

              {/* Glowing transit junction nodes */}
              <circle cx="200" cy="250" r="7" fill="#06b6d4" className="animate-pulse" />
              <circle cx="200" cy="250" r="15" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
              <circle cx="400" cy="220" r="6" fill="#38bdf8" />
              <circle cx="320" cy="480" r="8" fill="#10b981" />
              <circle cx="450" cy="360" r="6" fill="#818cf8" />
            </svg>
          </div>

          {/* Top Brand Logo & Pill */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25">
                <Compass size={24} className="text-slate-950" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-200">
                  NexMobility
                </span>
                <span className="block text-[11px] font-semibold text-cyan-400 tracking-wider uppercase">
                  AI Smart Multi-Modal Transit
                </span>
              </div>
            </div>

            {/* Inspiring Headline & Value Statement */}
            <div className="mt-10 sm:mt-14 max-w-md">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold mb-4">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Andhra Pradesh Mobility Network</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.15]">
                Move effortlessly through your city.
              </h1>

              <p className="mt-3.5 text-sm text-slate-300 leading-relaxed">
                Connect seamlessly across city buses, metro lines, express trains, EV fast chargers, battery swap hubs, and smart parking with explainable AI routing.
              </p>
            </div>
          </div>

          {/* Live Corridor Stats Pill */}
          <div className="relative z-10 mt-8 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Live Network Telemetry
                </span>
                <span className="text-cyan-400 font-mono">18,400+ Active</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div>
                  <div className="text-base font-black text-white font-mono">52 min</div>
                  <div className="text-[10px] text-slate-400">Opt. Corridor ETA</div>
                </div>
                <div>
                  <div className="text-base font-black text-emerald-400 font-mono">-42%</div>
                  <div className="text-[10px] text-slate-400">CO₂e Footprint</div>
                </div>
                <div>
                  <div className="text-base font-black text-cyan-400 font-mono">99.4%</div>
                  <div className="text-[10px] text-slate-400">Transit Reliability</div>
                </div>
              </div>
            </div>

            {/* Trust Quote */}
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <Shield size={13} className="text-cyan-400 shrink-0" />
              <span>Encrypted location privacy • Zero third-party behavioral tracking</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Polished Login / Authentication Form        */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between bg-slate-950/70">
          <div>
            {/* Form Title & Subtitle */}
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp
                  ? 'Join the intelligent mobility platform for greener, faster journeys.'
                  : 'Sign in to access your saved commutes, live transit alerts, and digital passes.'}
              </p>
            </div>

            {/* Quick Demo Persona Switcher (Super user-friendly for demos) */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                  <Zap size={13} className="text-cyan-400" /> Quick 1-Click Demo Sign-In
                </span>
                <span className="text-[10px] text-slate-500">Auto-fills credentials</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {DEMO_USERS.map((user) => {
                  const isSelected = selectedPersonaId === user.id;
                  return (
                    <button
                      type="button"
                      key={user.id}
                      onClick={() => handleSelectPersona(user)}
                      className={`p-1.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500/60 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[11px] font-bold truncate leading-tight">{user.name.split(' ')[0]}</div>
                      <div className="text-[9px] text-slate-400 truncate">{user.role.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Google OAuth Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 text-white text-xs font-semibold flex items-center justify-center gap-3 transition-all focus:ring-2 focus:ring-cyan-400 focus:outline-none min-h-[48px]"
              >
                {isGoogleLoading ? (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            {/* General Error Banner */}
            {generalError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px] transition-all"
                  />
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1.5">
                  <span>Email address</span>
                  {emailError && <span className="text-red-400 font-normal text-[11px]">{emailError}</span>}
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-slate-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="name@company.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px] transition-all ${
                      emailError ? 'border-red-500/60' : 'border-slate-700/80'
                    }`}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold transition-colors focus:outline-none focus:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-slate-500" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Enter your password"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    className={`w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-900 border text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[48px] transition-all ${
                      passwordError ? 'border-red-500/60' : 'border-slate-700/80'
                    }`}
                  />
                  {/* Show/Hide Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordError && (
                  <span className="text-red-400 text-[11px] mt-1 block">{passwordError}</span>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 accent-cyan-500 cursor-pointer focus:ring-2 focus:ring-cyan-400"
                  />
                  <span>Remember my device for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 min-h-[48px] focus:ring-2 focus:ring-cyan-400 focus:outline-none transform active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>{isSignUp ? 'Create NexMobility Account' : 'Sign In to Dashboard'}</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Switcher & Guest Shortcut */}
          <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-3 text-center">
            <div className="text-xs text-slate-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setGeneralError('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors ml-1 focus:outline-none focus:underline"
              >
                {isSignUp ? 'Sign in' : 'Create account'}
              </button>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  loginUser('guest.commuter@ap.gov.in', 'user_aarav');
                }}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto group"
              >
                <span>Want to test immediately?</span>
                <span className="text-cyan-400 font-semibold group-hover:underline">
                  Continue as Guest Explorer ➔
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-slate-700/80 p-6 bg-slate-900 shadow-2xl relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <HelpCircle size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">Reset your password</h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your registered email address and we'll dispatch a simulated secure login link.
            </p>

            {forgotSuccess ? (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Password Reset Link Sent!</span>
                </div>
                <p>
                  A simulated password recovery link has been dispatched to <b>{forgotEmail}</b>. You may also use the 1-click demo personas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSuccess(false);
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendResetLink} className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Registered Email</label>
                  <input
                    type="email"
                    value={forgotEmail || email}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Send Reset Instructions</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Accessibility,
  Volume2,
  Eye,
  Languages,
  Check,
  CheckCircle,
  Footprints,
  Sparkles,
} from 'lucide-react';
import { speechService } from '../../services/speechService';

export const AccessibilityScreen: React.FC = () => {
  const { accessibility, updateAccessibility, addNotification } = useMobility();

  const handleTestAudio = () => {
    let sample = 'Step-free route selected. Turn left towards the accessible elevator ramp in 150 meters.';
    if (accessibility.voiceLanguage === 'te') {
      sample = 'మెట్లు లేని మార్గం ఎంపిక చేయబడింది. 150 మీటర్లలో ర్యాంప్ వైపు వెళ్ళండి.';
    } else if (accessibility.voiceLanguage === 'hi') {
      sample = 'व्हीलचेयर अनुकूल मार्ग चयनित है। 150 मीटर में रैंप की ओर मुड़ें।';
    }
    speechService.speak(sample);
    addNotification('Audio Guidance Test', sample, 'info');
  };

  const toggles = [
    {
      key: 'wheelchairAccessible' as const,
      label: 'Wheelchair Accessible Routes',
      desc: 'Requires ramp gradients ≤ 1:12 and wide turnstiles at all transit stations.',
    },
    {
      key: 'stepFreeRoute' as const,
      label: 'Step-Free Navigation',
      desc: 'Completely eliminates curbs, escalators, and unramped stairwells.',
    },
    {
      key: 'avoidStairs' as const,
      label: 'Avoid Stairs & Foot-Over-Bridges',
      desc: 'Routes exclusively through ground-level crossings or elevator-equipped skywalks.',
    },
    {
      key: 'minimizeWalking' as const,
      label: 'Minimize Walking Distances',
      desc: 'Selects transit boarding points with less than 250 meters walking required.',
    },
    {
      key: 'elevatorPreferred' as const,
      label: 'Elevator Preferred Mode',
      desc: 'Flags working elevator bays in Metro and Railway terminals.',
    },
    {
      key: 'audioGuidance' as const,
      label: 'Spoken Audio Turn Guidance (TTS)',
      desc: 'Automatically reads out maneuvers and public transport arrival announcements.',
    },
    {
      key: 'highContrast' as const,
      label: 'High Contrast Color Palette',
      desc: 'Optimizes color borders and text readability for low-vision travelers.',
    },
    {
      key: 'largeText' as const,
      label: 'Enlarged Text & Large Touch Targets',
      desc: 'Increases button hit areas to 48px minimum for tactile ease.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Accessibility size={18} />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-blue-400">
            Universal Inclusive Travel
          </span>
        </div>
        <h1 className="text-2xl font-black text-white mt-1">Accessibility & Audio Assistance</h1>
        <p className="text-xs text-slate-400">
          Tailored mobility preferences ensuring barrier-free journeys for elderly and disabled commuters.
        </p>
      </div>

      {/* Section 36: Wheelchair Routing Verification Card */}
      <div className="glass-panel p-5 rounded-3xl border border-blue-500/30 bg-blue-950/15 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Accessibility size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-white">Verified Wheelchair Infrastructure</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
            Corridor Audited
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>Step-free platforms</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>Operational elevators</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>Low-floor E-Buses</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-200">
            <CheckCircle size={15} className="text-emerald-400" />
            <span>Tactile paving paths</span>
          </div>
        </div>
      </div>

      {/* Section 38: Voice Guidance & Multilingual Audio Selector */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-white">Voice Guidance Language</h3>
          </div>
          <button
            onClick={handleTestAudio}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <Volume2 size={13} />
            <span>Test Audio Speech</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(['en', 'te', 'hi'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => updateAccessibility({ voiceLanguage: lang })}
              className={`p-3 rounded-2xl border text-center transition-all ${
                accessibility.voiceLanguage === lang
                  ? 'bg-purple-600/20 border-purple-500 text-white font-bold shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-sm">
                {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు (Telugu)' : 'हिन्दी (Hindi)'}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'en' ? 'Default Audio' : lang === 'te' ? 'ఆంధ్రప్రదేశ్ స్థానిక భాష' : 'राष्ट्रीय भाषा'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {toggles.map((item) => {
          const isEnabled = accessibility[item.key];
          return (
            <div
              key={item.key}
              onClick={() => updateAccessibility({ [item.key]: !isEnabled })}
              className={`p-4 rounded-3xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                isEnabled
                  ? 'glass-panel border-blue-500/50 bg-blue-950/20'
                  : 'glass-panel border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isEnabled ? 'bg-blue-600 text-white' : 'border border-slate-700 bg-slate-900'
                }`}
              >
                {isEnabled && <Check size={14} />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{item.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle,
  Sparkles,
  MapPin,
  Clock,
  Shield,
  Zap,
  Leaf,
  Navigation,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { DEMO_LOCATIONS } from '../../data/locations';

interface TourStepDef {
  number: number;
  title: string;
  badge: string;
  description: string;
  actionText?: string;
  actionHandler?: () => void;
  targetScreen?: string;
}

export const PresentationTourModal: React.FC = () => {
  const {
    isTourOpen,
    setIsTourOpen,
    tourStep,
    setTourStep,
    setCurrentScreen,
    setOrigin,
    setDestination,
    updateDemoControls,
    startNavigation,
    triggerSimulatedIncident,
    acceptReroute,
    completeTrip,
    toggleSafetyMode,
    safetyMode,
  } = useMobility();

  if (!isTourOpen) return null;

  const tourSteps: TourStepDef[] = [
    {
      number: 1,
      title: 'Detect Origin GPS Location',
      badge: 'Location Engine',
      description: 'System locks to user position at Kakinada Town Railway Station terminal with simulated high-accuracy GPS (±4m).',
      actionText: 'Set Origin: Kakinada Town',
      actionHandler: () => {
        setOrigin(DEMO_LOCATIONS[0]);
        setCurrentScreen('dashboard');
      },
    },
    {
      number: 2,
      title: 'Select Destination',
      badge: 'Destination Search',
      description: 'User selects destination: Visakhapatnam Junction / Central. The 140km coastal NH-16 transit corridor is initialized.',
      actionText: 'Set Destination: Visakhapatnam',
      actionHandler: () => {
        setDestination(DEMO_LOCATIONS[7]);
        setCurrentScreen('planner');
      },
    },
    {
      number: 3,
      title: 'Analyze Real-Time Traffic',
      badge: 'Traffic Layer',
      description: 'Traffic engine inspects congestions near Tuni, Anakapalle bypass, and urban junctions. Moderate-to-heavy delays are computed.',
      actionText: 'Simulate Heavy Traffic',
      actionHandler: () => {
        updateDemoControls({ trafficLevel: 'heavy' });
        setCurrentScreen('dashboard');
      },
    },
    {
      number: 4,
      title: 'Analyze Coastal Weather',
      badge: 'Weather Module',
      description: 'Precipitation probability, wet-road braking factors, and crosswinds are evaluated. Two-wheelers receive cautionary speed advice.',
      actionText: 'Simulate Monsoon Rain',
      actionHandler: () => {
        updateDemoControls({ weatherCondition: 'rain', rainProbability: 80 });
        setCurrentScreen('dashboard');
      },
    },
    {
      number: 5,
      title: 'Analyze Road Safety & Incidents',
      badge: 'Safety Engine',
      description: 'Active potholes, construction zones, and community-reported alerts ahead are cross-referenced with route geometries.',
      actionText: 'View Safety Center',
      actionHandler: () => setCurrentScreen('safety_center'),
    },
    {
      number: 6,
      title: 'Analyze Fuel & Battery Reserve',
      badge: 'Vehicle Telemetry',
      description: 'Vehicle fuel and EV battery are compared against destination distance. Charging/fuel stops are dynamically scheduled if needed.',
      actionText: 'Check EV & Battery Swapping',
      actionHandler: () => setCurrentScreen('ev_charging'),
    },
    {
      number: 7,
      title: 'Analyze Public Transport Availability',
      badge: 'Transit Integration',
      description: 'Express trains (Vande Bharat / Janmabhoomi), APSRTC Luxury buses, and Metro lines are queried for live schedules and crowd levels.',
      actionText: 'View Public Transit',
      actionHandler: () => setCurrentScreen('public_transport'),
    },
    {
      number: 8,
      title: 'Analyze Smart Parking at Destination',
      badge: 'Smart Parking',
      description: 'AI parking prediction evaluates probability of finding an open spot at arrival time (e.g. 84% at 10:45 AM).',
      actionText: 'View Parking Hubs',
      actionHandler: () => setCurrentScreen('parking'),
    },
    {
      number: 9,
      title: 'Calculate Predictive ETA',
      badge: 'Predictive ETA',
      description: 'Predictive algorithm computes: Base Time + Traffic Delay + Weather Delay + Transfers. Displays ETA with confidence rating.',
      actionText: 'View Route Planner',
      actionHandler: () => setCurrentScreen('planner'),
    },
    {
      number: 10,
      title: 'Calculate Multi-Modal Cost Breakdown',
      badge: 'Cost Estimator',
      description: 'Transparent fare calculation: Ticket costs, fuel per km, toll fees, parking charges, and first-mile/last-mile transit.',
      actionText: 'Compare Route Costs',
      actionHandler: () => setCurrentScreen('comparison'),
    },
    {
      number: 11,
      title: 'Calculate Carbon Footprint',
      badge: 'Green Mobility',
      description: 'Estimates kg CO₂e for Car vs Train vs EV vs Bike, highlighting sustainable green travel alternatives.',
      actionText: 'View Carbon Dashboard',
      actionHandler: () => setCurrentScreen('carbon'),
    },
    {
      number: 12,
      title: 'Multi-Modal Route Alternatives Comparison',
      badge: 'Multi-Factor Engine',
      description: 'Presents side-by-side comparisons of 5 options: Bike+Metro, Car, EV Smart Eco Drive, Two-Wheeler, and APSRTC Express.',
      actionText: 'Compare All Routes',
      actionHandler: () => setCurrentScreen('comparison'),
    },
    {
      number: 13,
      title: 'AI Multi-Factor Recommendation',
      badge: 'Explainable AI',
      description: 'AI selects optimal multimodal route based on weighted scores, explaining clearly: "Suggested because: Lower congestion, lowest emissions, step-free access".',
      actionText: 'Select AI Recommendation',
      actionHandler: () => setCurrentScreen('comparison'),
    },
    {
      number: 14,
      title: 'Start Live Navigation & Audio Guidance',
      badge: 'Turn-by-Turn',
      description: 'Launches full-screen active navigation HUD with Web Speech API audio turn guidance and dynamic map camera following.',
      actionText: 'Launch Live Navigation',
      actionHandler: () => {
        startNavigation();
        if (!safetyMode.enabled) toggleSafetyMode();
      },
    },
    {
      number: 15,
      title: 'Trigger Simulated Road Incident',
      badge: 'Event Simulation',
      description: 'An unexpected road bottleneck / accident is simulated ahead on the highway. The system catches the disruption immediately.',
      actionText: '⚠ Trigger Road Incident Ahead',
      actionHandler: () => {
        setCurrentScreen('navigation');
        triggerSimulatedIncident();
      },
    },
    {
      number: 16,
      title: 'Dynamic AI Recalculation & Reroute',
      badge: 'Dynamic Rerouting',
      description: 'System prompts user with faster alternative route avoiding the bottleneck. User accepts with a single tap.',
      actionText: 'Accept Reroute',
      actionHandler: () => {
        acceptReroute();
        setCurrentScreen('navigation');
      },
    },
    {
      number: 17,
      title: 'Arrive at Destination & Complete Trip',
      badge: 'Trip Completion',
      description: 'Navigation ends with celebratory confetti, trip summary breakdown, and time saved analysis.',
      actionText: 'Complete Trip',
      actionHandler: () => {
        completeTrip();
      },
    },
    {
      number: 18,
      title: 'Trip Saved to History & Gamification',
      badge: 'History & Points',
      description: 'Trip is saved into persistent Trip History, carbon savings are logged, and +35 Green Mobility Points are awarded!',
      actionText: 'View Trip History',
      actionHandler: () => {
        setCurrentScreen('trip_history');
      },
    },
  ];

  const current = tourSteps[tourStep];

  const handleNext = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      tourSteps[nextStep].actionHandler?.();
    } else {
      setIsTourOpen(false);
    }
  };

  const handlePrev = () => {
    if (tourStep > 0) {
      const prevStep = tourStep - 1;
      setTourStep(prevStep);
      tourSteps[prevStep].actionHandler?.();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 pointer-events-none animate-slide-up">
      <div className="max-w-3xl mx-auto glass-panel border border-purple-500/40 rounded-3xl shadow-2xl p-5 pointer-events-auto bg-slate-900/95">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Sparkles size={16} />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
              Hackathon Demo Walkthrough Flow
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              (Step {current.number} of {tourSteps.length})
            </span>
          </div>

          <button
            onClick={() => setIsTourOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step Content */}
        <div className="mt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {current.badge}
              </span>
              <h3 className="text-base font-bold text-white">{current.title}</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{current.description}</p>
          </div>

          {/* Action Trigger Button */}
          {current.actionText && (
            <button
              onClick={current.actionHandler}
              className="px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>{current.actionText}</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* Stepper Navigation */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={tourStep === 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              tourStep === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white bg-slate-800/80'
            }`}
          >
            <ChevronLeft size={14} /> Previous
          </button>

          {/* Step dots */}
          <div className="hidden sm:flex items-center gap-1">
            {tourSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTourStep(idx);
                  tourSteps[idx].actionHandler?.();
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === tourStep
                    ? 'w-6 bg-purple-400'
                    : idx < tourStep
                    ? 'bg-blue-500/70'
                    : 'bg-slate-700'
                }`}
                title={`Step ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all"
          >
            <span>{tourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

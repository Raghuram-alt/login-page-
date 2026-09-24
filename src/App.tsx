import React, { useState } from 'react';
import { MobilityProvider, useMobility } from './context/MobilityContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { DemoControlsModal } from './components/common/DemoControlsModal';
import { PresentationTourModal } from './components/common/PresentationTourModal';
import { SOSModal } from './components/common/SOSModal';
import { TripCompleteModal } from './components/common/TripCompleteModal';

// Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TripPlannerScreen } from './components/screens/TripPlannerScreen';
import { RouteComparisonScreen } from './components/screens/RouteComparisonScreen';
import { LiveNavigationScreen } from './components/screens/LiveNavigationScreen';
import { PublicTransitScreen } from './components/screens/PublicTransitScreen';
import { OwnVehicleScreen } from './components/screens/OwnVehicleScreen';
import { EVChargingScreen } from './components/screens/EVChargingScreen';
import { FuelScreen } from './components/screens/FuelScreen';
import { SmartParkingScreen } from './components/screens/SmartParkingScreen';
import { SafetyCenterScreen } from './components/screens/SafetyCenterScreen';
import { SafetyModeScreen } from './components/screens/SafetyModeScreen';
import { AccessibilityScreen } from './components/screens/AccessibilityScreen';
import { PersonalizedCommuteScreen } from './components/screens/PersonalizedCommuteScreen';
import { TripHistoryScreen } from './components/screens/TripHistoryScreen';
import { CarbonDashboardScreen } from './components/screens/CarbonDashboardScreen';
import { FamilyTripScreen } from './components/screens/FamilyTripScreen';
import { VehicleHealthScreen } from './components/screens/VehicleHealthScreen';
import { ARNavigationScreen } from './components/screens/ARNavigationScreen';
import { OfflineMapsScreen } from './components/screens/OfflineMapsScreen';
import { SettingsProfileScreen } from './components/screens/SettingsProfileScreen';
import { ScreenId } from './types/mobility';
import { X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useMobility();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'planner':
        return <TripPlannerScreen />;
      case 'comparison':
        return <RouteComparisonScreen />;
      case 'navigation':
        return <LiveNavigationScreen />;
      case 'public_transport':
        return <PublicTransitScreen />;
      case 'own_vehicle':
        return <OwnVehicleScreen />;
      case 'ev_charging':
        return <EVChargingScreen />;
      case 'fuel':
        return <FuelScreen />;
      case 'parking':
        return <SmartParkingScreen />;
      case 'safety_center':
        return <SafetyCenterScreen />;
      case 'safety_mode':
        return <SafetyModeScreen />;
      case 'accessibility':
        return <AccessibilityScreen />;
      case 'commute':
        return <PersonalizedCommuteScreen />;
      case 'trip_history':
        return <TripHistoryScreen />;
      case 'carbon':
        return <CarbonDashboardScreen />;
      case 'family_trip':
        return <FamilyTripScreen />;
      case 'vehicle_health':
        return <VehicleHealthScreen />;
      case 'ar_demo':
        return <ARNavigationScreen />;
      case 'offline_maps':
        return <OfflineMapsScreen />;
      case 'settings':
        return <SettingsProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  const allScreens: { id: ScreenId; label: string }[] = [
    { id: 'dashboard', label: 'Main Dashboard' },
    { id: 'planner', label: 'Trip Planner' },
    { id: 'comparison', label: 'Route Comparison' },
    { id: 'navigation', label: 'Live Navigation' },
    { id: 'commute', label: 'My Commute (AI)' },
    { id: 'public_transport', label: 'Bus • Metro • Train' },
    { id: 'own_vehicle', label: 'Own Vehicle (2W/4W)' },
    { id: 'ev_charging', label: 'EV & Battery Swap' },
    { id: 'fuel', label: 'Fuel & Stations' },
    { id: 'parking', label: 'Smart Parking (AI)' },
    { id: 'safety_mode', label: 'Safety Mode & SOS' },
    { id: 'safety_center', label: 'Safety Center & Hazards' },
    { id: 'accessibility', label: 'Accessibility Settings' },
    { id: 'carbon', label: 'Carbon Dashboard' },
    { id: 'trip_history', label: 'Trip History & Diary' },
    { id: 'family_trip', label: 'Family & Group Trips' },
    { id: 'vehicle_health', label: 'Vehicle Diagnostics' },
    { id: 'ar_demo', label: 'AR Navigation Demo' },
    { id: 'offline_maps', label: 'Offline Maps' },
    { id: 'settings', label: 'Settings & Privacy' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Scrollable Center Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-6">
          {renderScreen()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenDrawer={() => setMobileDrawerOpen(true)} />

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md md:hidden animate-fade-in">
          <div className="w-72 h-full glass-panel border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-white">All Platform Screens</span>
                <button onClick={() => setMobileDrawerOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {allScreens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentScreen(s.id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      currentScreen === s.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
              AI Smart Mobility • Andhra Pradesh Corridor
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Modals */}
      <DemoControlsModal />
      <PresentationTourModal />
      <SOSModal />
      <TripCompleteModal />
    </div>
  );
};

export default function App() {
  return (
    <MobilityProvider>
      <MainAppContent />
    </MobilityProvider>
  );
}

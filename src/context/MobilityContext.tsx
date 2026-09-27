import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  ScreenId,
  LocationPoint,
  UserPreferences,
  AccessibilitySettings,
  DemoControlsState,
  UserProfile,
  RouteOption,
  TripHistoryItem,
} from '../types/mobility';
import { DEMO_LOCATIONS } from '../data/locations';
import { DEMO_USERS, INITIAL_TRIP_HISTORY } from '../data/vehicleData';
import { generateRouteOptions } from '../services/aiRecommendationEngine';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export interface MapLayersState {
  traffic: boolean;
  weather: boolean;
  incidents: boolean;
  parking: boolean;
  fuel: boolean;
  ev: boolean;
  transit: boolean;
  accessibility: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  notified: boolean;
}

export interface ActiveNavigationState {
  isNavigating: boolean;
  currentStepIndex: number;
  remainingTimeMin: number;
  remainingDistanceKm: number;
  isReroutingSuggested: boolean;
  incidentDiscovered?: string;
  alternativeRoute?: RouteOption;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  time: string;
}

interface MobilityContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  currentUser: UserProfile;
  switchUser: (userId: string) => void;

  origin: LocationPoint;
  setOrigin: (loc: LocationPoint) => void;
  destination: LocationPoint;
  setDestination: (loc: LocationPoint) => void;

  preferences: UserPreferences;
  togglePreference: (key: keyof UserPreferences) => void;

  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;

  demoControls: DemoControlsState;
  updateDemoControls: (updates: Partial<DemoControlsState>) => void;

  routes: RouteOption[];
  selectedRoute: RouteOption | null;
  setSelectedRoute: (route: RouteOption) => void;

  navigation: ActiveNavigationState;
  startNavigation: (route?: RouteOption) => void;
  advanceNavigationStep: () => void;
  stopNavigation: () => void;
  acceptReroute: () => void;
  dismissReroute: () => void;
  triggerSimulatedIncident: () => void;
  completeTrip: () => void;

  safetyMode: {
    enabled: boolean;
    liveSharingActive: boolean;
    trustedContacts: TrustedContact[];
    routeDeviationMonitoring: boolean;
    sosActive: boolean;
  };
  toggleSafetyMode: () => void;
  toggleLiveTripSharing: () => void;
  addTrustedContact: (name: string, phone: string, relation: string) => void;
  activateSOS: () => void;
  cancelSOS: () => void;

  tripHistory: TripHistoryItem[];
  addTripToHistory: (trip: TripHistoryItem) => void;

  mapLayers: MapLayersState;
  toggleMapLayer: (layer: keyof MapLayersState) => void;

  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  addNotification: (title: string, body: string, type: NotificationItem['type']) => void;

  isDemoControlsOpen: boolean;
  setIsDemoControlsOpen: (open: boolean) => void;

  isTourOpen: boolean;
  setIsTourOpen: (open: boolean) => void;
  tourStep: number;
  setTourStep: (step: number) => void;

  showTripCompleteModal: boolean;
  setShowTripCompleteModal: (show: boolean) => void;
  lastCompletedTrip: TripHistoryItem | null;

  isAuthenticated: boolean;
  loginUser: (email: string, personaId?: string) => Promise<boolean>;
  logoutUser: () => void;
}

const MobilityContext = createContext<MobilityContextType | undefined>(undefined);

export const MobilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Default origin: Kakinada Town Station, destination: Visakhapatnam Jn
  const [origin, setOrigin] = useState<LocationPoint>(DEMO_LOCATIONS[0]);
  const [destination, setDestination] = useState<LocationPoint>(DEMO_LOCATIONS[7]);

  // Trip preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    lowestCost: false,
    fastest: true,
    lowerEmissions: true,
    saferRouteFactors: true,
    avoidTolls: false,
    avoidHighways: false,
    wheelchairAccessible: false,
    fewerTransfers: false,
    lessWalking: false,
    avoidBadWeather: true,
  });

  // Accessibility
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    wheelchairAccessible: false,
    stepFreeRoute: false,
    avoidStairs: false,
    minimizeWalking: false,
    elevatorPreferred: false,
    audioGuidance: true,
    highContrast: false,
    largeText: false,
    voiceLanguage: 'en',
  });

  // Demo Controls
  const [demoControls, setDemoControls] = useState<DemoControlsState>({
    trafficLevel: 'moderate',
    weatherCondition: 'partly_cloudy',
    temperature: 28,
    rainProbability: 35,
    windSpeed: 16,
    batteryLevel: 68,
    fuelLevel: 55,
    crowdLevel: 'moderate',
    activeIncident: 'none',
    parkingAvailability: 'available',
    timeOfDay: '08:30 AM',
    isNightMode: false,
  });

  // Map layers
  const [mapLayers, setMapLayers] = useState<MapLayersState>({
    traffic: true,
    weather: true,
    incidents: true,
    parking: true,
    fuel: true,
    ev: true,
    transit: true,
    accessibility: false,
  });

  // Navigation state
  const [navigation, setNavigation] = useState<ActiveNavigationState>({
    isNavigating: false,
    currentStepIndex: 0,
    remainingTimeMin: 0,
    remainingDistanceKm: 0,
    isReroutingSuggested: false,
  });

  // Safety mode
  const [safetyMode, setSafetyMode] = useState({
    enabled: false,
    liveSharingActive: false,
    trustedContacts: [
      { id: 'c1', name: 'Ravi Sharma (Father)', phone: '+91 98480 12345', relation: 'Family', notified: true },
      { id: 'c2', name: 'Ananya (Campus Peer)', phone: '+91 94401 67890', relation: 'Friend', notified: true },
    ],
    routeDeviationMonitoring: true,
    sosActive: false,
  });

  // History & notifications
  const [tripHistory, setTripHistory] = useState<TripHistoryItem[]>(INITIAL_TRIP_HISTORY);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'AI Mobility Active',
      body: 'Real-time multi-modal engine initialized for Kakinada - Vizag corridor.',
      type: 'info',
      time: 'Just now',
    },
    {
      id: 'n2',
      title: 'Monsoon Advisory',
      body: 'Coastal rain forecast for afternoon. Two-wheeler caution advised.',
      type: 'warning',
      time: '12m ago',
    },
  ]);

  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const [showTripCompleteModal, setShowTripCompleteModal] = useState(false);
  const [lastCompletedTrip, setLastCompletedTrip] = useState<TripHistoryItem | null>(null);

  // Compute routes dynamically whenever inputs or demo controls change
  const routes = useMemo(() => {
    return generateRouteOptions(origin, destination, preferences, demoControls);
  }, [origin, destination, preferences, demoControls]);

  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);

  // Keep selected route in sync
  useEffect(() => {
    if (routes.length > 0) {
      // If none selected or previous invalid, select recommended
      if (!selectedRoute || !routes.some((r) => r.id === selectedRoute.id)) {
        const rec = routes.find((r) => r.isRecommended) || routes[0];
        setSelectedRoute(rec);
      } else {
        // update the matching route with new computed values
        const updated = routes.find((r) => r.id === selectedRoute.id);
        if (updated) setSelectedRoute(updated);
      }
    }
  }, [routes]);

  const togglePreference = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateAccessibility = (updates: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => {
      const next = { ...prev, ...updates };
      if (updates.voiceLanguage) {
        speechService.setLanguage(updates.voiceLanguage);
      }
      return next;
    });
  };

  const updateDemoControls = (updates: Partial<DemoControlsState>) => {
    setDemoControls((prev) => ({ ...prev, ...updates }));
    addNotification('Demo Parameters Updated', 'Route calculations & warnings refreshed in real-time.', 'info');
  };

  const toggleMapLayer = (layer: keyof MapLayersState) => {
    setMapLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const switchUser = (userId: string) => {
    const user = DEMO_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      addNotification('User Switched', `Logged in as ${user.name} (${user.role}).`, 'info');
    }
  };

  const addNotification = (title: string, body: string, type: NotificationItem['type']) => {
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title,
      body,
      type,
      time: 'Just now',
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 7)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Navigation handlers
  const startNavigation = (routeToNav?: RouteOption) => {
    const target = routeToNav || selectedRoute || routes[0];
    if (!target) return;
    setSelectedRoute(target);
    setNavigation({
      isNavigating: true,
      currentStepIndex: 0,
      remainingTimeMin: target.totalDurationMin,
      remainingDistanceKm: target.distanceKm,
      isReroutingSuggested: false,
    });
    setCurrentScreen('navigation');

    const firstInstruction = target.steps[0]?.instruction || `Navigate to ${destination.name}`;
    speechService.speak(`Starting navigation to ${destination.name}. ${firstInstruction}`);

    addNotification('Navigation Started', `Guidance active for ${target.title}.`, 'success');
  };

  const advanceNavigationStep = () => {
    if (!selectedRoute) return;
    const nextIdx = navigation.currentStepIndex + 1;
    if (nextIdx < selectedRoute.steps.length) {
      const step = selectedRoute.steps[nextIdx];
      setNavigation((prev) => ({
        ...prev,
        currentStepIndex: nextIdx,
        remainingTimeMin: Math.max(1, prev.remainingTimeMin - step.durationMin),
        remainingDistanceKm: Math.max(0.2, Math.round((prev.remainingDistanceKm - step.distanceKm) * 10) / 10),
      }));
      speechService.speak(step.instruction);
    } else {
      completeTrip();
    }
  };

  const stopNavigation = () => {
    setNavigation((prev) => ({ ...prev, isNavigating: false, isReroutingSuggested: false }));
    speechService.stop();
  };

  const triggerSimulatedIncident = () => {
    updateDemoControls({ activeIncident: 'accident', trafficLevel: 'heavy' });
    const alternative = routes.find((r) => r.id === 'route_multimodal') || routes[1];
    setNavigation((prev) => ({
      ...prev,
      isReroutingSuggested: true,
      incidentDiscovered: 'Accident reported 2.4 km ahead on NH-16 bypass. Lane bottleneck formed.',
      alternativeRoute: alternative,
    }));
    speechService.speak('Caution: New incident detected on route ahead. Recalculating faster alternative.');
    addNotification('⚠ Incident Alert', 'Road bottleneck ahead. Alternative route calculated.', 'warning');
  };

  const acceptReroute = () => {
    if (navigation.alternativeRoute) {
      setSelectedRoute(navigation.alternativeRoute);
      setNavigation((prev) => ({
        ...prev,
        isReroutingSuggested: false,
        remainingTimeMin: navigation.alternativeRoute?.totalDurationMin || prev.remainingTimeMin,
      }));
      speechService.speak('Alternative route accepted. Navigating via multi-modal corridor.');
      addNotification('Route Updated', 'Now following the optimized alternative corridor.', 'success');
    }
  };

  const dismissReroute = () => {
    setNavigation((prev) => ({ ...prev, isReroutingSuggested: false }));
  };

  const completeTrip = () => {
    if (!selectedRoute) return;
    const completed: TripHistoryItem = {
      id: `trip_${Date.now()}`,
      date: 'Just now',
      from: origin.name,
      to: destination.name,
      mode: selectedRoute.mode,
      modeLabel: selectedRoute.title,
      durationMin: selectedRoute.totalDurationMin,
      distanceKm: selectedRoute.distanceKm,
      cost: selectedRoute.estimatedCost,
      carbonKg: selectedRoute.carbonKg,
      emissionsLabel: selectedRoute.carbonLevel,
      status: 'Completed',
      savedMinutes: Math.floor(Math.random() * 8) + 4,
    };

    setTripHistory((prev) => [completed, ...prev]);
    setLastCompletedTrip(completed);
    setShowTripCompleteModal(true);
    stopNavigation();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    speechService.speak(`You have reached ${destination.name}. Trip completed successfully.`);

    // Award mobility points
    setCurrentUser((prev) => ({
      ...prev,
      mobilityPoints: prev.mobilityPoints + 35,
    }));
  };

  // Safety mode handlers
  const toggleSafetyMode = () => {
    setSafetyMode((prev) => {
      const next = !prev.enabled;
      if (next) {
        addNotification('Safety Mode ACTIVE', 'Live trip tracking enabled. Trusted contacts synced.', 'success');
        speechService.speak('Safety mode enabled. Emergency contacts are connected.');
      }
      return { ...prev, enabled: next, liveSharingActive: next };
    });
  };

  const toggleLiveTripSharing = () => {
    setSafetyMode((prev) => ({ ...prev, liveSharingActive: !prev.liveSharingActive }));
  };

  const addTrustedContact = (name: string, phone: string, relation: string) => {
    setSafetyMode((prev) => ({
      ...prev,
      trustedContacts: [...prev.trustedContacts, { id: Date.now().toString(), name, phone, relation, notified: true }],
    }));
  };

  const activateSOS = () => {
    setSafetyMode((prev) => ({ ...prev, sosActive: true }));
    addNotification('🚨 EMERGENCY SOS ACTIVE', 'Simulated emergency alert dispatched to trusted contacts.', 'alert');
  };

  const cancelSOS = () => {
    setSafetyMode((prev) => ({ ...prev, sosActive: false }));
    addNotification('SOS Stand down', 'Emergency broadcast cancelled by user.', 'info');
  };

  const addTripToHistory = (item: TripHistoryItem) => {
    setTripHistory((prev) => [item, ...prev]);
  };

  const loginUser = async (email: string, personaId?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (personaId) {
      const found = DEMO_USERS.find((u) => u.id === personaId);
      if (found) {
        setCurrentUser(found);
      }
    } else {
      const namePart = email.split('@')[0] || 'Commuter';
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setCurrentUser((prev) => ({
        ...prev,
        id: `user_${Date.now()}`,
        name: capitalized,
        role: 'Verified Commuter',
      }));
    }

    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
    addNotification('Sign-In Successful', `Welcome back to NexMobility!`, 'success');
    speechService.speak(`Welcome to NexMobility.`);
    return true;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
    addNotification('Signed Out', 'You have been safely signed out.', 'info');
  };

  return (
    <MobilityContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentUser,
        switchUser,
        origin,
        setOrigin,
        destination,
        setDestination,
        preferences,
        togglePreference,
        accessibility,
        updateAccessibility,
        demoControls,
        updateDemoControls,
        routes,
        selectedRoute,
        setSelectedRoute,
        navigation,
        startNavigation,
        advanceNavigationStep,
        stopNavigation,
        acceptReroute,
        dismissReroute,
        triggerSimulatedIncident,
        completeTrip,
        safetyMode,
        toggleSafetyMode,
        toggleLiveTripSharing,
        addTrustedContact,
        activateSOS,
        cancelSOS,
        tripHistory,
        addTripToHistory,
        mapLayers,
        toggleMapLayer,
        notifications,
        dismissNotification,
        addNotification,
        isDemoControlsOpen,
        setIsDemoControlsOpen,
        isTourOpen,
        setIsTourOpen,
        tourStep,
        setTourStep,
        showTripCompleteModal,
        setShowTripCompleteModal,
        lastCompletedTrip,
        isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </MobilityContext.Provider>
  );
};

export const useMobility = () => {
  const context = useContext(MobilityContext);
  if (!context) {
    throw new Error('useMobility must be used within a MobilityProvider');
  }
  return context;
};

export type ScreenId =
  | 'dashboard'
  | 'planner'
  | 'comparison'
  | 'navigation'
  | 'public_transport'
  | 'own_vehicle'
  | 'ev_charging'
  | 'fuel'
  | 'parking'
  | 'safety_center'
  | 'safety_mode'
  | 'accessibility'
  | 'commute'
  | 'trip_history'
  | 'carbon'
  | 'family_trip'
  | 'vehicle_health'
  | 'ar_demo'
  | 'offline_maps'
  | 'settings'
  | 'login';

export type TravelMode =
  | 'all'
  | 'bike'
  | 'car'
  | 'bus'
  | 'metro'
  | 'train'
  | 'ev'
  | 'walk'
  | 'multimodal';

export type TrafficLevel = 'low' | 'moderate' | 'heavy' | 'gridlock';

export type WeatherCondition =
  | 'clear'
  | 'partly_cloudy'
  | 'rain'
  | 'heavy_rain'
  | 'flooding';

export type CrowdLevel = 'low' | 'moderate' | 'high' | 'packed';

export type IncidentType =
  | 'none'
  | 'pothole'
  | 'accident'
  | 'waterlogging'
  | 'construction'
  | 'broken_signal';

export interface LocationPoint {
  id: string;
  name: string;
  category: 'station' | 'campus' | 'hub' | 'hospital' | 'airport' | 'landmark' | 'mall';
  city: 'Kakinada' | 'Rajahmundry' | 'Anakapalle' | 'Visakhapatnam';
  lat: number;
  lng: number;
  description: string;
}

export interface UserPreferences {
  lowestCost: boolean;
  fastest: boolean;
  lowerEmissions: boolean;
  saferRouteFactors: boolean;
  avoidTolls: boolean;
  avoidHighways: boolean;
  wheelchairAccessible: boolean;
  fewerTransfers: boolean;
  lessWalking: boolean;
  avoidBadWeather: boolean;
}

export interface AccessibilitySettings {
  wheelchairAccessible: boolean;
  stepFreeRoute: boolean;
  avoidStairs: boolean;
  minimizeWalking: boolean;
  elevatorPreferred: boolean;
  audioGuidance: boolean;
  highContrast: boolean;
  largeText: boolean;
  voiceLanguage: 'en' | 'te' | 'hi';
}

export interface RouteStep {
  instruction: string;
  distanceKm: number;
  durationMin: number;
  mode: 'walk' | 'bike' | 'car' | 'bus' | 'metro' | 'train' | 'scooter';
  icon: string;
  detail?: string;
  stepFree?: boolean;
}

export interface RouteOption {
  id: string;
  title: string;
  mode: TravelMode;
  modeIcons: string[];
  totalDurationMin: number;
  baseTravelTimeMin: number;
  trafficDelayMin: number;
  weatherDelayMin: number;
  transferDelayMin: number;
  distanceKm: number;
  estimatedCost: number;
  costBreakdown: {
    ticketOrFuel: number;
    toll: number;
    parking: number;
    lastMile: number;
  };
  carbonKg: number;
  carbonLevel: 'Low' | 'Moderate' | 'Higher';
  safetyScore: number; // 0 - 100
  confidence: 'High' | 'Medium' | 'Low';
  transfers: number;
  walkingDurationMin: number;
  steps: RouteStep[];
  pathCoordinates: [number, number][];
  warnings: string[];
  aiRationale: string[];
  requiresChargingStop: boolean;
  chargingStationName?: string;
  requiresFuelStop: boolean;
  fuelStationName?: string;
  parkingAvailableAtDest: boolean;
  isWheelchairAccessible: boolean;
  isRecommended: boolean;
  score: number;
}

export interface IncidentMarker {
  id: string;
  type: IncidentType;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  reportedMinutesAgo: number;
  status: 'Community reported' | 'Police verified' | 'Traffic agency confirmed';
  impact: 'Caution advised' | 'Lane blocked' | 'Road closed' | 'Delay expected';
  affectedRouteIds?: string[];
}

export interface EVCharger {
  id: string;
  name: string;
  operator: string;
  lat: number;
  lng: number;
  chargerType: 'CCS2 (60kW)' | 'Type 2 AC (22kW)' | 'DC Fast (120kW)';
  availablePorts: number;
  totalPorts: number;
  pricePerKwh: number;
  chargingTimeEstMin: number;
  distanceKm: number;
}

export interface BatterySwapStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
  availableBatteries: number;
  compatibility: 'Universal 48V / Ather / Revolt' | 'Commercial 2W';
  swapTimeSec: number;
}

export interface FuelStation {
  id: string;
  name: string;
  brand: 'IndianOil' | 'Bharat Petroleum' | 'HPCL' | 'Shell';
  lat: number;
  lng: number;
  petrolPrice: number;
  dieselPrice: number;
  distanceKm: number;
  isOpen: boolean;
  facilities: string[];
}

export interface ParkingLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distanceMeters: number;
  availableSpots: number;
  totalSpots: number;
  hourlyRate: number;
  hasEvCharging: boolean;
  predictionChanceAtTime: number; // 0 - 100%
  status: 'Available' | 'Limited' | 'Full';
}

export interface PublicTransitLine {
  id: string;
  type: 'bus' | 'metro' | 'train';
  name: string;
  routeCode: string;
  destination: string;
  arrivalMinutes: number;
  fare: number;
  crowdLevel: CrowdLevel;
  status: 'On Time' | 'Delayed 5m' | 'Arriving';
  currentStation: string;
  accessible: boolean;
  nextStops: string[];
  lat: number;
  lng: number;
}

export interface DemoControlsState {
  trafficLevel: TrafficLevel;
  weatherCondition: WeatherCondition;
  temperature: number;
  rainProbability: number;
  windSpeed: number;
  batteryLevel: number; // %
  fuelLevel: number; // %
  crowdLevel: CrowdLevel;
  activeIncident: IncidentType;
  parkingAvailability: 'available' | 'limited' | 'full';
  timeOfDay: string;
  isNightMode: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  city: string;
  avatarColor: string;
  vehicle: {
    type: 'bike' | 'car' | 'ev_car' | 'ev_scooter';
    model: string;
    fuelLevel: number;
    batteryLevel: number;
    estimatedRangeKm: number;
  };
  mobilityPoints: number;
  badges: string[];
}

export interface TripHistoryItem {
  id: string;
  date: string;
  from: string;
  to: string;
  mode: TravelMode;
  modeLabel: string;
  durationMin: number;
  distanceKm: number;
  cost: number;
  carbonKg: number;
  emissionsLabel: 'Low' | 'Moderate' | 'Higher';
  status: 'Completed';
  savedMinutes?: number;
}

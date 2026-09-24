import {
  RouteOption,
  TravelMode,
  UserPreferences,
  DemoControlsState,
  LocationPoint,
} from '../types/mobility';

// Coordinate path generators for Kakinada -> Visakhapatnam corridor & local trips
export const CORRIDOR_NH16_PATH: [number, number][] = [
  [16.9604, 82.2381], // Kakinada Town
  [16.9950, 82.2500],
  [17.0500, 82.1670], // Samalkot Junction
  [17.1600, 82.3200], // Annavaram
  [17.3550, 82.5450], // Tuni
  [17.5200, 82.8500], // Yelamanchili
  [17.6896, 83.0033], // Anakapalle
  [17.6950, 83.2100], // Gajuwaka
  [17.7215, 83.2996], // Visakhapatnam Junction
];

export const CORRIDOR_RAIL_PATH: [number, number][] = [
  [16.9604, 82.2381],
  [17.0550, 82.1690],
  [17.2000, 82.3500],
  [17.3600, 82.5500],
  [17.5500, 82.8800],
  [17.6900, 83.0100],
  [17.7050, 83.2200],
  [17.7215, 83.2996],
];

export const CORRIDOR_COASTAL_PATH: [number, number][] = [
  [16.9604, 82.2381],
  [16.9891, 82.2612], // Kakinada Port
  [17.0600, 82.3500],
  [17.2200, 82.5200],
  [17.4100, 82.7500],
  [17.6200, 83.0800],
  [17.7000, 83.2600],
  [17.7215, 83.2996],
];

export const LOCAL_CAMPUS_PATH: [number, number][] = [
  [16.9604, 82.2381],
  [16.9680, 82.2395],
  [16.9740, 82.2405],
  [16.9789, 82.2415], // JNTU Campus
];

export function calculateDistanceKm(
  from: LocationPoint,
  to: LocationPoint
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLon = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawDist = Math.round(R * c);
  // Practical road multiplier
  return Math.max(rawDist * 1.25, 4.5);
}

export function generateRouteOptions(
  origin: LocationPoint,
  destination: LocationPoint,
  preferences: UserPreferences,
  controls: DemoControlsState
): RouteOption[] {
  const isIntercity = origin.city !== destination.city;
  const distanceKm = Math.round(calculateDistanceKm(origin, destination));

  // Determine traffic delay factor based on demo controls
  let trafficDelayMultiplier = 0.05;
  if (controls.trafficLevel === 'moderate') trafficDelayMultiplier = 0.18;
  if (controls.trafficLevel === 'heavy') trafficDelayMultiplier = 0.40;
  if (controls.trafficLevel === 'gridlock') trafficDelayMultiplier = 0.75;

  // Determine weather penalty
  let weatherDelayMultiplier = 0.0;
  let weatherAlert = '';
  if (controls.weatherCondition === 'rain') {
    weatherDelayMultiplier = 0.12;
    weatherAlert = 'Wet roads: Braking distance increased. Moderate delay factored.';
  } else if (controls.weatherCondition === 'heavy_rain') {
    weatherDelayMultiplier = 0.28;
    weatherAlert = 'Heavy rain & reduced visibility: Speed capped on NH-16.';
  } else if (controls.weatherCondition === 'flooding') {
    weatherDelayMultiplier = 0.50;
    weatherAlert = 'Flooding reported in underpasses: Coastal bypass routes penalized.';
  }

  // Active Incident Impact
  let incidentDelay = 0;
  let incidentAlert = '';
  if (controls.activeIncident === 'accident') {
    incidentDelay = 22;
    incidentAlert = 'Accident cleared on bypass: lingering lane bottleneck.';
  } else if (controls.activeIncident === 'waterlogging') {
    incidentDelay = 18;
    incidentAlert = 'Waterlogged subways: Low-slung vehicles rerouted.';
  } else if (controls.activeIncident === 'construction') {
    incidentDelay = 14;
    incidentAlert = 'Flyover expansion: Single-lane traffic movement ahead.';
  }

  // 1. Multimodal Route: Bike/Auto + Express Train / Metro + Short Walk
  const mmBaseTime = isIntercity ? 115 : 24;
  const mmTrafficDelay = Math.round(mmBaseTime * (trafficDelayMultiplier * 0.3)); // Trains bypass road traffic!
  const mmWeatherDelay = Math.round(mmBaseTime * (weatherDelayMultiplier * 0.4));
  const mmTotalDuration = mmBaseTime + mmTrafficDelay + mmWeatherDelay;
  const mmCost = isIntercity ? 165 : 45;
  const mmCarbon = isIntercity ? 2.4 : 0.25;

  const mmRoute: RouteOption = {
    id: 'route_multimodal',
    title: isIntercity ? 'E-Bike + Express Train + Metro' : 'Shared Bike + Metro Feeder',
    mode: 'multimodal',
    modeIcons: ['Bike', 'Train', 'Footprints'],
    totalDurationMin: mmTotalDuration,
    baseTravelTimeMin: mmBaseTime,
    trafficDelayMin: mmTrafficDelay,
    weatherDelayMin: mmWeatherDelay,
    transferDelayMin: 8,
    distanceKm: distanceKm,
    estimatedCost: mmCost,
    costBreakdown: {
      ticketOrFuel: isIntercity ? 120 : 30,
      toll: 0,
      parking: isIntercity ? 30 : 0,
      lastMile: 15,
    },
    carbonKg: mmCarbon,
    carbonLevel: 'Low',
    safetyScore: 92,
    confidence: 'High',
    transfers: isIntercity ? 2 : 1,
    walkingDurationMin: 6,
    steps: [
      {
        instruction: `First Mile: Ride shared e-bike to ${origin.city === 'Kakinada' ? 'Kakinada Town Terminal' : 'Transit Exchange'}`,
        distanceKm: 2.2,
        durationMin: 7,
        mode: 'bike',
        icon: 'Bike',
        detail: 'Protected bike lane available',
      },
      {
        instruction: isIntercity
          ? 'Board Vande Bharat / Superfast Express Train (Reserved Seat, Platform 1)'
          : 'Board Coastal Metro Line A towards City Center',
        distanceKm: distanceKm - 4,
        durationMin: isIntercity ? 95 : 12,
        mode: isIntercity ? 'train' : 'metro',
        icon: isIntercity ? 'Train' : 'Subway',
        detail: 'Dedicated train corridor — unaffected by highway gridlock',
        stepFree: true,
      },
      {
        instruction: `Last Mile: 450m step-free walk or shared e-scooter to ${destination.name}`,
        distanceKm: 0.5,
        durationMin: 5,
        mode: 'walk',
        icon: 'Footprints',
        detail: 'Wheelchair ramp and elevator access verified',
        stepFree: true,
      },
    ],
    pathCoordinates: CORRIDOR_RAIL_PATH,
    warnings: weatherAlert ? [weatherAlert] : [],
    aiRationale: [
      'Trains operate on dedicated right-of-way, bypassing highway congestion.',
      'Lowest carbon footprint for medium-long distance travel.',
      'Step-free transfer stations with elevator accessibility.',
    ],
    requiresChargingStop: false,
    requiresFuelStop: false,
    parkingAvailableAtDest: true,
    isWheelchairAccessible: true,
    isRecommended: false,
    score: 0,
  };

  // 2. Personal Car (Four-Wheeler)
  const carBaseTime = isIntercity ? 140 : 20;
  const carTrafficDelay = Math.round(carBaseTime * trafficDelayMultiplier) + incidentDelay;
  const carWeatherDelay = Math.round(carBaseTime * weatherDelayMultiplier);
  const carTotalDuration = carBaseTime + carTrafficDelay + carWeatherDelay;
  const carFuelCost = Math.round(distanceKm * 6.5);
  const carTollCost = isIntercity ? 160 : 0;
  const carParkingCost = controls.parkingAvailability === 'full' ? 80 : 40;
  const carCost = carFuelCost + carTollCost + carParkingCost;
  const carCarbon = Math.round(distanceKm * 0.14 * 10) / 10;

  // Check fuel requirements
  const currentFuelKmRange = (controls.fuelLevel / 100) * 450;
  const carNeedsFuel = currentFuelKmRange < distanceKm + 15;

  const carRoute: RouteOption = {
    id: 'route_car',
    title: 'Personal Four-Wheeler (NH-16 Express)',
    mode: 'car',
    modeIcons: ['Car'],
    totalDurationMin: carTotalDuration,
    baseTravelTimeMin: carBaseTime,
    trafficDelayMin: carTrafficDelay,
    weatherDelayMin: carWeatherDelay,
    transferDelayMin: 0,
    distanceKm: distanceKm,
    estimatedCost: carCost,
    costBreakdown: {
      ticketOrFuel: carFuelCost,
      toll: carTollCost,
      parking: carParkingCost,
      lastMile: 0,
    },
    carbonKg: carCarbon,
    carbonLevel: 'Higher',
    safetyScore: controls.trafficLevel === 'heavy' ? 76 : 88,
    confidence: controls.trafficLevel === 'heavy' ? 'Medium' : 'High',
    transfers: 0,
    walkingDurationMin: 2,
    steps: [
      {
        instruction: `Depart from ${origin.name} via City Connector`,
        distanceKm: 3.5,
        durationMin: 8,
        mode: 'car',
        icon: 'Car',
      },
      {
        instruction: 'Merge onto NH-16 National Highway Expressway',
        distanceKm: distanceKm - 10,
        durationMin: carBaseTime - 18 + carTrafficDelay,
        mode: 'car',
        icon: 'Car',
        detail: carNeedsFuel
          ? '⚠ Stop required: HPCL Highway Oasis (km 42) for refuel'
          : 'Toll Plaza FASTag automated lane active',
      },
      {
        instruction: `Arrive at ${destination.name} - Smart Parking available`,
        distanceKm: 2.0,
        durationMin: 6,
        mode: 'car',
        icon: 'SquareParking',
        detail: controls.parkingAvailability === 'limited' ? 'Only 4 spots left at destination' : 'Pre-booking available',
      },
    ],
    pathCoordinates: CORRIDOR_NH16_PATH,
    warnings: [
      ...(incidentAlert ? [incidentAlert] : []),
      ...(carNeedsFuel ? ['Low fuel warning: Remaining range may be insufficient for round trip.'] : []),
      ...(controls.parkingAvailability === 'full' ? ['Destination parking is at near capacity.'] : []),
    ],
    aiRationale: [
      'Direct point-to-point convenience without intermediate transfers.',
      carNeedsFuel ? 'Automated stop added at HPCL Oasis (km 42).' : 'FASTag toll lane enabled.',
    ],
    requiresChargingStop: false,
    requiresFuelStop: carNeedsFuel,
    fuelStationName: carNeedsFuel ? 'HPCL Highway Oasis & Fuel Plaza' : undefined,
    parkingAvailableAtDest: controls.parkingAvailability !== 'full',
    isWheelchairAccessible: true,
    isRecommended: false,
    score: 0,
  };

  // 3. Electric Vehicle (EV Car / EV 2W)
  const evBaseTime = isIntercity ? 145 : 22;
  const evTrafficDelay = Math.round(evBaseTime * trafficDelayMultiplier) + Math.round(incidentDelay * 0.8);
  const evWeatherDelay = Math.round(evBaseTime * weatherDelayMultiplier);
  // EV range calculation
  const predictedRangeKm = Math.round((controls.batteryLevel / 100) * 280);
  const evNeedsCharge = predictedRangeKm < distanceKm + 20;
  const chargeStopMinutes = evNeedsCharge ? 25 : 0;
  const evTotalDuration = evBaseTime + evTrafficDelay + evWeatherDelay + chargeStopMinutes;
  const evChargingCost = Math.round(distanceKm * 1.8);
  const evCost = evChargingCost + (isIntercity ? 160 : 0) + 30; // low charging cost vs fuel
  const evCarbon = Math.round(distanceKm * 0.02 * 10) / 10;

  const evRoute: RouteOption = {
    id: 'route_ev',
    title: 'EV Smart Eco Drive (With Fast Charger Sync)',
    mode: 'ev',
    modeIcons: ['Zap', 'Car'],
    totalDurationMin: evTotalDuration,
    baseTravelTimeMin: evBaseTime,
    trafficDelayMin: evTrafficDelay,
    weatherDelayMin: evWeatherDelay,
    transferDelayMin: chargeStopMinutes,
    distanceKm: distanceKm,
    estimatedCost: evCost,
    costBreakdown: {
      ticketOrFuel: evChargingCost,
      toll: isIntercity ? 160 : 0,
      parking: 30,
      lastMile: 0,
    },
    carbonKg: evCarbon,
    carbonLevel: 'Low',
    safetyScore: 89,
    confidence: 'High',
    transfers: evNeedsCharge ? 1 : 0,
    walkingDurationMin: 2,
    steps: [
      {
        instruction: `Depart in EV from ${origin.name}`,
        distanceKm: 4.0,
        durationMin: 8,
        mode: 'car',
        icon: 'Zap',
      },
      ...(evNeedsCharge
        ? [
            {
              instruction: 'Charging Stop: Tata Power EZ Charge 120kW Supercharger (22 min top-up to 85%)',
              distanceKm: 42.0,
              durationMin: 25,
              mode: 'car' as const,
              icon: 'Zap',
              detail: '3 of 4 ports free right now • ₹18.5/kWh',
            },
          ]
        : []),
      {
        instruction: `Cruise along NH-16 towards ${destination.name}`,
        distanceKm: distanceKm - 10,
        durationMin: evBaseTime - 12 + evTrafficDelay,
        mode: 'car',
        icon: 'Car',
      },
    ],
    pathCoordinates: CORRIDOR_NH16_PATH,
    warnings: [
      ...(evNeedsCharge
        ? [`Battery level (${controls.batteryLevel}%) insufficient for full distance. Charging stop auto-scheduled.`]
        : []),
    ],
    aiRationale: [
      '78% lower operating costs compared to internal combustion engines.',
      'Negligible tailpipe emissions — qualifies for Green Traveler points.',
      evNeedsCharge
        ? 'Pre-routed to verified 120kW DC fast charger on highway corridor.'
        : 'Sufficient battery range for destination arrival.',
    ],
    requiresChargingStop: evNeedsCharge,
    chargingStationName: evNeedsCharge ? 'Tata Power EZ Charge - Highway Hub' : undefined,
    requiresFuelStop: false,
    parkingAvailableAtDest: true,
    isWheelchairAccessible: true,
    isRecommended: false,
    score: 0,
  };

  // 4. Two-Wheeler / Motorbike Route
  const bikeBaseTime = isIntercity ? 160 : 16;
  const bikeTrafficDelay = Math.round(bikeBaseTime * (trafficDelayMultiplier * 0.4)); // bikes filter through some traffic
  const bikeWeatherDelay =
    controls.weatherCondition === 'rain' || controls.weatherCondition === 'heavy_rain'
      ? Math.round(bikeBaseTime * 0.35)
      : Math.round(bikeBaseTime * weatherDelayMultiplier);
  const bikeTotalDuration = bikeBaseTime + bikeTrafficDelay + bikeWeatherDelay;
  const bikeCost = Math.round(distanceKm * 2.2);
  const bikeCarbon = Math.round(distanceKm * 0.05 * 10) / 10;

  const bikeCaution =
    controls.weatherCondition === 'heavy_rain' || controls.weatherCondition === 'flooding'
      ? 'Weather caution: Two-wheeler travel not advised under severe coastal rain.'
      : controls.windSpeed > 25
      ? 'Crosswind alert: High wind speeds on coastal overpasses.'
      : '';

  const bikeRoute: RouteOption = {
    id: 'route_bike',
    title: 'Two-Wheeler / Motorcycle (Coastal Scenic Bypass)',
    mode: 'bike',
    modeIcons: ['Bike'],
    totalDurationMin: bikeTotalDuration,
    baseTravelTimeMin: bikeBaseTime,
    trafficDelayMin: bikeTrafficDelay,
    weatherDelayMin: bikeWeatherDelay,
    transferDelayMin: 0,
    distanceKm: Math.round(distanceKm * 1.05),
    estimatedCost: bikeCost,
    costBreakdown: {
      ticketOrFuel: bikeCost,
      toll: 0, // 2W no toll
      parking: 15,
      lastMile: 0,
    },
    carbonKg: bikeCarbon,
    carbonLevel: 'Low',
    safetyScore:
      controls.weatherCondition === 'heavy_rain' || controls.weatherCondition === 'flooding'
        ? 55
        : controls.isNightMode
        ? 72
        : 84,
    confidence: 'Medium',
    transfers: 0,
    walkingDurationMin: 1,
    steps: [
      {
        instruction: `Ride through ${origin.city} Port Road artery`,
        distanceKm: 5.0,
        durationMin: 10,
        mode: 'bike',
        icon: 'Bike',
      },
      {
        instruction: 'Follow Coastal Highway bypass (Toll-free for two-wheelers)',
        distanceKm: distanceKm - 10,
        durationMin: bikeBaseTime - 15 + bikeTrafficDelay,
        mode: 'bike',
        icon: 'Bike',
        detail: 'Avoid low-lying underpasses during rainfall',
      },
      {
        instruction: `Arrive at dedicated two-wheeler parking bay at ${destination.name}`,
        distanceKm: 2.0,
        durationMin: 5,
        mode: 'bike',
        icon: 'Bike',
      },
    ],
    pathCoordinates: CORRIDOR_COASTAL_PATH,
    warnings: [
      ...(bikeCaution ? [bikeCaution] : []),
      ...(controls.isNightMode ? ['Night safety: Wear reflective jacket; stick to illuminated lanes.'] : []),
    ],
    aiRationale: [
      'Zero toll charges for two-wheelers on NH-16 bridges.',
      'Agile maneuverability around urban bottlenecks.',
      controls.weatherCondition === 'clear'
        ? 'Ideal weather conditions for open two-wheeler commute.'
        : 'Weather penalty applied due to current precipitation.',
    ],
    requiresChargingStop: false,
    requiresFuelStop: false,
    parkingAvailableAtDest: true,
    isWheelchairAccessible: false,
    isRecommended: false,
    score: 0,
  };

  // 5. Intercity / City Bus Route
  const busBaseTime = isIntercity ? 175 : 32;
  const busTrafficDelay = Math.round(busBaseTime * (trafficDelayMultiplier * 0.9)) + incidentDelay;
  const busWeatherDelay = Math.round(busBaseTime * (weatherDelayMultiplier * 0.8));
  const busTotalDuration = busBaseTime + busTrafficDelay + busWeatherDelay;
  const busCost = isIntercity ? 140 : 25;
  const busCarbon = Math.round(distanceKm * 0.035 * 10) / 10;

  const busRoute: RouteOption = {
    id: 'route_bus',
    title: isIntercity ? 'APSRTC Super Luxury Express Bus' : 'City Electric Bus 101 + Walk',
    mode: 'bus',
    modeIcons: ['Bus', 'Footprints'],
    totalDurationMin: busTotalDuration,
    baseTravelTimeMin: busBaseTime,
    trafficDelayMin: busTrafficDelay,
    weatherDelayMin: busWeatherDelay,
    transferDelayMin: 5,
    distanceKm: distanceKm,
    estimatedCost: busCost,
    costBreakdown: {
      ticketOrFuel: busCost,
      toll: 0,
      parking: 0,
      lastMile: 10,
    },
    carbonKg: busCarbon,
    carbonLevel: 'Low',
    safetyScore: 91,
    confidence: 'High',
    transfers: 1,
    walkingDurationMin: 9,
    steps: [
      {
        instruction: `Walk 400m to nearest Bus Stand (${origin.city})`,
        distanceKm: 0.4,
        durationMin: 5,
        mode: 'walk',
        icon: 'Footprints',
      },
      {
        instruction: isIntercity
          ? 'Board APSRTC Express Bus at Platform 3 (Next departure in 8 min)'
          : 'Board City Electric Bus 101 towards JNTU',
        distanceKm: distanceKm - 2,
        durationMin: busBaseTime - 12 + busTrafficDelay,
        mode: 'bus',
        icon: 'Bus',
        detail: 'Live GPS tracked • AC • Women priority seating zone',
        stepFree: true,
      },
      {
        instruction: `Walk 350m to ${destination.name}`,
        distanceKm: 0.35,
        durationMin: 4,
        mode: 'walk',
        icon: 'Footprints',
      },
    ],
    pathCoordinates: CORRIDOR_NH16_PATH,
    warnings: [
      ...(controls.crowdLevel === 'high' || controls.crowdLevel === 'packed'
        ? ['Bus occupancy high: Standing room only likely during peak hour.']
        : []),
    ],
    aiRationale: [
      'Very cost-effective option for single commuters.',
      'Lower personal driving stress in dense highway traffic.',
      'Regular 15-minute headway service.',
    ],
    requiresChargingStop: false,
    requiresFuelStop: false,
    parkingAvailableAtDest: true,
    isWheelchairAccessible: true,
    isRecommended: false,
    score: 0,
  };

  const allRoutes = [mmRoute, carRoute, evRoute, bikeRoute, busRoute];

  // SECTION 56: Multi-Factor AI Transparent Weighted Scoring Algorithm
  // routeScore =
  //   timeWeight * normalizedTime
  //   + costWeight * normalizedCost
  //   + trafficWeight * trafficPenalty
  //   + weatherWeight * weatherPenalty
  //   + safetyWeight * safetyFactor
  //   + carbonWeight * carbonEstimate
  //   + accessibilityWeight * accessibilityPenalty

  let timeWeight = preferences.fastest ? 3.5 : 2.0;
  let costWeight = preferences.lowestCost ? 3.5 : 1.5;
  let carbonWeight = preferences.lowerEmissions ? 3.0 : 1.2;
  let safetyWeight = preferences.saferRouteFactors ? 3.0 : 1.5;
  let accessibilityWeight = preferences.wheelchairAccessible ? 4.0 : 0.8;
  let weatherAvoidWeight = preferences.avoidBadWeather ? 3.0 : 1.0;

  allRoutes.forEach((route) => {
    // Normalization factors (lower is generally better for time/cost/carbon/penalties)
    const normTime = route.totalDurationMin / 60; // in hours
    const normCost = route.estimatedCost / 100;
    const normCarbon = route.carbonKg / 2;
    const trafficPenalty = (route.trafficDelayMin / 10) * 1.5;
    const weatherPenalty = (route.weatherDelayMin / 5) * weatherAvoidWeight;
    const safetyBenefit = (100 - route.safetyScore) / 10; // lower penalty for high safety score
    const accessibilityPenalty = preferences.wheelchairAccessible && !route.isWheelchairAccessible ? 50 : 0;
    const tollPenalty = preferences.avoidTolls && route.costBreakdown.toll > 0 ? 25 : 0;

    // Composite Penalty Score (lower penalty = higher ranking)
    const compositeScore =
      timeWeight * normTime +
      costWeight * normCost +
      carbonWeight * normCarbon +
      trafficPenalty +
      weatherPenalty +
      safetyWeight * safetyBenefit +
      accessibilityWeight * accessibilityPenalty +
      tollPenalty;

    route.score = compositeScore;
  });

  // Sort ascending by composite penalty score
  allRoutes.sort((a, b) => a.score - b.score);

  // Set the top route as the AI Recommended Route
  if (allRoutes.length > 0) {
    allRoutes[0].isRecommended = true;
    allRoutes[0].aiRationale.unshift('Recommended based on your selected multi-factor preferences.');
  }

  return allRoutes;
}

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useMobility } from '../../context/MobilityContext';
import { DEMO_EV_CHARGERS, DEMO_BATTERY_SWAP_STATIONS, DEMO_FUEL_STATIONS } from '../../data/evAndFuelData';
import { DEMO_PARKING_LOCATIONS } from '../../data/parkingData';
import { DEMO_INCIDENTS } from '../../data/incidentsData';
import { DEMO_PUBLIC_TRANSIT } from '../../data/publicTransitData';
import { DEMO_LOCATIONS } from '../../data/locations';
import {
  Layers,
  Crosshair,
  AlertTriangle,
  Zap,
  Fuel,
  SquareParking,
  Bus,
  CloudRain,
  ShieldAlert,
} from 'lucide-react';

// Custom SVG icon generator for Leaflet
function createCustomIcon(bgClass: string, iconHtml: string, size = 32) {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${bgClass};
        color: white;
        border: 2px solid rgba(255,255,255,0.9);
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        cursor: pointer;
      ">
        ${iconHtml}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

export const MapView: React.FC<{ height?: string; interactive?: boolean }> = ({
  height = '100%',
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const {
    origin,
    destination,
    selectedRoute,
    mapLayers,
    toggleMapLayer,
    demoControls,
    setDestination,
    startNavigation,
  } = useMobility();

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center near Kakinada / Rajahmundry / Vizag corridor
    const map = L.map(mapContainerRef.current, {
      center: [17.25, 82.65],
      zoom: 9,
      zoomControl: interactive,
      dragging: interactive,
      scrollWheelZoom: interactive,
      attributionControl: false,
    });

    // Dark sleek CartoDB basemap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [interactive]);

  // Update dynamic markers & route polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Current Origin Marker with Pulse Ring
    const originIcon = L.divIcon({
      className: 'origin-marker',
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <div class="radar-pulse-ring" style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(59, 130, 246, 0.4);"></div>
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #2563eb; border: 3px solid white; box-shadow: 0 0 10px rgba(37,99,235,0.8);"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    L.marker([origin.lat, origin.lng], { icon: originIcon })
      .bindPopup(`
        <div style="padding: 4px; font-size: 13px;">
          <div style="font-weight: 700; color: #60a5fa; margin-bottom: 2px;">📍 Current Origin</div>
          <div style="font-weight: 600;">${origin.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">GPS Accuracy: ±4m (Simulated Live)</div>
        </div>
      `)
      .addTo(layerGroup);

    // 2. Destination Marker
    const destIcon = createCustomIcon(
      '#ef4444',
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
      34
    );

    L.marker([destination.lat, destination.lng], { icon: destIcon })
      .bindPopup(`
        <div style="padding: 4px; font-size: 13px;">
          <div style="font-weight: 700; color: #f87171; margin-bottom: 2px;">🏁 Destination</div>
          <div style="font-weight: 600;">${destination.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">${destination.city} • ${destination.description}</div>
        </div>
      `)
      .addTo(layerGroup);

    // 3. Incidents Markers (if layer enabled)
    if (mapLayers.incidents) {
      DEMO_INCIDENTS.forEach((inc) => {
        const incIcon = createCustomIcon(
          '#f59e0b',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
          28
        );

        L.marker([inc.lat, inc.lng], { icon: incIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 4px; color: #fbbf24; font-weight: bold;">
                <span>⚠ ${inc.impact}</span>
              </div>
              <div style="font-weight: 600; margin-top: 2px;">${inc.title}</div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${inc.locationName}</div>
              <div style="margin-top: 6px; font-size: 10px; background: rgba(245,158,11,0.2); padding: 2px 6px; border-radius: 4px; display: inline-block;">
                ${inc.status} • ${inc.reportedMinutesAgo}m ago
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });
    }

    // 4. EV Chargers & Battery Swapping (if layer enabled)
    if (mapLayers.ev) {
      DEMO_EV_CHARGERS.forEach((ev) => {
        const evIcon = createCustomIcon(
          '#10b981',
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
          28
        );

        L.marker([ev.lat, ev.lng], { icon: evIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="font-weight: bold; color: #34d399;">⚡ EV Supercharger</div>
              <div style="font-weight: 600; margin-top: 2px;">${ev.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 3px;">
                Type: <b>${ev.chargerType}</b><br/>
                Available: <b>${ev.availablePorts}/${ev.totalPorts} ports free</b><br/>
                Price: <b>₹${ev.pricePerKwh}/kWh</b>
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });

      DEMO_BATTERY_SWAP_STATIONS.forEach((swap) => {
        const swapIcon = createCustomIcon(
          '#06b6d4',
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/></svg>',
          26
        );

        L.marker([swap.lat, swap.lng], { icon: swapIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="font-weight: bold; color: #22d3ee;">🔄 2W Battery Swap Station</div>
              <div style="font-weight: 600;">${swap.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 3px;">
                Ready Batteries: <b>${swap.availableBatteries}</b><br/>
                Swap Time: <b>${swap.swapTimeSec} seconds</b><br/>
                Compat: ${swap.compatibility}
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });
    }

    // 5. Fuel Stations (if layer enabled)
    if (mapLayers.fuel) {
      DEMO_FUEL_STATIONS.forEach((fuel) => {
        const fuelIcon = createCustomIcon(
          '#f97316',
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 22h12M4 9h10M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
          26
        );

        L.marker([fuel.lat, fuel.lng], { icon: fuelIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="font-weight: bold; color: #fb923c;">⛽ ${fuel.brand}</div>
              <div style="font-weight: 600;">${fuel.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 3px;">
                Petrol: <b>₹${fuel.petrolPrice}/L</b> • Diesel: <b>₹${fuel.dieselPrice}/L</b><br/>
                Amenities: ${fuel.facilities.slice(0, 2).join(', ')}
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });
    }

    // 6. Smart Parking (if layer enabled)
    if (mapLayers.parking) {
      DEMO_PARKING_LOCATIONS.forEach((prk) => {
        const prkIcon = createCustomIcon(
          '#8b5cf6',
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
          26
        );

        L.marker([prk.lat, prk.lng], { icon: prkIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="font-weight: bold; color: #a78bfa;">🅿 Smart Parking Hub</div>
              <div style="font-weight: 600;">${prk.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 3px;">
                Vacant: <b>${prk.availableSpots}/${prk.totalSpots} spots</b><br/>
                Rate: <b>₹${prk.hourlyRate}/hr</b> • EV Charger: ${prk.hasEvCharging ? 'Yes' : 'No'}<br/>
                AI Availability Prediction: <b>${prk.predictionChanceAtTime}%</b>
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });
    }

    // 7. Public Transit (if layer enabled)
    if (mapLayers.transit) {
      DEMO_PUBLIC_TRANSIT.forEach((pt) => {
        const transitIcon = createCustomIcon(
          pt.type === 'train' ? '#3b82f6' : pt.type === 'metro' ? '#6366f1' : '#14b8a6',
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 6v6M16 6v6M2 12h20M7 19l-3 3M17 19l3 3M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>',
          26
        );

        L.marker([pt.lat, pt.lng], { icon: transitIcon })
          .bindPopup(`
            <div style="padding: 4px; font-size: 12px;">
              <div style="font-weight: bold; color: #38bdf8;">🚊 ${pt.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">
                Next Arrival: <b>${pt.arrivalMinutes} min</b> • Fare: <b>₹${pt.fare}</b><br/>
                Crowd: <b>${pt.crowdLevel.toUpperCase()}</b> • Status: ${pt.status}
              </div>
            </div>
          `)
          .addTo(layerGroup);
      });
    }

    // 8. Draw Route Polyline
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
      routePolylineRef.current = null;
    }

    if (selectedRoute && selectedRoute.pathCoordinates.length > 0) {
      let lineColor = '#3b82f6'; // default blue
      if (selectedRoute.mode === 'ev') lineColor = '#10b981';
      else if (selectedRoute.mode === 'bike') lineColor = '#f59e0b';
      else if (selectedRoute.mode === 'multimodal') lineColor = '#8b5cf6';
      else if (demoControls.trafficLevel === 'heavy') lineColor = '#ef4444';

      const polyline = L.polyline(selectedRoute.pathCoordinates, {
        color: lineColor,
        weight: 6,
        opacity: 0.88,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      routePolylineRef.current = polyline;

      // Fit map bounds to show route smoothly
      try {
        const bounds = polyline.getBounds();
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      } catch {
        // ignore bounds calculation error
      }
    }
  }, [origin, destination, selectedRoute, mapLayers, demoControls]);

  const handleRecenter = () => {
    if (mapInstanceRef.current && selectedRoute) {
      mapInstanceRef.current.fitBounds(L.polyline(selectedRoute.pathCoordinates).getBounds(), {
        padding: [60, 60],
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl" style={{ height }}>
      {/* Map container DOM */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Status / Weather Pill in Top Left */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-slate-200 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Live Corridor Feed (Simulated)</span>
        </div>

        {demoControls.weatherCondition !== 'clear' && (
          <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-cyan-300 shadow-lg border-cyan-500/30">
            <CloudRain size={13} className="animate-bounce" />
            <span>Weather Alert: {demoControls.weatherCondition.replace('_', ' ').toUpperCase()}</span>
          </div>
        )}

        {demoControls.activeIncident !== 'none' && (
          <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-amber-300 shadow-lg border-amber-500/30">
            <AlertTriangle size={13} />
            <span>Hazard: {demoControls.activeIncident.replace('_', ' ').toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Floating Layer Controls in Top Right */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="glass-panel p-2 rounded-xl flex flex-wrap items-center gap-1.5 shadow-xl text-xs">
          <button
            onClick={() => toggleMapLayer('traffic')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.traffic ? 'bg-blue-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Traffic
          </button>
          <button
            onClick={() => toggleMapLayer('incidents')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.incidents ? 'bg-amber-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert size={12} /> Incidents
          </button>
          <button
            onClick={() => toggleMapLayer('ev')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.ev ? 'bg-emerald-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap size={12} /> EV Hubs
          </button>
          <button
            onClick={() => toggleMapLayer('fuel')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.fuel ? 'bg-orange-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Fuel size={12} /> Fuel
          </button>
          <button
            onClick={() => toggleMapLayer('parking')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.parking ? 'bg-purple-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <SquareParking size={12} /> Parking
          </button>
          <button
            onClick={() => toggleMapLayer('transit')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
              mapLayers.transit ? 'bg-indigo-600/80 text-white font-semibold shadow' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bus size={12} /> Transit
          </button>
        </div>

        <button
          onClick={handleRecenter}
          title="Recenter Map along Selected Route"
          className="glass-panel p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all shadow-lg"
        >
          <Crosshair size={18} />
        </button>
      </div>

      {/* Floating Bottom Route Info Overlay */}
      {selectedRoute && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto">
          <div className="glass-panel p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 border border-slate-700/80 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                {selectedRoute.totalDurationMin}m
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{selectedRoute.title}</span>
                  {selectedRoute.isRecommended && (
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      AI RECOMMENDED
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>{selectedRoute.distanceKm} km</span>
                  <span>•</span>
                  <span>₹{selectedRoute.estimatedCost} est.</span>
                  <span>•</span>
                  <span className="text-emerald-400">{selectedRoute.carbonKg} kg CO₂e</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => startNavigation(selectedRoute)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <span>Start Navigation</span>
                <span className="text-base leading-none">➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

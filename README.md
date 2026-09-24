# AI-Powered GPS-Based Weather-Aware, Safety-Aware and Smart Multi-Modal Mobility System
**Short Name:** AI Smart Mobility  
**Corridor Focus:** Andhra Pradesh Coastal Artery (Kakinada ↔ Rajahmundry ↔ Anakapalle ↔ Visakhapatnam)  
**Status:** Working Interactive Prototype (Hackathon & College Presentation Ready)

---

## 1. Project Title & Overview
**“AI-Powered GPS-Based Weather-Aware, Safety-Aware and Smart Multi-Modal Mobility System”** is a next-generation intelligent urban and regional transit platform designed to answer the fundamental question:

> **“What is the most suitable, safest, and greenest way for this user to travel right now?”**

Rather than serving as a standard navigation clone, the platform acts as an **AI Multi-Factor Mobility Orchestrator** connecting real-time traffic, coastal monsoon weather, road incidents, two-wheelers, four-wheelers, EV charging infrastructure, battery-swapping stations, public transit (bus, metro, railway), smart parking forecasting, solo traveler safety modes, dynamic rerouting, and carbon offset ledgers into one reactive interface.

---

## 2. Core Highlights & Features

### 🧠 Intelligent Multi-Factor Decision Making
- **Explainable Weighted AI Scoring Model**:
  $$\text{Score} = w_{\text{time}} \cdot T + w_{\text{cost}} \cdot C + w_{\text{traffic}} \cdot \Delta_{\text{traf}} + w_{\text{weather}} \cdot \Delta_{\text{wx}} + w_{\text{safety}} \cdot S + w_{\text{carbon}} \cdot E$$
- Every recommendation displays clear human-readable explanations ("Why this was suggested: Avoids coastal flooding zone, lower tailpipe emissions, step-free access").
- **Predictive ETA Breakdown**: Separates base travel duration, road congestion delay, weather-related caution buffers, and transfer times with a confidence indicator.

### 🗺️ Interactive GIS Mapping Experience
- Interactive Leaflet & CartoDB dark vector basemap tiles.
- Dynamic route polylines with congestion-coded segments.
- Toggleable overlay layers: Traffic, Weather alerts, Road hazards, EV Superchargers, Battery Swap hubs, Fuel stations, Smart Parking, and Public Transit stations.
- Real-time GPS location marker with simulated radar ping.

### ⚡ Electric Vehicle & Fuel Ecosystem
- **EV Range Prediction Engine**: Automatically adjusts battery range based on current temperature, rainfall, and traffic congestion.
- **Automated Charging Stop Insertion**: Automatically schedules highway 120kW DC fast charging stops when battery SoC is insufficient.
- **Battery Swapping Network**: Instant 90-second battery swaps for 2-wheelers with live battery availability counts.
- **Fuel Intelligence & Low-Fuel Alert**: Real-time petrol/diesel pricing and automatic fuel station recommendations when tank falls below reserve.

### 🛡️ Safety Center, Solo Traveler Mode & Emergency SOS
- **Personal Safety Guardian**: Designed for solo and women travelers with live trip link sharing and route deviation monitoring.
- **One-Tap SOS Emergency Dispatch**: 5-second cancel buffer, simulated sirens, and automated SMS GPS coordinate broadcast to trusted contacts.
- **Night Safety Routing**: Prioritizes illuminated avenues, active CCTV corridors, and higher pedestrian presence.
- **Community Road Hazard Reporting**: Community reporting for potholes, monsoon underpass waterlogging, and traffic signal outages.

### 🚊 Unified Public Transit Hub
- Unified tabbed schedules for APSRTC City/Express Buses, Coastal Light Metro, and Indian Railways (Vande Bharat Express, Janmabhoomi Express).
- **AI Crowd Density Predictor**: Predicts peak morning/evening coach occupancy.

### ♿ Universal Accessibility & Audio Guidance
- Wheelchair-accessible routing with step-free paths, ramp gradient compliance, and elevator indicators.
- In-browser **Web Speech API text-to-speech navigation** in **English, Telugu (తెలుగు), and Hindi (हिन्दी)**.

### 🌱 Carbon Dashboard & Gamification
- Tracks monthly transport emissions in $\text{kg CO}_2\text{e}$ and tree offset equivalents.
- Dedicated **🌱 Green Route** selector.
- Mobility Points & Achievement Badges (*Green Traveler*, *Safe Traveler*, *Active Traveler*, *EV Pioneer*).

### 👥 Family Trip Coordination & Smart Commute
- Multi-origin group travel with automated synchronization at an optimal meeting hub (e.g. CMR Central Mall).
- **My Commute (AI)**: Compares daily routine departure with real-time traffic to recommend leaving 10 minutes early and saving 8 minutes.

### 🕶️ Spatial AR Navigation & Offline Cache
- Simulated Heads-Up Display (HUD) camera view with floating turn direction vectors.
- Offline maps download simulation for Kakinada (42 MB) and Visakhapatnam (78 MB).

---

## 3. Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Tailwind v4), Glassmorphism, Responsive Mobile & Desktop Layouts
- **Maps & GIS**: Leaflet, OpenStreetMap / CartoDB Voyager raster tiles
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Audio & Voice**: Web Speech API (`SpeechSynthesisUtterance`)
- **Backend Architecture**: RESTful API endpoints structure (`/api/routes`, `/api/traffic`, `/api/weather`, `/api/parking`, etc.)
- **Database Schema**: PostGIS / PostgreSQL declarative entity models

---

## 4. Installation & Local Setup

### Prerequisites
- Node.js (v18.0.0 or higher, tested on Node.js v24 LTS)
- npm (v9.0.0 or higher)

### Steps
```bash
# 1. Clone the repository or navigate to project directory
cd mobility

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 5. Demo Controls & Presentation Mode

### 🎛️ Interactive Demo Controls Panel
Click the **"Demo Controls"** button in the top navigation bar to open the live simulator:
- **Traffic Level**: Low ➔ Moderate ➔ Heavy ➔ Gridlock
- **Weather Condition**: Clear ➔ Partly Cloudy ➔ Rain ➔ Heavy Rain ➔ Flooding
- **EV Battery Level**: Slider from 10% to 100% (under 35% triggers charging stop)
- **Fuel Tank Level**: Slider from 10% to 100% (under 25% triggers Low Fuel Alert)
- **Active Incident**: None ➔ Pothole ➔ Accident ➔ Waterlogging ➔ Construction ➔ Broken Signal
- **Destination Parking**: Available ➔ Limited ➔ Full
- **Time of Day & Night Mode**: Toggles night safety factor weighting

### 🚀 "RUN SMART MOBILITY DEMO" (18-Step Hackathon Walkthrough)
Click the purple **"RUN SMART MOBILITY DEMO"** button to start the guided presentation tour:
1. Detect origin GPS location (Kakinada Town)
2. Select destination (Visakhapatnam Junction / Central)
3. Analyze road traffic
4. Analyze coastal weather
5. Analyze road safety & incidents
6. Analyze fuel & battery reserve
7. Analyze public transport availability
8. Analyze smart parking at destination
9. Calculate predictive ETA
10. Calculate multimodal cost breakdown
11. Calculate carbon emissions
12. Compare 5 alternative routes
13. Select AI recommended route
14. Launch live turn-by-turn navigation with audio guidance
15. Trigger simulated highway incident
16. Dynamic AI rerouting & acceptance
17. Arrive at destination & celebratory confetti
18. Save trip to history & award mobility points!

---

## 6. Sample Personas
Switch personas from the top right avatar menu:
- **Aarav Sharma**: College Student (JNTU Kakinada) — Daily multimodal commuter (Bike + Feeder Bus).
- **Priya Rao**: IT Professional (Vizag Tech Park) — Safety-conscious, EV driver (Tata Nexon EV).
- **Vikram Varma**: Highway Commuter — Four-wheeler FASTag driver.
- **Kavya Patel**: Solo Traveler & Student — Solo safety mode & Ather 450X EV scooter user.

---

## 7. Environment Variables
See `.env.example`:
```env
VITE_MAP_PROVIDER=osm
VITE_MAP_API_KEY=
VITE_WEATHER_API_KEY=
VITE_TRAFFIC_API_KEY=
VITE_AI_API_KEY=
DATABASE_URL=
VITE_DEMO_MODE=true
```

---

## 8. Responsible AI & Safety Standards
- **Clear Demarcation**: All simulated or projected data is explicitly labeled (*"Demo data • Simulated"*, *"AI Prediction"*, *"Estimated"*).
- **Ethical Safety Modeling**: Evaluates objective infrastructure signals (lighting, CCTV, physical potholes) and strictly avoids subjective stigmatization of geographic neighborhoods.
- **Privacy by Design**: All telemetry and trip records remain sandboxed in the client browser with granular user toggle controls.

---

## 9. License & Credits
Developed as an academic and hackathon demonstration prototype for intelligent, multi-modal, sustainable transportation.

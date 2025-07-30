"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Home, MapPin, X, ChevronUp } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ROUTE_COORDINATES } from "../config";
import { getSnappedRoute } from './getSnappedRoute';

// Planned stops with coordinates
const plannedStops = [
  { name: "Tirupati", description: "Starting Point - Departure 3:30 PM", coordinates: [13.628724891518354, 79.42627315507207] as [number, number], type: "start", time: "3:30 PM", icon: "🏠" },
  { name: "Puttur", description: "First Stop - Arrival 4:30 PM", coordinates: [13.4383801, 79.5519144] as [number, number], type: "stop", time: "4:30 PM", icon: "⛽" },
  { name: "Mettupalayam", description: "Refreshment Stop - Arrival 3:30 AM", coordinates: [11.3019, 76.9392] as [number, number], type: "stop", time: "3:30 AM", icon: "🍽️" },
  { name: "Ooty", description: "Main Destination - Arrival 7:30 AM", coordinates: [11.4064, 76.6932] as [number, number], type: "destination", time: "7:30 AM", icon: "🏔️" },
  { name: "Coimbatore", description: "Return Journey Stop", coordinates: [11.0168, 76.9558] as [number, number], type: "stop", time: "4:30 AM", icon: "🕌" },
];

export default function LiveMap() {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Map initialization (only once)
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([13.6287, 79.4262], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Add planned stops pins
      plannedStops.forEach((stop) => {
        const stopIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center">
              <div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold">
                ${stop.icon}
              </div>
              <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap border border-gray-300">
                ${stop.name}
              </div>
            </div>
          `,
          className: "custom-div-icon",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        L.marker(stop.coordinates, { icon: stopIcon }).addTo(mapRef.current!)
          .bindPopup(`
            <div class="text-center p-2">
              <h3 class="font-bold text-lg">${stop.icon} ${stop.name}</h3>
              <p class="text-sm text-gray-600 mb-1">${stop.description}</p>
              <p class="text-xs bg-blue-100 px-2 py-1 rounded">${stop.time}</p>
            </div>
          `);
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Polling for live updates (update marker/polyline only)
  useEffect(() => {
    let isMounted = true;
    const updateMap = async () => {
      let lat: number | null = null;
      let lng: number | null = null;
      let lastUpdated: string | null = null;
      const defaultCoords: [number, number] = [13.628724891518354, 79.42627315507207];

      try {
        const res = await fetch("/api/adminGPS/admin-location");
        if (!res.ok) {
          lat = defaultCoords[0];
          lng = defaultCoords[1];
          lastUpdated = null;
        } else {
          const data = await res.json();
          lat = data.latitude ?? data.lat;
          lng = data.longitude ?? data.lng;
          lastUpdated = data.lastUpdated ?? null;
        }
        if (
          typeof lat !== "number" ||
          typeof lng !== "number" ||
          isNaN(lat) ||
          isNaN(lng)
        ) {
          lat = defaultCoords[0];
          lng = defaultCoords[1];
          lastUpdated = null;
        }
        const coords: [number, number] = [lat, lng];
        const snappedCoords = await getSnappedRoute(ROUTE_COORDINATES, process.env.NEXT_PUBLIC_ORS_API_KEY!);

        // Update polyline
        if (mapRef.current && snappedCoords.length > 0) {
          if (polylineRef.current) {
            mapRef.current.removeLayer(polylineRef.current);
          }
          polylineRef.current = L.polyline(snappedCoords, {
            color: 'red',
            weight: 4,
          }).addTo(mapRef.current);
        }

        // Update marker
        const busIcon = L.icon({
          iconUrl: "/bus.gif",
          iconSize: [70, 70],
          iconAnchor: [50, 60],
        });
        if (mapRef.current) {
          if (!markerRef.current) {
            markerRef.current = L.marker(coords, { icon: busIcon }).addTo(mapRef.current);
          } else {
            markerRef.current.setLatLng(coords);
          }
        }

        // Update infoText
        const infoText = document.getElementById("infoText");
        if (infoText) {
          if (lastUpdated) {
            const lastSeenMS = Date.now() - new Date(lastUpdated).getTime();
            const diffMinutes = Math.floor(lastSeenMS / 60000);
            const diffHours = Math.floor(lastSeenMS / 3600000);
            const diffDays = Math.floor(lastSeenMS / 86400000);

            if (lastSeenMS < 30 * 1000) {
              infoText.textContent = "🟢 Live location active";
              infoText.className =
                "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow-md z-50";
            } else if (diffDays > 0) {
              infoText.textContent = `🟡 Last seen ${diffDays} day(s) ago`;
              infoText.className =
                "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg shadow-md z-50";
            } else if (diffHours > 0) {
              infoText.textContent = `🟡 Last seen ${diffHours} hour(s) ago`;
              infoText.className =
                "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg shadow-md z-50";
            } else {
              infoText.textContent = `🟡 Last seen ${diffMinutes} minute(s) ago`;
              infoText.className =
                "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg shadow-md z-50";
            }
          } else {
            infoText.textContent = "🔴 GPS offline - Showing planned route";
            infoText.className =
              "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg shadow-md z-50";
          }
        }
      } catch (err) {
        // Fallback: show planned route and marker at default location
        if (mapRef.current) {
          const fallbackCoords: [number, number] = [13.628724891518354, 79.42627315507207];
          const snappedCoords = await getSnappedRoute(ROUTE_COORDINATES, process.env.NEXT_PUBLIC_ORS_API_KEY!);
          if (polylineRef.current) {
            mapRef.current.removeLayer(polylineRef.current);
          }
          polylineRef.current = L.polyline(snappedCoords, {
            color: 'red',
            weight: 4,
          }).addTo(mapRef.current);
          const busIcon = L.icon({
            iconUrl: "/bus.gif",
            iconSize: [50, 50],
            iconAnchor: [25, 25],
          });
          if (!markerRef.current) {
            markerRef.current = L.marker(fallbackCoords, { icon: busIcon }).addTo(mapRef.current);
          } else {
            markerRef.current.setLatLng(fallbackCoords);
          }
          const infoText = document.getElementById("infoText");
          if (infoText) {
            infoText.textContent = "🔴 GPS offline - Showing planned route";
            infoText.className =
              "absolute top-16 sm:top-20 right-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg shadow-md z-50";
          }
        }
      }
    };

    updateMap();
    const interval = setInterval(updateMap, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Custom CSS for map pins */}
      <style jsx global>{`
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>

      {/* Navigation Header - Same as Home Page */}
      <AnimatePresence>
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/10 shadow-2xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 100,
          }}
        >
          {/* Mobile-optimized container */}
          <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
            <div className="flex items-center justify-between h-12 sm:h-14">
              {/* Logo Section - Optimized for mobile */}
              <motion.div
                className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="/favicon.ico"
                    alt="Logo"
                    className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-lg"
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>

                <div className="flex flex-col">
                  <span className="text-base sm:text-lg lg:text-xl font-black bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent leading-tight">
                    Industrial Visit 2025
                  </span>
                  <span className="text-xs text-blue-300/80 font-medium hidden sm:block leading-none">
                    Dept of CSE - Siddartha Institute of Science and Technology
                  </span>
                </div>
              </motion.div>

              {/* Navigation Buttons - Mobile Optimized */}
              <motion.div
                className="flex items-center space-x-2 sm:space-x-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                {/* Home Button - Compact for mobile */}
                <Link href="/">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -1,
                      boxShadow: "0 8px 25px rgba(255,255,255,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-white/5 hover:bg-white/15 backdrop-blur-md text-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/10 hover:border-white/30 font-medium text-xs sm:text-sm lg:text-base tracking-wide transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                      <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Home</span>
                    </span>
                  </motion.button>
                </Link>

                {/* GPS Button - Active State */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-md text-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-emerald-400/60 font-medium text-xs sm:text-sm lg:text-base tracking-wide transition-all duration-300 overflow-hidden shadow-lg"
                >
                  {/* Content with responsive text */}
                  <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>

                    {/* Responsive text */}
                    <span className="hidden min-[380px]:inline sm:hidden lg:inline">
                      GPS Active
                    </span>
                    <span className="min-[380px]:hidden sm:inline lg:hidden">
                      GPS
                    </span>
                    <span className="hidden sm:hidden min-[380px]:hidden">
                      📍
                    </span>
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Subtle bottom border animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </nav>
        </motion.header>
      </AnimatePresence>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        id="map"
        className="w-full h-full z-0 rounded-none absolute inset-0"
        style={{
          top: isMobile ? "60px" : "70px",
          height: `calc(100vh - ${isMobile ? 60 : 70}px)`
        }}
      />

      {/* Status indicator */}
      <div
        id="infoText"
        className="absolute top-16 sm:top-20 right-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-md z-50 border border-gray-600"
      >
        🔄 Loading bus location...
      </div>


      {/* Control panel */}
      {panelOpen ? (
        <div className="absolute bottom-1 left-1 bg-black/80 backdrop-blur-md text-white p-2 rounded-lg shadow-lg z-30 border border-gray-500 w-55 max-w-xs">
          {/* Close button */}
          <button
            onClick={() => setPanelOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold mb-2 text-blue-300">
            🚌 Live Bus Tracker
          </h3>
          <p className="text-sm text-gray-300 mb-3">Industrial Visit 2025</p>

          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 mb-3"
          >
            🔄 Refresh Location
          </button>

          {/* Planned Stops Legend */}
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-blue-200 mb-2">
              📍 Planned Stops:
            </h4>
            <div className="space-y-1 text-xs text-gray-300">
              {plannedStops.map((stop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{stop.icon}</span>
                  <span>{stop.name}</span>
                  <span className="text-gray-400">({stop.time})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-400">
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>Planned Route</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Planned Stops</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Live Bus Location</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setPanelOpen(true)}
          className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg z-50 border border-gray-600 flex items-center space-x-2"
          aria-label="Show Info"
        >
          <span>Info</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Emergency contact */}
      <div className="absolute bottom-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white p-3 rounded-lg shadow-lg z-50 border border-emerald-500">
        <p className="text-xs font-medium">📞 Emergency Contact</p>
        <p className="text-sm font-bold">+91 9440850545</p>
      </div>
    </div>
  );
}
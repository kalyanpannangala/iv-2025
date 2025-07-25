import React, { useEffect, useRef, useState } from "react";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LOCATION_EVENTS } from "../config";
import AnimatedTexts from "./AnimatedTexts";

const LiveMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [currentGif, setCurrentGif] = useState("/gifs/travel.gif");

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    async function initMap() {
      // Fetch route first
      let route: LatLngTuple[] = [];
      try {
        const resp = await fetch("/api/route");
        if (!resp.ok) throw new Error("Failed to fetch route from API");
        const data: { route: [number, number][] } = await resp.json();
        if (!data.route || data.route.length === 0) throw new Error("Empty route data");
        route = data.route;
      } catch (error) {
        console.error("Route fetch error:", error);
        return;
      }

      // Initialize map
      if (!mapRef.current) {
        mapRef.current = L.map("map", {
          center: route[0],
          zoom: 13,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);
      }

      // Draw route
      const polyline = L.polyline(route, { color: "red", weight: 4 }).addTo(mapRef.current);
      mapRef.current.fitBounds(polyline.getBounds());

      // Add bus marker
      const busIcon = L.icon({
        iconUrl: "/bus.gif",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(route[0], { icon: busIcon }).addTo(mapRef.current);
   

      // Track location
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
          (pos) => {
            const currentPos: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
            marker.setLatLng(currentPos);

            let matched = false;
            for (const loc of LOCATION_EVENTS) {
              const dist = mapRef.current!.distance(currentPos, loc.coords as LatLngTuple);
              if (dist < loc.radius) {
                setCurrentGif(loc.gif);
                matched = true;
                break;
              }
            }
            if (!matched) setCurrentGif("/gifs/travel.gif");
          },
          (err) => {
            console.error("Geolocation error:", err);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.warn("Geolocation is not available in this browser.");
      }
    }

    initMap();

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div id="map" className="w-full h-full" />
      <AnimatedTexts currentGif={currentGif} />
    </div>
  );
};

export default LiveMap;

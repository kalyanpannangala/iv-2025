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
        if (typeof window === "undefined") return;

        async function initMap() {
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

            const busIcon = L.icon({
                iconUrl: "/bus.gif",
                iconSize: [80, 80],
                iconAnchor: [60, 80],
            });

            const drawMap = (centerPos: LatLngTuple, zoomLevel = 30) => {
                if (!mapRef.current) {
                    mapRef.current = L.map("map").setView(centerPos, zoomLevel);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: "&copy; OpenStreetMap contributors",
                    }).addTo(mapRef.current);
                }

                // Draw red route
                const polyline = L.polyline(route, { color: "red", weight: 4 }).addTo(mapRef.current!);

                // ✅ Only add ONE bus marker
                const marker = L.marker(centerPos, { icon: busIcon }).addTo(mapRef.current!);
                markerRef.current = marker;
            };

            // Track location
            const handleGeoSuccess = (pos: GeolocationPosition) => {
                const currentPos: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];
                drawMap(currentPos, 16); // zoom to live location

                navigator.geolocation.watchPosition(
                    (pos) => {
                        const updatedPos: LatLngTuple = [pos.coords.latitude, pos.coords.longitude];

                        // ✅ Just MOVE the existing marker
                        if (markerRef.current) {
                            markerRef.current.setLatLng(updatedPos);
                            mapRef.current?.setView(updatedPos);
                        }

                        // Animated events
                        let matched = false;
                        for (const loc of LOCATION_EVENTS) {
                            const dist = mapRef.current!.distance(updatedPos, loc.coords as LatLngTuple);
                            if (dist < loc.radius) {
                                setCurrentGif(loc.gif);
                                matched = true;
                                break;
                            }
                        }
                        if (!matched) setCurrentGif("/gifs/travel.gif");
                    },
                    (err) => {
                        console.error("Geolocation watch error:", err);
                    },
                    { enableHighAccuracy: true }
                );
            };

            const handleGeoError = (err: GeolocationPositionError) => {
                console.error("Geolocation error:", err);
                const fallbackCenter = route[0];
                drawMap(fallbackCenter, 13);
                mapRef.current?.fitBounds(L.polyline(route).getBounds());
            };

            navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {
                enableHighAccuracy: true,
            });
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

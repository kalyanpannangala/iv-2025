'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ROUTE_COORDINATES } from '../config';

export default function LiveMap() {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      let lat: number | null = null;
      let lng: number | null = null;
      let lastUpdated: string | null = null;

      try {
        const res = await fetch('/api/adminGPS/admin-location');

        if (!res.ok) {
          console.warn('⚠️ Response not OK', res.status);
          const errorData = await res.json().catch(() => null);
          if (errorData?.latitude && errorData?.longitude) {
            lat = errorData.latitude;
            lng = errorData.longitude;
            lastUpdated = errorData.lastUpdated ?? null;
          } else {
            throw new Error('No fallback coordinates available');
          }
        } else {
          const data = await res.json();
          lat = data.lat ?? data.latitude;
          lng = data.lng ?? data.longitude;
          lastUpdated = data.lastUpdated ?? null;
        }

        if (typeof lat !== 'number' || typeof lng !== 'number') {
          throw new Error('Invalid coordinates');
        }

        const coords: [number, number] = [lat, lng];

        // Init map
        if (!mapRef.current) {
          mapRef.current = L.map('map', {
            center: coords,
            zoom: 14,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(mapRef.current);

          L.polyline(ROUTE_COORDINATES, {
            color: 'red',
            weight: 4,
            dashArray: '6, 6',
          }).addTo(mapRef.current);
        }

        const busIcon = L.icon({
          iconUrl: '/bus.gif',
          iconSize: [50, 50],
          iconAnchor: [25, 25],
        });

        if (!markerRef.current) {
          markerRef.current = L.marker(coords, { icon: busIcon }).addTo(mapRef.current);
        } else {
          markerRef.current.setLatLng(coords);
        }

        const infoText = document.getElementById('infoText');
        if (infoText) {
          if (lastUpdated) {
            const lastSeenMS = Date.now() - new Date(lastUpdated).getTime();
            const diffMinutes = Math.floor(lastSeenMS / 60000);

            if (lastSeenMS < 30 * 1000) {
              infoText.textContent = '🟢 Live location active';
            } else {
              infoText.textContent = `🟡 Last seen ${diffMinutes} minute(s) ago`;
            }
          } else {
            infoText.textContent = '🟡 Location timestamp missing';
          }
        }
      } catch (err) {
        console.error('❌ Map load error:', err);
        const infoText = document.getElementById('infoText');
        if (infoText) {
          infoText.textContent = '🔴 Location not available. Admin may be offline.';
        }
      }
    };

    initMap();
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div id="map" className="w-full h-full z-0 rounded-none" />
      <div
        id="infoText"
        className="absolute top-4 right-4 px-4 py-2 bg-black text-white text-sm rounded-lg shadow-md z-50"
      >
        Loading bus location...
      </div>
    </div>
  );
}

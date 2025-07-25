'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LiveMap = () => {
  useEffect(() => {
    let map: L.Map;
    let marker: L.Marker;
    let infoText: HTMLElement;

    const initMap = async () => {
      map = L.map('map').setView([20.5937, 78.9629], 5); // Center of India

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      infoText = document.getElementById('status-text')!;

      const fetchLocation = async () => {
        try {
          const res = await fetch('/api/adminGPS/admin-location');
          if (!res.ok) throw new Error('Failed to fetch admin location');

          const data = await res.json();

          if (!data.latitude || !data.longitude || !data.timestamp) {
            throw new Error('Incomplete location data');
          }

          const coords: [number, number] = [data.latitude, data.longitude];
          const updatedAt = new Date(data.timestamp);
          const now = new Date();
          const diff = Math.floor((now.getTime() - updatedAt.getTime()) / 60000); // in minutes

          const info =
            diff < 2
              ? '🟢 Live location active'
              : `🟡 Last seen ${diff} minute(s) ago`;

          infoText.textContent = info;
          infoText.style.color = diff < 2 ? 'green' : 'orange';

          if (!marker) {
            const busIcon = L.icon({
              iconUrl: '/bus-icon.png', // Replace with your icon path
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            });

            marker = L.marker(coords, { icon: busIcon }).addTo(map);
          } else {
            marker.setLatLng(coords);
          }

          map.setView(coords, 15); // Zoom to location
        } catch (err) {
          console.error('❌ Error:', err);
          infoText.textContent = '🔴 Unable to fetch bus location';
          infoText.style.color = 'red';
        }
      };

      fetchLocation(); // initial call
      const interval = setInterval(fetchLocation, 10000); // repeat every 10 sec

      return () => clearInterval(interval); // cleanup
    };

    initMap();

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div id="map" className="w-full h-[90vh]" />
      <div
        id="status-text"
        className="absolute top-4 right-4 bg-white text-sm rounded px-3 py-1 shadow-md z-[1000]"
      >
        Loading location...
      </div>
    </div>
  );
};

export default LiveMap;

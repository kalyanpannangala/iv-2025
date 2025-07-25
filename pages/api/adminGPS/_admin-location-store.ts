// /pages/api/adminGPS/_admin-location-store.ts

export type AdminLocation = {
  latitude: number;
  longitude: number;
  lastUpdated: string;
} | null;

export let latestLocation: AdminLocation = null;

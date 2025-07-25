// In-memory store (No DB required)
export const latestLocation: {
  latitude?: number;
  longitude?: number;
  lastUpdated?: string;
} = {};

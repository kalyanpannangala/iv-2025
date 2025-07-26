// pages/api/adminGPS/admin-location.ts

import type { NextApiRequest, NextApiResponse } from "next";

type LocationData = {
  latitude: number;
  longitude: number;
  lastUpdated: string;
};

// global store (in-memory)
let latestLocation: LocationData | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    latestLocation = {
      latitude,
      longitude,
      lastUpdated: new Date().toISOString(),
    };

    return res.status(200).json({ message: "Location saved successfully" });
  }

  if (req.method === "GET") {
    if (!latestLocation) {
      // Return fallback coordinates with clear indication
      const fallbackLocation = {
        latitude: 13.628724891518354, // Tirupati starting point
        longitude: 79.42627315507207,
        lastUpdated: null,
        message: "Using starting point - GPS not yet active",
        isFallback: true,
      };

      return res.status(200).json(fallbackLocation);
    }

    return res.status(200).json({
      ...latestLocation,
      isFallback: false,
    });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

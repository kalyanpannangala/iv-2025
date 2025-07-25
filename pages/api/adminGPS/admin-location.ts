// pages/api/adminGPS/admin-location.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type LocationData = {
  latitude: number;
  longitude: number;
  lastUpdated: string;
};

// global store (in-memory)
let latestLocation: LocationData | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Invalid coordinates' });
    }

    latestLocation = {
      latitude,
      longitude,
      lastUpdated: new Date().toISOString(),
    };

    return res.status(200).json({ message: 'Location saved successfully' });
  }

  if (req.method === 'GET') {
    if (!latestLocation) {
      return res.status(404).json({ message: 'No location available' });
    }

    return res.status(200).json(latestLocation);
  }

  return res.status(405).json({ message: 'Method not allowed' });

  
}

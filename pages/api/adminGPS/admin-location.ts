// pages/api/adminGPS/admin-location.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for the stored location
type LocationType = {
  latitude: number;
  longitude: number;
  timestamp: string;
} | null;

// Global in-memory variable with explicit type
let latestLocation: LocationType = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { latitude, longitude, timestamp } = req.body;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      typeof timestamp !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    latestLocation = { latitude, longitude, timestamp };
    console.log('✅ Location updated:', latestLocation);

    return res.status(200).json({ message: 'Location saved' });
  }

  if (req.method === 'GET') {
    if (!latestLocation) {
      return res.status(404).json({ message: 'No location available' });
    }

    return res.status(200).json(latestLocation);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

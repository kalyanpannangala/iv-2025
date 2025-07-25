// /pages/api/update-location.ts (Called by mobile app)
import { NextApiRequest, NextApiResponse } from 'next';
import { latestLocation } from './_admin-location-store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }

  latestLocation.latitude = latitude;
  latestLocation.longitude = longitude;
  latestLocation.lastUpdated = new Date().toISOString();

  res.status(200).json({ message: 'Location updated' });
}

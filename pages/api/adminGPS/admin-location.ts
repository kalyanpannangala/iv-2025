// /pages/api/admin-location.ts (Public fetch API)
import { NextApiRequest, NextApiResponse } from 'next';
import { latestLocation } from './_admin-location-store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (latestLocation) {
    res.status(200).json(latestLocation);
  } else {
    res.status(404).json({ error: 'No location found' });
  }
}

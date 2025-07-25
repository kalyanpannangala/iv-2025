// pages/api/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ORS_API_KEY = process.env.ORS_API_KEY;

const locations: [number, number][] = [
    [13.628724891518354, 79.42627315507207], // Tirupati
    [13.426047734267023, 79.57409187168503], // Puttur
    [13.191343261388846, 79.60584928669522], // Tirutani
    [12.932333404592177, 79.13798038392822], // Vellore
    [11.30898997695959, 76.93663244238549],  // Mettupalayam
    [11.390165614026865, 76.71924769776794], // Ooty
    [11.045282553980117, 76.94735380477154], // Coimbatore
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!ORS_API_KEY) {
    return res.status(500).json({ error: "ORS_API_KEY not set in environment" });
  }

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: locations.map(([lat, lng]) => [lng, lat]), // ORS wants [lng, lat]
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const geojson = response.data;
    const coords = geojson.features[0].geometry.coordinates;
    const route: [number, number][] = coords.map(([lng, lat]: [number, number]) => [lat, lng]);

    res.status(200).json({ route });
  } catch (error: any) {
    console.error("ORS API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Route generation failed" });
  }
}

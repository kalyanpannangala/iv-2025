export async function getSnappedRoute(
    coords: [number, number][],
    apiKey: string
  ): Promise<[number, number][]> {
    const apiCoords = coords.map(([lat, lng]) => [lng, lat]);
    const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinates: apiCoords }),
    });
  
    const data = await response.json();
    return data.features[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
  }
  
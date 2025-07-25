// app/api/admin-location/route.ts

let latestLocation = {
    latitude: 0,
    longitude: 0,
    lastUpdated: new Date().toISOString(),
  };
  
  export async function GET() {
    return Response.json(latestLocation);
  }
  
  export async function POST(req: Request) {
    try {
      const data = await req.json();
  
      if (!data.latitude || !data.longitude) {
        return new Response('Invalid data', { status: 400 });
      }
  
      latestLocation = {
        latitude: data.latitude,
        longitude: data.longitude,
        lastUpdated: new Date().toISOString(),
      };
  
      return new Response('Location updated', { status: 200 });
    } catch (err) {
      return new Response('Server error', { status: 500 });
    }
  }
  
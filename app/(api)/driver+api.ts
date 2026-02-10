import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId, vehicleModel, licensePlate } = await request.json();

    if (!name || !email || !clerkId || !vehicleModel || !licensePlate) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if a driver with the same email or clerkId already exists
    const existingDriver = await sql`SELECT id FROM drivers WHERE email = ${email} OR clerk_id = ${clerkId}`;
    if (existingDriver.length > 0) {
      return Response.json(
        { error: "Driver with this email or clerkId already exists" },
        { status: 409 },
      );
    }

    const response = await sql`
      INSERT INTO drivers (
        name, 
        email, 
        clerk_id,
        vehicle_model,
        license_plate,
        status
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId},
        ${vehicleModel},
        ${licensePlate},
        'pending'
     );`;

    return new Response(JSON.stringify({ data: response }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating driver:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

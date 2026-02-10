import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            rides.ride_id,
            rides.origin_address,
            rides.destination_address,
            rides.origin_latitude,
            rides.origin_longitude,
            rides.destination_latitude,
            rides.destination_longitude,
            rides.ride_time,
            rides.fare_price,
            rides.payment_status,
            rides.created_at,
            'driver', json_build_object(
                'driver_id', drivers.id,
                'first_name', drivers.first_name,
                'last_name', drivers.last_name,
                'profile_image_url', drivers.profile_image_url,
                'car_image_url', drivers.car_image_url,
                'car_seats', drivers.car_seats,
                'rating', drivers.rating
            ) AS driver 
        FROM 
            rides
        INNER JOIN
            drivers ON rides.driver_id = drivers.id
        WHERE 
            rides.user_id = ${id}
        ORDER BY 
            rides.created_at DESC;
    `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching recent rides:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { id }: { id: string }) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { status, driver_id } = await request.json();

    if (!id) {
      return Response.json({ error: "Missing ride ID" }, { status: 400 });
    }

    if (!status && !driver_id) {
      return Response.json(
        { error: "Missing status or driver_id to update" },
        { status: 400 },
      );
    }

    let updateQuery = "UPDATE rides SET";
    const updateValues = [];
    let paramIndex = 1;

    if (status) {
      updateQuery += ` status = $${paramIndex++}`;
      updateValues.push(status);
    }

    if (driver_id) {
      if (status) updateQuery += ",";
      updateQuery += ` driver_id = $${paramIndex++}`;
      updateValues.push(driver_id);
    }

    updateQuery += ` WHERE ride_id = $${paramIndex++} RETURNING *`;
    updateValues.push(id);

    const response = await sql(updateQuery, ...updateValues);

    if (response.length === 0) {
      return Response.json({ error: "Ride not found" }, { status: 404 });
    }

    return Response.json({ data: response[0] });
  } catch (error) {
    console.error("Error updating ride:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET_SINGLE_RIDE(
  request: Request,
  { id }: { id: string },
) {
  if (!id) {
    return Response.json({ error: "Missing ride ID" }, { status: 400 });
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
        SELECT
            rides.ride_id,
            rides.origin_address,
            rides.destination_address,
            rides.origin_latitude,
            rides.origin_longitude,
            rides.destination_latitude,
            rides.destination_longitude,
            rides.ride_time,
            rides.fare_price,
            rides.payment_status,
            rides.created_at,
            'driver', json_build_object(
                'driver_id', drivers.id,
                'first_name', drivers.first_name,
                'last_name', drivers.last_name,
                'profile_image_url', drivers.profile_image_url,
                'car_image_url', drivers.car_image_url,
                'car_seats', drivers.car_seats,
                'rating', drivers.rating
            ) AS driver 
        FROM 
            rides
        INNER JOIN
            drivers ON rides.driver_id = drivers.id
        WHERE 
            rides.ride_id = ${id};
    `;

    if (response.length === 0) {
      return Response.json({ error: "Ride not found" }, { status: 404 });
    }

    return Response.json({ data: response[0] });
  } catch (error) {
    console.error("Error fetching single ride:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

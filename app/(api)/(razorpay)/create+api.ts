import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency } = body;

    if (!amount || !currency) {
      return new Response(JSON.stringify({ error: "Missing required fields: amount, currency" }), {
        status: 400,
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt: "receipt_order_" + Date.now(),
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

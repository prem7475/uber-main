import Razorpay from "razorpay";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ error: "Missing required Razorpay fields" }),
        { status: 400 },
      );
    }

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest === razorpay_signature) {
      return new Response(JSON.stringify({ success: true, message: "Payment verified successfully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid signature" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

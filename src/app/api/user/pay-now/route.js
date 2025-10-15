import { connectDb } from "@/config/dbConfig";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { appointmentId } = await request.json();
    await connectDb();

    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return NextResponse.json({
        success: false,
        msg: "Appointment Cancelled or Not Found",
      });
    }

    const origin = request.headers.get("origin"); 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Appointment with ${appointmentData.docData.name}` },
            unit_amount: appointmentData.amount * 100,
          },
          quantity: 1,
        },
      ],
    success_url: `${origin}/payment-success?appointmentId=${appointmentId}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/my-appointments?status=cancelled`,
      metadata: {
        appointmentId: appointmentId,
      },
    });

    return NextResponse.json({ success: true, id: session.id });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: error?.message || "Something went wrong",
    });
  }
}

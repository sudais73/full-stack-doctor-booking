
import { connectDb } from "@/config/dbConfig";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    await connectDb();
    const { sessionId } = await request.json();

    // 1. Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return NextResponse.json({ success: false, msg: "Payment not completed" });
    }

    // 2. Get appointmentId from success_url metadata 
    const appointmentId = session.metadata.appointmentId;

    if (!appointmentId) {
      return NextResponse.json({ success: false, msg: "No appointment found" });
    }

    // 3. Update appointment in DB
    await Appointment.findByIdAndUpdate(appointmentId, { payment: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error.message });
  }
}


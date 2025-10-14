import { connectDb } from "@/config/dbConfig";
import getAdminFromToken from "@/lib/getAdminFromToken";
import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const adminEmail = getAdminFromToken(request); 

    if (!adminEmail || adminEmail !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ success: false, msg: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const doctors = await Doctor.find({});
    const users = await User.find({});
    const appointment = await Appointment.find({});

    const dashData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointment.length,
      latestAppointment: appointment.reverse().slice(0, 6),
    };

    return NextResponse.json({ success: true, dashData });
  } catch (error) {
    return NextResponse.json({ success: false, msg: error.message });
  }
}

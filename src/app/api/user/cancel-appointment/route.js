import { connectDb } from "@/config/dbConfig"
import getDataFromToken from "@/lib/getUserFromToken"
import Appointment from "@/models/appointment"
import Doctor from "@/models/doctor"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    await connectDb()

    const { appointmentId } = await request.json()
    if (!appointmentId) {
      return NextResponse.json({ success: false, msg: "Appointment ID is required" })
    }

    const userId = getDataFromToken(request)
    if (!userId) {
      return NextResponse.json({ success: false, msg: "Invalid or missing token" })
    }

  // query to find, validate, and update the appointment.
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, userId: userId, cancelled: false },
      { cancelled: true },
      { new: true }
    )

    if (!updatedAppointment) {
      return NextResponse.json({
        success: false,
        msg: "Appointment not found or already cancelled."
      })
    }

 // remove the slot from the doctor's record.//
    const { docId, slotDate, slotTime } = updatedAppointment
    await Doctor.findByIdAndUpdate(docId, {
      $pull: { [`slots_booked.${slotDate}`]: slotTime }
    })

    return NextResponse.json({
      success: true,
      msg: "Appointment cancelled successfully.",
      data: { appointmentId }
    })
  } catch (error) {
    console.error("Cancel Appointment Error:", error)
    return NextResponse.json({
      success: false,
      msg: "Something went wrong. Please try again later."
    })
  }
}
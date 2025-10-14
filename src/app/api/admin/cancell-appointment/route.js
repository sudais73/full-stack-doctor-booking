import { connectDb } from "@/config/dbConfig"
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

    const appointmentData = await Appointment.findById(appointmentId)
    if (!appointmentData) {
      return NextResponse.json({ success: false, msg: "Appointment not found" })
    }


    // cancel appointment
    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })

    // release doctor slot
    const { docId, slotDte, slotTime } = appointmentData
    const docData = await Doctor.findById(docId)
    if (docData?.slots_booked?.[slotDte]) {
      docData.slots_booked[slotDte] = docData.slots_booked[slotDte].filter(e => e !== slotTime)
      await Doctor.findByIdAndUpdate(docId, {slots_booked})
    }

    return NextResponse.json({ 
      success: true, 
      msg: "Appointment cancelled successfully", 
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

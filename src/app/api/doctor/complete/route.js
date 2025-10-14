import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getDocFromToke";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {
        const docId = getDataFromToken(request)
        const { appointmentId } = await request.json()
        connectDb()
        const appointmentData = await Appointment.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return NextResponse.json({ success: true, msg: "Appointment Completed" })
        }
        else {
            return NextResponse.json({ success: false, msg: "Appointment not Completed" })
        }

    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message })

    }
}
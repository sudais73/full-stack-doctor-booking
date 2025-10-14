import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getDocFromToke";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const docId = getDataFromToken(request)
        await connectDb()
        const appointments = await Appointment.find({ docId })
        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointmens:appointments.reverse().slice(0,6)
        }
        return NextResponse.json({ success: true, dashData })

    } catch (error) {
        return NextResponse.json({ success: false, msg: error.message })
    }
}
import { connectDb } from "@/config/dbConfig"
import Appointment from "@/models/appointment"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        await connectDb()
        const appointments =await  Appointment.find({})
        return NextResponse.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, msg: error.message })

    }
}
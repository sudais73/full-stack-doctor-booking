import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getDocFromToke";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const docId = getDataFromToken(request)
        await connectDb();
        const appointments = await Appointment.find({docId})
        return NextResponse.json({success:true, appointments})
    } catch (error) {
        return NextResponse.json({success:false, msg:error.message})
    }
}
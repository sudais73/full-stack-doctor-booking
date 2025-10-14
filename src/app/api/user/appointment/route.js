import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getUserFromToken";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const userId =  getDataFromToken(request)
        connectDb()
        const appointments = await Appointment.find({userId})
        return NextResponse.json({success:true, appointments})
    } catch (error) {
        return NextResponse.json({success:false, msg:erro.message})
    }
}
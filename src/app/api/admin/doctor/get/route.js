import { connectDb } from "@/config/dbConfig";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDb();
        const doctors = await Doctor.find({})
        return NextResponse.json({success:true, doctors})
    } catch (error) {
        return NextResponse.json({success:false, msg:error.message})
        
    }
}
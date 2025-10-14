import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getDocFromToke";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const docId = getDataFromToken(request)
        await connectDb()
        const profileData = await Doctor.findById(docId)
        return NextResponse.json({success:true, profileData})
    } catch (error) {
        return NextResponse.json({success:false, msg:error.message})
        
    }
}
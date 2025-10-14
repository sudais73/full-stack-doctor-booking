import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getDocFromToke";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Parse the request body first
        const docId  = getDataFromToken(request)
        
        // Validate that docId is provided
        if (!docId) {
            return NextResponse.json(
                { success: false, msg: "Doctor ID is required" },
                { status: 400 }
            );
        }

        await connectDb();

        // Find the doctor first to get current availability
        const doctor = await Doctor.findById(docId);
        
        // Check if doctor exists
        if (!doctor) {
            return NextResponse.json(
                { success: false, msg: "Doctor not found" },
                { status: 404 }
            );
        }

        // Toggle availability and save
        await Doctor.findByIdAndUpdate(
            docId, 
            { available: !doctor.available },
            { new: true } 
        );
        
        return NextResponse.json({
            success: true, 
            msg: "Availability updated",
            available: !doctor.available 
        });
        
    } catch (error) {
        console.error("Error updating doctor availability:", error);
        return NextResponse.json(
            { success: false, msg: error.message },
            { status: 500 }
        );
    }
}
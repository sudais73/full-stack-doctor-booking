import { connectDb } from "@/config/dbConfig";
import getDataFromToken from "@/lib/getUserFromToken";
import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const userId = getDataFromToken(request)
        const {docId,slotDate, slotTime} = await request.json()
        await connectDb();
        const docData = await Doctor.findById(docId).select('-password')
        if(!docData.available){
            return NextResponse.json({success:false, msg:'Doctor is Not available'})
        }

        let slots_booked = docData.slots_booked
        // checking for slot availability//
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                  return NextResponse.json({success:false, msg:'Slot is Not available'})
            }else{
            slots_booked[slotDate].push(slotTime)
        }
        }else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')

            delete docData.slots_booked;

            const appointmentData = {
                userId,
                docId,
                slotDate,
                slotTime,
                userData,
                docData,
                amount:docData.fees,
                date:Date.now()
            }

            const newAppointment = new Appointment(appointmentData)
            await newAppointment.save();

            // save new slots data to db//
            await Doctor.findByIdAndUpdate(docId, {slots_booked})
                return NextResponse.json({success:true, msg:"Appointment booked"})

    } catch (error) {
         return NextResponse.json({success:false, msg:error.message})
        
    }
    
}
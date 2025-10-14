'use client'
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

export default function Appointments() {
  const { appointments, getAppointments,calculateBirthDate,cancellAppointment } = useContext(AppContext)
useEffect(()=>{
getAppointments()
},[])


  return (
    <div className="w-full max-sm:m-1 m-5 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4"> All Appointments</h1>
      <div className="bg-white border rounded-lg text-sm h-[60vh] max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_2fr] grid-flow-col items-center py-3 px-6 border-b " >
         <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>action</p>
        </div>
        {appointments.map((item, index)=>(
          <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_3fr_1fr_2fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
            <p className="max-sm:hidden"
            >{index+1}</p>
            <div className="flex items-center gap-2">
              <Image width={25} height={30} className="rounded-full" alt="patient img" src={item.userData.image}/>
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateBirthDate(item.userData.birthDate)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <div className="flex items-center gap-2">
              <Image width={25} height={30} className="rounded-full bg-gray-300" alt="patient img" src={item.docData.image}/>
              <p>{item.docData.name}</p>
            </div>
            <p>${item.amount}</p>
            
             
            {/* Action buttons */}
            {!item.cancelled && (
              <button
                onClick={() => cancellAppointment(item._id)}
                className="flex gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition"
              >
                ❌ Cancel
              </button>
            )}
            {item.cancelled && (
              <button className="px-2 py-1 bg-gray-400 text-white text-xs rounded-lg cursor-not-allowed">
                Cancelled
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

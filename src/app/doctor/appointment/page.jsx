'use client'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const page = () => {
  const[appointments, setAppointments] = useState([])
  const{cancellAppointment,calculateBirthDate, completeAppoinment} = useContext(AppContext)
  const getAppointments = async ()=>{
    try {
      const{data} = await axios.get('/api/doctor/appointment')
      if(data.success){
        setAppointments(data.appointments)
        
        
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{

  getAppointments()

  },[])
    return (
      <div className="w-full m-5 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4"> All Appointments</h1>
        <div className="bg-white border rounded-lg text-sm h-[60vh] max-h-[80vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_3fr_1fr] grid-flow-col items-center py-3 px-6 border-b " >
           <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>action</p>
             <p>Payment</p>
          </div>
          {appointments.map((item, index)=>(
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_3fr_1fr_3fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
              <p className="max-sm-hidden"
              >{index+1}</p>
              <div className="flex items-center gap-2">
                <Image  width={25} height={30} className="rounded-full" alt="patient img" src={item.userData.image}/>
                <p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateBirthDate(item.userData.birthDate)}</p>
              <p>{item.slotDate}, {item.slotTime}</p>
      
              <p>${item.amount}</p>
              
              <p className='flex gap-1'>

                {item.isCompleted && <span>✅ Completed</span>}
               {!item.cancelled && !item.isCompleted && <button onClick={() => cancellAppointment(item._id)} className="flex gap-1 px-4 items-center w-10 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition">
                  ❌
                </button>}
                {item.cancelled && <button className='px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition'>
                  Cancelled
                </button>}
              { !item.isCompleted && !item.cancelled && <button onClick={()=>completeAppoinment(item._id)}
                className="flex gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white
                 text-sm rounded-lg transition">✅</button>}
                    </p>
                   {!item.cancelled && item.isCompleted &&<p>
                    {item.payment ? <span className='text-green-500 font-semibold'>Online</span>:<span>Cash</span>}</p>
}
            </div>
          ))}
        </div>
  
      </div>
    );
}

export default page

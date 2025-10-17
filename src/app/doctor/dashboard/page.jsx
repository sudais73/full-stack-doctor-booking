'use client'
import { assets } from '@/app/assets_admin/assets'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

const page = () => {

  const {docDashData, getDocDashData,cancellAppointment, completeAppoinment} = useContext(AppContext)
  useEffect(() => {
   
      getDocDashData()
    
   
  }, [])

  
  return (
    <div className="m-2 md:m-5">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-500 cursor-pointer hover:scale-105 transitin-all duration-300">
              <Image alt='' width={35} src={assets.earning_icon}/>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-xl font-semibold">$ {docDashData.earnings}</p>
                <p className="text-gray-400 text-sm">Earnings</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-500 cursor-pointer hover:scale-105 transitin-all duration-300">
              <Image alt='' width={35} src={assets.appointments_icon}/>
              <div className="flex flex-col gap-2 items-center">
                <p>{docDashData.appointments}</p>
                <p className="text-gray-400 text-sm">Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-lg border-2 border-gray-500 cursor-pointer hover:scale-105 transitin-all duration-300">
              <Image alt='' width={35} src={assets.patients_icon}/>
              <div className="flex flex-col gap-2 items-center">
                <p>{docDashData.patients}</p>
                <p className="text-gray-400 text-sm">Patients</p>
              </div>
            </div>
          </div>
    
          <div className="bg-white mt-4">
            <div className="flex gap-2 items-center p-2">
              <Image alt='' src={assets.list_icon}/>
              <p className="text-xl font-semibold m-2">Latest Appointments</p>
    
            </div>
            <div className="pt-4 border-t-2"
            >
              {docDashData.latestAppointmens.map((item, index)=>(
        
                <div key={index} className="flex flex-wrap justify-between px-6 py-3 hover:bg-gray-100">
                  <div className="flex flex-col md:flex-row gap-3 max-sm:items-center">
                  <Image alt='' className="max-sm:w-50 rounded-lg bg-gray-500"  width={50} height={30} src={item.userData.image}/>
                 <div className="max-sm:items-center">
                 <p className="text-xl font-medium">{item.userData.name}</p>
                    <p>Booking on {item.slotDate}</p>
                </div>
                  </div>
                  <p className='flex gap-1'>

                {item.isCompleted && <span>✅ Completed</span>}
               {!item.cancelled && !item.isCompleted && <button onClick={() => cancellAppointment(item._id)}>
                  ❌
                </button>}
                {item.cancelled && <button className='px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm'>
                  Cancelled
                </button>}
              { !item.isCompleted && !item.cancelled && <button onClick={()=>completeAppoinment(item._id)}
                >✅</button>}
                    </p>
                </div>
                  
              ))}
            </div>
          </div>
          
          
        </div>
  )
}

export default page

"use client";

import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const page = () => {
  const{doctors, changeAvailablity} = useContext(AppContext)

  return (
    <div className='w-full my-6 border border-gray-400 p-6 rounded-lg max-h-[90vh] overflow-y-scroll'>
    <h1 className='text-2xl font-bold mb-4'
    >All Doctors</h1>
    <div className='flex flex-wrap gap-4 ' >
      {doctors.map((item,index)=>(
        <div key={index} className='flex flex-col gap-2 max-w-56 rounded-lg p-5 shadow-md transition-all duration-300 hover:border-4 hover:border-white hover:shadow-2xl'>
          <Image alt='' width={200} height={250} src={item.image} className='w-50 bg-[#C9D8FF] rounded-lg transition-all duration-300 hover:scale-110 hover:brightness-110 hover:shadow-xl cursor-pointer'/>
          <div>
            <p className='text-xl font-semibold'
            >{item.name}</p>
            <p>{item.speciality}</p>
            <div className='flex gap-2 items-center'>
              <input onChange={()=>changeAvailablity(item._id)} type="checkbox" checked={item.available} />
             <p className='text-green-500 text-md'>Available</p>
            </div>


          </div>



        </div>
      ))
      }
    </div>
    </div>
  )
}

export default page

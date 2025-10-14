"use client"
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const TopDoctors = () => {
    const router  = useRouter()
    const{doctors} = useContext(AppContext)
    
  return (
    <div className='mt-5'>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <h1 className='font-bold text-2xl md:text-4xl lg:text-5xl'>Top Doctors to Book</h1>
        <p className='text-md'>Simply browse through our extensive list of trusted doctors.</p>

      </div>

       <div className='flex flex-wrap gap-3 items-center justify-center my-8 '>
            {
                doctors.map((doctor,index)=>(
                    <div key={index} onClick={()=>router.push(`/appointment/${doctor._id}`)} className='flex flex-col gap-2 rounded-lg p-5 shadow-md transition-all duration-300 hover:border-4 hover:border-white hover:shadow-2xl'>
                        <Image alt='' src={doctor.image} width={200} height={250} className='w-70 md:w-50 bg-[#C9D8FF] rounded-lg transition-all duration-300 hover:scale-110 hover:brightness-110 hover:shadow-xl cursor-pointer'/>
                        <p className={`${doctor.available? 'text-green-500 text-md':'text-gray-500'}`}>
                          {doctor.available?"Available":"Not Available"}
                          </p>
                        <h1 className='text-xl font-semi-bold'>{doctor.name}</h1>
                        <p>{doctor.speciality}</p>
            
                    </div>
                )).slice(0,8)
            }
        </div>

        <button onClick={()=>router.push('/all-doctors')} className='text-xl mx-auto flex justify-center bg-green-500 py-2 px-4 rounded-lg cursor-pointer mb-5'>Show More</button>
    </div>
  )
}

export default TopDoctors

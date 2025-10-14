'use client'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const RelatedDoc = ({ speciality }) => {
  const { doctors, router } = useContext(AppContext)
  const [relatedDocs, setRelatedDocs] = useState([])

  useEffect(() => {
    if (!doctors) return;

    const related = doctors.filter(doc => doc.speciality === speciality)
    setRelatedDocs(related)
    console.log("Related doctors:", related)
  }, [doctors, speciality])

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">Related Doctors</h2>
       <div  className='flex flex-wrap gap-3 items-center justify-center my-8 '>
      {
                      relatedDocs.map((doctor,index)=>(
                          <div key={index} onClick={()=>router.push(`/appointment/${doctor._id}`)} className='flex flex-col gap-2 rounded-lg p-5 shadow-md transition-all duration-300 hover:border-4 hover:border-white hover:shadow-2xl'>
                              <Image alt='' width={200} height={250} src={doctor.image} className='w-50 bg-[#C9D8FF] rounded-lg transition-all duration-300 hover:scale-110 hover:brightness-110 hover:shadow-xl cursor-pointer'/>
                             <p className={`${doctor.available? 'text-green-500 text-md':'text-gray-500'}`}>
                          {doctor.available?"Available":"Not Available"}
                          </p>
                              <h1 className='text-xl font-semi-bold'>{doctor.name}</h1>
                              <p>{doctor.speciality}</p>
                  
                          </div>
                      ))
                  }
            </div>
    </div>
  )
}

export default RelatedDoc

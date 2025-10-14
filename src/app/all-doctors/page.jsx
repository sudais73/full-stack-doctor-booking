'use client'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const page = () => {
  // const{speciality} = useParams()
  const[speciality, setSeciality] = useState('') 
  const[filterDoc, setFilterDoc] = useState([])
  const{doctors, router} = useContext(AppContext)

  

  const applyFiler  = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
  applyFiler()
  },[doctors, speciality])
  return (
    <div className=''>
      <p className='text-xl md:text-2xl font-semibold my-10'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex-row gap-6'>

      
      <div className='flex flex-col gap-2'>
<p onClick={()=>setSeciality('')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600  rounded-lg cursor-pointer'>All</p>

<p onClick={()=>setSeciality('General physician')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600  rounded-lg cursor-pointer'>General physician</p>
<p onClick={()=>setSeciality('Gynecologist')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600  rounded-lg cursor-pointer'>Gynecologist</p>
<p onClick={()=>setSeciality('Pediatricians')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600  rounded-lg cursor-pointer'>Pediatricians</p>
<p onClick={()=>setSeciality('Dermatologist')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600 rounded-lg cursor-pointer'>Dermatologist</p>
<p onClick={()=>setSeciality('Gastroenterologist')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600  rounded-lg cursor-pointer'>Gastroenterologist</p>
<p onClick={()=>setSeciality('Neurologist')} className='bg-gray-300 px-2 py-2 text-sm border border-gray-600 itmes-center rounded-lg cursor-pointer'>Neurologist</p>
      </div>
      <div  className='flex flex-wrap gap-3 items-center justify-center my-8 w-full border border-gray-400 p-6 rounded-lg'>
{
                filterDoc.map((doctor,index)=>(
                    <div key={index} onClick={()=>router.push(`/appointment/${doctor._id}`)} className='flex flex-col gap-2 rounded-lg p-5 shadow-md transition-all duration-300 hover:border-4 hover:border-white hover:shadow-2xl'>
                        <Image alt={doctor.name} width={200} height={250} src={doctor.image} className='w-70 md:w-50 bg-[#C9D8FF] rounded-lg transition-all duration-300 hover:scale-110 hover:brightness-110 hover:shadow-xl cursor-pointer'/>
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
    </div>
  )
}

export default page

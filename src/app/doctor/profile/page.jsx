'use client'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

const page = () => {
  const{getProfileData, profileData, changeAvailablityFromDocDash} = useContext(AppContext)
  useEffect(()=>{
getProfileData()


  },[])
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div>
          <Image className='bg-blue-400 rounded-lg max-sm:items-center justify-center' alt='' width={200} height={60} src={profileData?.image}/>
        </div>
        <div className='flex-1 border border-gray-500 rounded-lg bg-white p-8'>
          {/* docinfo like name, degree, experience */}
          <p className='flex items-center gap-2 max-md:text-3xl font-medium font-gray-700'>{profileData?.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData?.degree} - {profileData?.speciality}</p>
            <p className='py-0.5 px-2 border text-xs rounded-full my-3'>{profileData?.experience}</p>
          </div>

          {/* doc about */}
          <div className='felx flex-col gap-2'>
            <p className='text-xl font-semibold'>About:</p>
            <p className='text-xs max-w-[700px]'>{profileData?.about}</p>
          </div>
          <p>Appointment fees: <span>$ {profileData?.fees}</span></p>
        
          <div className='flex gap-2 items-center'>
            <input onChange={changeAvailablityFromDocDash} type="checkbox" checked={profileData?.available} />
            <p >{profileData.available? 'Available':"Not Available"}</p>

          </div>
        </div>

       
      </div>
    </div>
  )
}

export default page

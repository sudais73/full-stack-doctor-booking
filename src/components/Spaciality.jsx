"use client"
import { specialityData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Spaciality = () => {
  return (
    <div className='flex flex-col gap-5 items-center justify-center my-8'>
    <div className='flex flex-col gap-5 items-ceter justify-center mb-4 '>
      <h1 className='text-2xl md:text-3xl lg:text-5xl text-center font-semibold'>Find by Specaility</h1>
      <p className='text-center text-sm '>Simply browse through our extensive list of trusted doctors, <br />schedule your appointment hassle-free.</p>
    </div>
<div className="
  flex gap-6 px-2 py-4 w-full scrollbar-hide
  overflow-x-auto lg:overflow-x-hidden
  justify-start lg:justify-center
">
  {specialityData.map((item, i) => (
    <Link
      href={``}
      onClick={() => scrollTo(0, 0)}
      key={i}
      className="flex flex-col gap-2 items-center flex-shrink-0 min-w-[5rem]"
    >
      <Image
        src={item.image}
        alt={item.speciality}
        className="w-20 h-20 object-contain hover:translate-y-1 cursor-pointer transition-transform duration-300"
      />
      <p className="text-sm font-medium text-gray-700">{item.speciality}</p>
    </Link>
  ))}
</div>




    </div>
  )
}

export default Spaciality

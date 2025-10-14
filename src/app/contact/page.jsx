import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col  gap-6 my-8'>
      <h1 className='text-2xl font-bold text-center'>CONTACT US</h1>
    <div className='flex flex-col md:flex-row gap-8 '>
      <div>
        <Image src={assets.contact_image} alt='contact-img' className='max-w-[100%] w-100 rounded-lg'/>
      </div>
      <div className='flex flex-col gap-3 my-4'>
        <h1 className='text-xl font-semibold'>Our OFFICE</h1>
        <p>Infront of new bus Station </p>
        <p>Shashe, Ethiopia</p>
        <p>Tel: +251996518048</p>
        <p>Email: sudaisdev@email.com</p>
        <h1 className='text-xl font-semibold'>Careers at Our Company</h1>
        <p>Learn more about our teams and job openings.</p>
        <p className='border border-gray-400 px-5 py-2 w-40 rounded-lg'>Explore Jobs</p>
      </div>
    </div>
    </div>
  )
}

export default page

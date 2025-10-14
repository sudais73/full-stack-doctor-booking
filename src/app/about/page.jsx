import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-8 items-center mb-10 '>
      <h1 className='text-2xl font-bold text-center mt-4'>About Us</h1>
      <div className='flex flex-col md:flex-row gap-8 my-4'>
        <div>
          <Image src={assets.about_image} alt='about-img' className='rounded-lg' />
        </div>
        <div className='flex flex-col gap-3 ites-center w-full'>
          <p >Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <h1 className='text-xl font-semibold'>Our Vision</h1>
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div >
        <h1 className='mb-6 text-2xl font-semibold'>Why Choose Us</h1>
        <div className='flex flex-col md:flex-row '>
          <div className='border border-gray-500 p-10'>
            <h1 className='text-2xl font-bold '>Efficiency:</h1>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>

          </div>
          <div className='border border-gray-500 p-10'>
            <h1 className='text-2xl font-bold '>Convenience:</h1>
            <p>Access to a network of trusted healthcare professionals in your area.</p>

          </div>
          <div className='border border-gray-500 p-10'>
            <h1 className='text-2xl font-bold '>Personalization:</h1>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>

          </div>
        </div>

      </div>
    </div>
  )
}

export default page

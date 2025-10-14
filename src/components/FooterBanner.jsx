import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const FooterBanner = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row items-center justify-between px-4 pb-3 md:px-10 bg-blue-600 rounded-lg my-10'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-xl md:text-3xl lg:text-5xl font-medium text-white'>Book Appointment <br />
                    With 100+ Trusted Doctors</h1>
                <button className='text-white bg-blue-500 py-2 px-6 rounded-lg w-50 cursor-pointer'>Create account</button>
            </div>
            <div>
                <Image alt='' src={assets.appointment_img} width={200} />
            </div>
        </div>
    )
}

export default FooterBanner

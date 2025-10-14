import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row gap-10 bg-blue-600 rounded-lg pt-10 md:pt-20 px-10 items-center pb-1 mt-10 '>
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white'>Book Appointment Wth Trusted Doctors</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col md:flex-row gap-2 text-white '>
                        <Image alt='' src={assets.group_profiles} />
                    <p>Simply browse through our extensive list of truseted doctors schedule your appointment hassle-free</p>
                    </div>
                    

                    <button 
                    className=' flex items-center gap-1 bg-white py-2 px-4 w-50 rounded-lg cursor-pointer hover:bg-green-600 hover:text-white'>Book Appointment <Image alt ='' src={assets.arrow_icon}/> 
                    </button>
                </div>
            </div>
            <div>
                <Image alt='' src={assets.header_img} />
            </div>
        </div>
    )
}

export default Header

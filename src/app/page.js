import FooterBanner from '@/components/FooterBanner'
import Header from '@/components/Header'
import Spaciality from '@/components/Spaciality'
import TopDoctors from '@/components/TopDoctors'
import React from 'react'

const page = () => {
  return (
    <div>
    <Header/>
    <Spaciality/>
    <TopDoctors/>
    <FooterBanner/>
   
    </div>
  )
}

export default page

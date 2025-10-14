'use client'
import RelatedDoc from '@/components/RelatedDoc';
import SlotsBooking from '@/components/Slot';
import { AppContext } from '@/context/AppContext'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'

const DoctorPage = ({ params }) => {
  const [doctor, setDoctor] = useState(null);
  const { doctors } = useContext(AppContext);
  const unwrappedParams = React.use(params);
  const { doctorId } = unwrappedParams;

  useEffect(() => {

    const foundDoctor = doctors.find((doc) => doc._id === doctorId);
    setDoctor(foundDoctor);

    console.log("Found Doctor:", foundDoctor);
  }, [params, doctors]);



  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div>
      <div className='flex flex-col md:flex-row  gap-4'>
        <div>
          <Image className='w-150 bg-blue-600 rounded-lg'
            src={doctor.image}
            alt={doctor.name || 'Doctor'}
            width={200}
            height={200}
          />
        </div>
        <div>


          <div className='flex flex-col gap-2 border border-gray-400 rounded-lg py-8 px-6'>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-medium'> {doctor.name}</h1>
            <h2 className='flex items-center text-md font-medium text-gray-500 gap-2'>Speciality: <span>{doctor.speciality}</span>  <p className='text-green-600'>{doctor.experience}</p></h2>

            <h2 className='text-xl font-semibold -mb-2'>About</h2>
            <p>{doctor.about}</p>
          </div>

         <SlotsBooking docId={doctor._id} doctor={doctor}/>

        </div>

      </div>
      <RelatedDoc speciality={doctor.speciality} />
    </div>
  )
}

export default DoctorPage;

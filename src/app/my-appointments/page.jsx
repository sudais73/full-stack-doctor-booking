'use client'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const Page = () => {
  const { user, getDoctors } = useContext(AppContext)
  const [doctor, setDoctor] = useState([])

  const handleCheckout = async (appointmentId) => {
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post('/api/user/pay-now', {appointmentId });

      if (data.success) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  };




  const appointments = async () => {
    try {
      const { data } = await axios.get('/api/user/appointment')
      if (data.success) {
        setDoctor(data.appointments.reverse())
        console.log(data.appointments);

      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const cancellAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post('/api/user/cancel-appointment', { appointmentId })
      if (data.success) {
        toast.success(data.msg)
        appointments()
        getDoctors()
      }
      else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (user) {
      appointments()
    }
  }, [user])

  return user && (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 My Appointments</h1>

      {/* Appointment List */}
      <div className="space-y-6">
        {doctor.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white shadow-md rounded-xl border border-gray-200"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <Image
                src={item.docData.image}
                alt={item.docData.name}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold">{item.docData.name}</p>
              <p className="text-sm text-gray-500">{item.docData.speciality}</p>
              <p className="text-sm font-medium mt-2">📍 Address:</p>
              <p className="text-sm">{item.docData.address.line1}</p>
              <p className="text-sm">{item.docData.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-medium">🗓 Date & Time:</span> {item.slotDate} || {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-0">
              {item.isCompleted && <p> ✅Completed</p>}
              {!item.cancelled && !item.isCompleted && !item.payment && <button onClick={() => handleCheckout(item._id)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition">
                💳 Pay Online

              </button>}
              {item.payment && !item.isCompleted &&<p>✅Paid</p>}
              {!item.cancelled && !item.isCompleted && !item.payment &&<button onClick={() => cancellAppointment(item._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition">
                ❌ Cancel
              </button>}
              {item.cancelled && <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition'>
                ❌ This Appontment is Cancelled
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page

'use client'

import { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AppContext } from '@/context/AppContext'

const SlotsBooking = ({ docId, doctor }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, router, getDoctors } = useContext(AppContext)


  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ]

  // 🔥 Fix: Ensure dates are always YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleBooking = async () => {
    if (!user) {
      toast.error('You have to login to book')
      return router.push('/login')
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time!')
      return
    }

    // Check if selected date is in the past
    const today = new Date()
    const selectedDateObj = new Date(selectedDate)

    today.setHours(0, 0, 0, 0)
    selectedDateObj.setHours(0, 0, 0, 0)

    if (selectedDateObj < today) {
      toast.error('Cannot book appointments for past dates!')
      return
    }

    try {
      setLoading(true)

      const formattedDate = formatDate(selectedDate)

      const { data } = await axios.post('/api/user/book', {
        docId,
        slotDate: formattedDate,
        slotTime: selectedTime,
      })

      if (data.success) {
        toast.success('✅ Appointment booked!')
        getDoctors()
        router.push('/my-appointments')
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">📅 Book an Appointment</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Time</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableTimes.map((time) => {
              const formattedDate = formatDate(selectedDate)
              const isBooked =
                doctor?.slots_booked?.[formattedDate]?.includes(time) 

              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded border transition 
                    ${isBooked
                      ? 'bg-gray-300 cursor-not-allowed'
                      : selectedTime === time
                        ? 'bg-blue-500 text-white'
                        : 'bg-white hover:bg-blue-100'}`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleBooking}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Confirm Appointment'}
      </button>
    </div>
  )
}

export default SlotsBooking

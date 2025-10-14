'use client'

import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
  const { user, userData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [form, setForm] = useState(user || {}) 
  const [image, setImage] = useState(null)


  useEffect(() => {
    if (isEdit && user) {
      setForm(user)
      setImage(null)
    }
  }, [isEdit, user])

  const updateUser = async () => {
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('phone', form.phone)
      formData.append('address', JSON.stringify(form.address))
      formData.append('gender', form.gender)
      formData.append('birthDate', form.birthDate)

      if (image) formData.append('image', image)

      const { data } = await axios.put('/api/user/update', formData, { withCredentials: true })

      if (data.success) {
        toast.success(data.msg)
        setIsEdit(false)
        await userData()
        
      } else {
        toast.error('Error updating user')
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message)
    }
  }

  if (!user) return null

  return (
    <div className="max-w-3xl p-6 bg-white shadow-lg rounded-2xl mt-10">
      {/* Profile Section */}
      <div className="flex flex-col gap-2">
        {isEdit ? (
          <label htmlFor="image">
            <div className="mb-5">
              <Image
                className="rounded-lg opacity-75"
                alt="Profile Preview"
                width={100}
                height={100}
                src={image ? URL.createObjectURL(image) : form.image}
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <Image
            src={user.image}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300"
          />
        )}

        <div>
          {isEdit ? (
            <input
              value={form.name || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              type="text"
              className="border p-2 rounded w-full"
            />
          ) : (
            <h1 className="text-2xl font-semibold">{user.name}</h1>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📞 Contact Information</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-medium">Phone:</span>
          </p>
          {isEdit ? (
            <input
              value={form.phone || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              type="text"
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{user.phone}</p>
          )}

          <p>
            <span className="font-medium">Address:</span>
          </p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                value={form.address?.line1 || ''}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                className="border p-2 rounded w-full"
              />
              <input
                value={form.address?.line2 || ''}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                className="border p-2 rounded w-full"
              />
            </div>
          ) : (
            <p>
              {user.address?.line1}, {user.address?.line2}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Basic Information</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Gender:</span>
          </p>
          {isEdit ? (
            <select
              value={form.gender || 'male'}
              onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
              className="border p-2 rounded w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p>{user.gender}</p>
          )}

          <p>
            <span className="font-medium">Birthday:</span>
          </p>
          {isEdit ? (
            <input
              value={form.birthDate ||''}
              onChange={(e) => setForm((prev) => ({ ...prev, birthDate: e.target.value }))}
              type="date"
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{user.birthDate}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        {isEdit ? (
          <>
            <button
              onClick={updateUser}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              ✅ Save Information
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            ✏️ Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default Page

'use client'
import { assets } from '@/app/assets_admin/assets'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const{aToken} = useContext(AppContext)
    const[docImg, setDocImg] = useState(false)
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[experience, setExpereince] = useState('1 Year')
    const[fees, setFees] = useState('')
    const[about, setAbout] = useState('')
    const[speciality, setSpeciality] = useState('General physician')
    const[degree, setDegree] = useState('')
    const[address1, setAddress1] = useState('')
    const[address2, setAddress2] = useState('')
    

    const onSubmitHandler = async (e)=>{
        e.preventDefault()

        try {
            if(!docImg){
                return toast.error("Image is not Uploaded")
            }
            const formData = new FormData();
             formData.append("image", docImg);
             formData.append("name", name);
             formData.append("email", email);
             formData.append("password", password);
             formData.append("experience", experience);
             formData.append("fees",Number(fees));
             formData.append("about", about);
             formData.append("speciality", speciality);
             formData.append("degree", degree);
             formData.append("address", JSON.stringify({line1:address1, line2:address2}));
          const{data} = await axios.post('/api/admin/doctor/add', formData)
          if(data.success){
            toast.success(data.msg)
           setName(''),
           setDocImg(''),
           setEmail(''),
           setPassword(''),
           setDegree(''),
           setAddress1(''),
           setAddress2(''),
           setFees('')
           
          }
          else{
            toast.error(data.msg)
          }
            

        } catch (error) {
            toast.error(error.message)
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 m-5 mt-20'>
     <h1 className='text-2xl font-semibold text-center md:text-start'>Add Doctor</h1>
     <div className='flex flex-col md:flex-row gap-3 items-center'>
        <label htmlFor="doc-img">
            <Image alt='' width={50} height={50} src={assets.upload_area}/>
        </label>
            <input  onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
            <p className='text-xl font-bold '>Upload doctor <br />Picture</p>

     </div>

     <div className='flex flex-col md:flex-row gap-6'>
    <div className='flex-1'>
    <div className='mb-4'>
        <p className='text-xl mb-2'>Doctor Name</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="text" placeholder='Name'/>
    </div>
    <div className='mb-4'>
        <p className='text-xl mb-2'>Doctor Email</p>
        <input  value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="email" placeholder='Email'/>
    </div>
   
    <div className='mb-4'>
        <p className='text-xl mb-2'>Doctor Password</p>
        <input  value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="password" placeholder='Password'/>
    </div>
    <div className='mb-4'>
        <p className='text-xl mb-2'>Doctor Experience</p>
        <input  value={experience} onChange={(e)=>setExpereince(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="text" placeholder='Experience'/>
    </div>

    <div className='mb-4'>
        <p className='text-xl mb-2'>Doctor Fees</p>
        <input  value={fees} onChange={(e)=>setFees(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg' type="number" placeholder='Fees'/>
    </div>
    </div>
    <div>
        <div className='mb-4'>
            <p className='text-xl mb-2'>Speciality</p>
            <select  value={speciality} onChange={(e)=>setSpeciality(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
        </div>
         <div className='mb-4'>
        <p className='text-xl mb-2'>Education</p>
        <input  value={degree} onChange={(e)=>setDegree(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="text" placeholder='Education'/>
    </div>
     <div className='mb-4'>
        <p className='text-xl mb-2'>Address</p>
        <input  value={address1} onChange={(e)=>setAddress1(e.target.value)} className='w-full p-2 mb-4 border border-gray-400 rounded-lg ' type="text" placeholder='Line1'/>
        <input  value={address2} onChange={(e)=>setAddress2(e.target.value)} className='w-full p-2 border border-gray-400 rounded-lg ' type="text" placeholder='Line2'/>
    </div>

    </div>
     </div>

     {/* bottom */}
     <div className='mb-4'>
       <h1 className='text-xl mb-2'>About </h1>
       <textarea  value={about} onChange={(e)=>setAbout(e.target.value)} className='w-full flex-1 p-2 border border-gray-400 rounded-lg ' name="about" rows={4}></textarea>
     </div>
     <button onClick={()=>scrollTo(0,0)} type='submit' className='bg-blue-500 w-40 rounded-lg px-4 py-2 cursor-pointer'>Add Doctor</button>
    </form>
  )
}

export default page

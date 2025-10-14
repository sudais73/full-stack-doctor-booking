"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [doctors, setDoctrs] = useState([])

  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
 const [docDashData, setDocDashData] = useState({
  doctors: 0,
  appointments: 0,
  patients: 0,
  latestAppointmens: []  
})
const[profileData, setProfileData] = useState([])


  //getting all doctors//

  const getDoctors = async () => {
    try {
      const { data } = await axios.get('/api/admin/doctor/get')
      if (data.success) {
        setDoctrs(data.doctors)
      }
      else {
        toast.error("something wrong")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    getDoctors()

  }, [])

  // updatin availablity of the doc form admin dashboard//

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post('/api/admin/doctor/availability', { docId })
      if (data.success) {
        toast.success(data.msg)
        getDoctors();
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to fetch user data from backend//

  const userData = async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.UserData);
       

      } else {
        setUser(null);
        toast.error("some thing wrong");
      }
    } catch (error) {
      setUser(null);
      toast.error(error.message);
    }
  };

  // Run once on mount (for refresh persistence)
  useEffect(() => {
    userData();
  }, [user]);

  // getting all appointments for admin page//
  const getAppointments = async () => {
    try {
      const { data } = await axios.get('/api/admin/appointments')
      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error('something wrong')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //function to calculate age based on the user birthdate//

  const calculateBirthDate = (birthDate) => {
    const today = new Date()
    const birhtD = new Date(birthDate)
    let age = today.getFullYear() - birhtD.getFullYear()
    return age

  }


  // admin cancell appointments//

  const cancellAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post('/api/admin/cancell-appointment', { appointmentId })
      if (data.success) {
        toast.success(data.msg)
        getAppointments()
        getDocDashData()

      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  // getting dashboard data for admin dashboard//


  const getDashboardData = async () => {
  try {
    const { data } = await axios.get('/api/admin/dashboard', {
      withCredentials: true, 
    });

    if (data.success) {
      setDashData(data.dashData);
      console.log(data.dashData);
    } else {
      toast.error(data.msg);
    }
  } catch (error) {
    toast.error(error.response?.data?.msg || error.message);
  }
};


  const completeAppoinment = async (appointmentId) => {
    try {
      const { data } = await axios.post('/api/doctor/complete', { appointmentId })
      if (data.success) {
        toast(data.msg)
        getAppointments()
        getDocDashData()
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // gettiing dashboard data for doctor//

  const getDocDashData = async () => {
    try {
      const { data } = await axios.get('/api/doctor/dash-data')
      if (data.success) {
        setDocDashData(data.dashData)
      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
// getting doctor profile data//

const getProfileData = async()=>{
  try {
    const{data} = await axios.get('/api/doctor/profile')
    if(data.success){
      setProfileData(data.profileData)
      console.log(profileData);
      

    }else{
      toast.error(data.msg)
    }
  } catch (error) {
    
  }
}

// update avalaibility from doctor profile //
const changeAvailablityFromDocDash = async () => {
    try {
      const { data } = await axios.post('/api/doctor/availability')
      if (data.success) {
        toast.success(data.msg)
        getProfileData()
        

      } else {
        toast.error(data.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  const value = {
    router, doctors, changeAvailablity, 
    user, userData, getDoctors,
    appointments, getAppointments,
    calculateBirthDate,
    cancellAppointment,
    dashData,
    getDashboardData,
    completeAppoinment,
    docDashData, 
    getDocDashData,
    getProfileData,
    changeAvailablityFromDocDash, 
    profileData
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export default AppContextProvider
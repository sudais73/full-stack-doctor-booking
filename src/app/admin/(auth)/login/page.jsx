'use client'
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "@/context/AppContext";

const Page = () => {
  const[state, setState] = useState('Admin')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {router} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
     e.preventDefault();
    try {
     
        const{data} = await axios.post('/api/admin/login',{email, password})
        if(data.success){
          localStorage.setItem("dtoken", data.token);
          router.push("/admin/dashboard")
        
          

        }
      
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.msg || "Login failed");
    }
  };


  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col mt-[10%] justify-center gap-4 mx-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">{state} Login</span>
      </p>

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      {state === "Admin" ? (
        <p>
          Doctor Login{' '}
          <span
            onClick={() => router.push('/doctor/login')}
            className="text-indigo-500 cursor-pointer"
          >
            click here
          </span>
        </p>
      ) : ('')}

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default Page;

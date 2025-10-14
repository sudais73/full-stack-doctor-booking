'use client'
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AuthPage = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const{setUToken,uToken, userData} = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (state === 'login') {
                const { data } = await axios.post('/api/user/login', { email, password });
                if (data.success) {
                    toast.success('Login successful!');
                    userData()
                    router.push('/');
                    setUToken(data.token)
                    console.log(uToken);
                    
                } else {
                    toast.error(data.message || 'Login failed');
                }
            } else {
                const { data } = await axios.post("/api/user/register", { name, email, password });
                if (data.success) {
                    toast.success('Account created successfully!');
                    setState("login");
                    setName("");
                    setEmail("");
                    setPassword("");
                } else {
                    toast.error(data.message || 'Registration failed');
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-md p-8 py-12 text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium text-center mb-4">
                    <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                
                {state === "register" && (
                    <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input 
                            id="name"
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            placeholder="Enter your name" 
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                            type="text" 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                )}
                
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="Enter your email" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                        type="email" 
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder="Enter your password" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 focus:ring-2 focus:ring-indigo-200" 
                        type="password" 
                        required 
                        minLength={state === "register" ? 8 : 1}
                        disabled={isLoading}
                    />
                    {state === "register" && (
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                    )}
                </div>

                <div className="text-sm text-center">
                    {state === "register" ? (
                        <p>
                            Already have an account?{' '}
                            <span 
                                onClick={() => {
                                    setState("login");
                                    clearForm();
                                }} 
                                className="text-indigo-500 cursor-pointer hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Need an account?{' '}
                            <span 
                                onClick={() => {
                                    setState("register");
                                    clearForm();
                                }} 
                                className="text-indigo-500 cursor-pointer hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>

                <button 
                    type='submit' 
                    disabled={isLoading}
                    className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 transition-all text-white w-full py-2 rounded-md cursor-pointer flex items-center justify-center"
                >
                    {isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <span>{state === "register" ? "Create Account" : "Login"}</span>
                    )}
                </button>

                {state === "login" && (
                    <p className="text-sm text-center text-gray-500">
                        Forgot password?{' '}
                        <span className="text-indigo-500 cursor-pointer hover:underline">
                            Reset here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default AuthPage;
import validator from 'validator'
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import { connectDb } from '@/config/dbConfig';
import jwt from 'jsonwebtoken';
import Doctor from '@/models/doctor';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        
        // Validation
        if (!email || !password) {
            return NextResponse.json({ 
                success: false, 
                message: "All fields are required" 
            }, { status: 400 })
        }

        if (!validator.isEmail(email)) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid email format" 
            }, { status: 400 })
        }

        await connectDb()

        // Check if doctor exists
        const doctor = await Doctor.findOne({ email })
        if (!doctor) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials" 
            }, { status: 401 })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials" 
            }, { status: 401 })
        }

        // Create JWT token with expiration
        const token = jwt.sign(
            { id: doctor._id }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '7d' }
        )

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            data:doctor
           
        }, { status: 200 })

        // Set HTTP-only cookie
        response.cookies.set("dtoken", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 
        })

        return response

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        }, { status: 500 })
    }
}
import validator from 'validator'
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import User from '@/models/user';
import { connectDb } from '@/config/dbConfig';
import jwt from 'jsonwebtoken';

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

        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials" // Generic message for security
            }, { status: 401 })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials" // Generic message for security
            }, { status: 401 })
        }

        // Create JWT token with expiration
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '7d' }
        )

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
               
            },
           
        }, { status: 200 })

        // Set HTTP-only cookie
        response.cookies.set("utoken", token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
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
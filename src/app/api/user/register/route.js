import validator from 'validator'
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import User from '@/models/user';
import { connectDb } from '@/config/dbConfig';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        
        // Validation
        if (!name || !email || !password) {
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

        if (password.length < 8) {
            return NextResponse.json({ 
                success: false, 
                message: "Password must be at least 8 characters" 
            }, { status: 400 })
        }

        await connectDb()

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            }, { status: 409 })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json({ 
            success: true, 
            message: "User created successfully",
            data: { id: user._id, name: user.name, email: user.email }
        }, { status: 201 })

    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error" 
        }, { status: 500 })
    }
}
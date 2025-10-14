import { connectDb } from '@/config/dbConfig'
import User from '@/models/user'
import getDataFromToken from '@/lib/getUserFromToken'
import { NextResponse } from 'next/server'

export async function GET(request) {
    try {
        const userId = getDataFromToken(request)
        await connectDb()
        const UserData = await User.findById(userId).select('-password')
        return NextResponse.json({success:true, UserData})
    } catch (error) {
        return NextResponse.json({success:false, msg:error.message})
        
    }
}
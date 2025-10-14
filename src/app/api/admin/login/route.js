import { connectDb } from "@/config/dbConfig"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request) {
  try {
    await connectDb();

    const { email, password } = await request.json();

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      const response = NextResponse.json({
        success: true,
        msg: "Loging Successfully",
        token
      });
      response.cookies.set("atoken", token, { httpOnly: true });
      return response;
      
    } else {
      return NextResponse.json({ success: false, msg: "Invalid credentials" }, { status: 401 });
    }
    
  } catch (error) {
    return NextResponse.json({ success: false, msg: error.message || "Server error" }, { status: 500 });
  }
}

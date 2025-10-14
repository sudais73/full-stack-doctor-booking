import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "@/config/dbConfig";
import Doctor from "@/models/doctor";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Configure Cloudinary
export const cloudinarConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export async function uploadSingleImage(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(buffer);
    });

    return imageUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image");
  }
}

 export async function POST(request) {
  try {
    await connectDb();
    cloudinarConfig();

    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("image");
    const speciality = formData.get("speciality");
    const degree = formData.get("degree");
    const experience = formData.get("experience");
    const about = formData.get("about");
    const fees = formData.get("fees");
    const address = formData.get("address");

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, msg: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = file ? await uploadSingleImage(file) : null;

    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      image,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      msg: "Doctor Added Successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("POST /doctor error:", error);
    return NextResponse.json(
      { success: false, msg: error.message || "Server error" },
      { status: 500 }
    );
  }
}

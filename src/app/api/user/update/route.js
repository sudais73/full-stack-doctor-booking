import { v2 as cloudinary } from "cloudinary";
import getDataFromToken from "@/lib/getUserFromToken";
import User from "@/models/user";
import { NextResponse } from "next/server";

// Configure Cloudinary
export const cloudinarConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export async function PUT(request) {
  try {
    // Call the config function
    cloudinarConfig();
    
    const userId = getDataFromToken(request);
    
    // Handle multipart form data correctly
    const formData = await request.formData();
    const image = formData.get('image');
    const name = formData.get('name');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const birthDate = formData.get('birthDate');
    const gender = formData.get('gender');

    if (!name || !phone || !birthDate || !gender) {
      return NextResponse.json(
        { success: false, msg: "All fields are required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData = {
      name,
      phone,
      birthDate,
      gender
    };

    // Parse address if provided
    if (address) {
      try {
        updateData.address = JSON.parse(address);
      } catch (error) {
        return NextResponse.json(
          { success: false, msg: "Invalid address format" },
          { status: 400 }
        );
      }
    }

    // Handle image upload if provided
    if (image && image instanceof File) {
      try {
        // Convert image to buffer for Cloudinary upload
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Upload image to Cloudinary using upload_stream for better handling
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          
          // Write buffer to upload stream
          uploadStream.end(buffer);
        });

        updateData.image = uploadResult.secure_url;

       
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return NextResponse.json(
          { success: false, msg: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, msg: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        msg: "Profile updated successfully",
        user: updatedUser 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}
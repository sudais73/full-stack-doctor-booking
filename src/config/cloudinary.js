import {v2 as cloudinary} from'cloudinary'


// Configure Cloudinary
export const cloudinarConfig = async ()=>{
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
   
}

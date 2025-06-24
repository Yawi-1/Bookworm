const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Accept base64 string directly
const uploadToCloudinary = async (base64Data) => {
  const result = await cloudinary.uploader.upload(base64Data);
  return result.secure_url;
};

module.exports = uploadToCloudinary;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload using Base64 data URI (no external libs)
const uploadToCloudinary = async (file) => {
  const base64DataURI = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64DataURI);

  return result.secure_url;
};

module.exports = uploadToCloudinary;

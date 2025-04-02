const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary Storage with Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "saaraa-jewels/product_images", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Allowed file formats
  },
});

// Create Multer instance
const upload = multer({ storage });

module.exports = { upload, cloudinary };

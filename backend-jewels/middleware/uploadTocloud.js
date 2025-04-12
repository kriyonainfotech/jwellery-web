const sharp = require("sharp");
const cloudinary = require("../config/multerConfig");
const fs = require("fs");
const path = require("path");

const uploadImageToCloudinary = async (file, folder) => {
  try {
    const tempDir = path.join(__dirname, "../temp");

    // Check and create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const compressedPath = path.join(
      tempDir,
      `compressed-${file.originalname}`
    );

    // Compress image with Sharp (quality = 80)
    await sharp(file.buffer)
      .jpeg({ quality: 80 })
      .toFile(compressedPath)
      .catch((err) => {
        console.error("❌ Sharp compression error:", err);
        throw new Error("Image processing failed");
      });

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(compressedPath, {
      folder: `saaraa/${folder}`,
      use_filename: true,
      unique_filename: false,
    });

    // Clean temp
    fs.unlinkSync(compressedPath);

    return uploadResult.secure_url;
  } catch (err) {
    console.error("❌ Error uploading image to Cloudinary:", err.message);
    throw new Error("Image upload failed");
  }
};

module.exports = uploadImageToCloudinary;

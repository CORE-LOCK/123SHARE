import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

const fileController = async (req, res) => {
  try {
    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select files",
      });
    }

    const uploadedFiles = [];

    // Loop through every uploaded file
    for (const file of req.files) {
      let fileUrl = `/uploads/${file.filename}`;
      let publicId = "";

      try {
        if (
          process.env.CLOUD_NAME &&
          process.env.API_KEY &&
          process.env.API_SECRET
        ) {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "FileTransfer",
            resource_type: "auto",
          });

          fileUrl = result.secure_url;
          publicId = result.public_id;
        }
      } catch (cloudinaryError) {
        console.warn(
          `Cloudinary upload failed for ${file.originalname}:`,
          cloudinaryError.message
        );
      }

      // Delete local file if it exists
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      // Save to MongoDB
      const newFile = await imageModel.create({
        fileName: file.originalname,
        fileUrl,
        publicId,
      });

      uploadedFiles.push(newFile);
    }

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: uploadedFiles,
    });

  } catch (error) {
    console.error(error);

    // Clean up any remaining uploaded files
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default fileController;
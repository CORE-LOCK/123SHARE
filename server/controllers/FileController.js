import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

const fileController = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file",
      });
    }

    // Default values
    let fileUrl = `/uploads/${req.file.filename}`;
    let publicId = "";

    try {
      if (
        process.env.CLOUD_NAME &&
        process.env.API_KEY &&
        process.env.API_SECRET
      ) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "FileTransfer",
          resource_type: "auto",
        });

        // Save Cloudinary details
        fileUrl = result.secure_url;
        publicId = result.public_id;

        // Delete local uploaded file
        fs.unlinkSync(req.file.path);
        console.log("Local file deleted successfully.");
      }
    } catch (cloudinaryError) {
      console.warn(
        "Cloudinary upload failed, falling back to local storage:",
        cloudinaryError.message
      );
    }

    // Save in MongoDB
    const newFile = await imageModel.create({
      fileName: req.file.originalname,
      fileUrl,
      publicId,
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newFile,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default fileController;
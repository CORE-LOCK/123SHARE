import file from "../models/imageModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

const deleteFIles = async (req, res) => {
  try {
    const { id } = req.params;
    const deletefIles = await file.findById(id);

    if (!deletefIles) {
      return res.status(404).json({
        success: false,
        message: "image not found",
      });
    }

    if (deletefIles.publicId) {
      try {
        await cloudinary.uploader.destroy(deletefIles.publicId, {
          resource_type: deletefIles.resourceType,
        });
      } catch (cloudinaryError) {
        console.warn("Cloudinary delete failed:", cloudinaryError.message);
      }
    }

    await file.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default deleteFIles;

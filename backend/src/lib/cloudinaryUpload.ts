import cloudinary from "../config/cloudinary";
import ApiError from "./ApiError";

export const uploadToCloudinary = async ({ file }: { file: any }) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "chatify",
    });

    return result.secure_url;
  } catch (error) {
    throw new ApiError(500, "Error uploading image to cloudinary", error);
  }
};

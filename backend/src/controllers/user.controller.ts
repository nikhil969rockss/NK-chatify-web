import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import { uploadToCloudinary } from "../lib/cloudinaryUpload";
import { updateUser } from "../services/user.service";

export const updateProfileController = asyncHandler(async (req, res, _) => {
  const user = req.user;
  const { profilePic } = req.body;
  console.log(profilePic);
  if (!profilePic) throw new ApiError(400, "profilePic is required");

  //upload to cloudinary
  const uploadedPicUrl = await uploadToCloudinary({ file: profilePic });

  const updatedUser = await updateUser({
    id: user?._id,
    userData: { profilePic: uploadedPicUrl },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "profile updated successfully", updatedUser));
});

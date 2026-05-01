import mongoose from "mongoose";
import { asyncHandler } from "../lib/asyncHandler";
import ApiError from "../lib/ApiError";

export const validateObjectId = asyncHandler(async (req, _, next) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "User Id is required");
  }
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    throw new ApiError(400, "Invalid user Id, must be a valid ObjectId");
  }
  next();
});

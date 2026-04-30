import aj from "../config/arcjet";
import ApiError from "../lib/ApiError";
import { asyncHandler } from "../lib/asyncHandler";

export const arcjetRateLimitter = asyncHandler(async (req, _, next) => {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new ApiError(429, "Too many requests");
    } else if (decision.reason.isBot()) {
      throw new ApiError(403, "Bot dected, unauthorized");
    } else {
      throw new ApiError(403, "Access denied");
    }
  }
  next();
});

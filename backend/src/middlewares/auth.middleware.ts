import ApiError from "../lib/ApiError";
import { asyncHandler } from "../lib/asyncHandler";
import { verifyToken } from "../lib/token";
import { isTokenBlackListed } from "../services/blackList.service";
import { getUserByIdWithoutPassword } from "../services/user.service";

/**
 * @description To check if user is logged in or not via token verification
 */
export const authenticateUser = asyncHandler(async (req, _, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Token requried, Unauthorized access");
  }
  const result = await isTokenBlackListed({ token });
  if (result) {
    throw new ApiError(
      401,
      "Expired token, Unauthorized access. Please login again",
    );
  }
  const decodedToken = verifyToken({ token }) as unknown as Idecoded;

  const loggedInUser = await getUserByIdWithoutPassword(decodedToken.userId);

  // this check will not reach- it is for safety purpose
  if (!loggedInUser) {
    throw new ApiError(
      401,
      "User not found with this token, Unauthorized access. Please login again",
    );
  }

  req.user = loggedInUser;
  next();
});

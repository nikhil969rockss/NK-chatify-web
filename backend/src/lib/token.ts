import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import ApiError from "./ApiError";

/**
 * @description  Create a jwt token
 * @param - {user: any, expiresIn: any}
 * @returns jwt token
 */
export const createToken = ({
  user,
  expiresIn = "7d",
}: {
  user: any;
  expiresIn: any;
}) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn });
};

/**
 * @description Verify token with jwt
 * @param token - token to verify
 * @returns
 */
export const verifyToken = ({ token }: { token: string }) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new ApiError(401, "Invalid token", error);
  }
};

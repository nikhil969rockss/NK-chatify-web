import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

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
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn });
};

/**
 * @description Verify token with jwt
 * @param token - token to verify
 * @returns
 */
export const verifyToken = ({ token }: { token: string }) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, JWT_SECRET);
};

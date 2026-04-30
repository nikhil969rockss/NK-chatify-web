import { NODE_ENV } from "../config/env";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import { validateSignup } from "../lib/validate";
import { sendRegistrationEmail } from "../services/email.service";
import {
  createUser,
  getUserByEmailOrId,
  getUserByIdWithoutPassword,
} from "../services/user.service";

/**
 * @description signup user with fullName, email and password
 */
export const signupController = asyncHandler(async (req, res, next) => {
  //validate incoming requrest through zod
  const { fullName, email, password } = validateSignup(req.body);

  const isUserExist = await getUserByEmailOrId({ email });

  if (isUserExist) {
    throw new ApiError(400, "User already exisits with this email");
  }

  //if not create user
  const newUser = await createUser({ fullName, email, password });

  // create token
  const token = newUser.createJWT();

  //set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    secure: NODE_ENV === "production" ? true : false,
    sameSite: "strict", // to preventCSRF attack if domain is same, none is used for different domain
  });

  const newUserResponse = await getUserByIdWithoutPassword(newUser._id);

  res.status(201).json(
    new ApiResponse(201, "User created successfully", {
      user: newUserResponse,
      token,
    }),
  );

  await sendRegistrationEmail(newUser.email, newUser.fullName);
});

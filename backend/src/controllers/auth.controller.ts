import { ENV } from "../config/env";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import { validateSignup, validateLogin } from "../lib/validate";
import {
  createBlackListToken,
  isTokenBlackListed,
} from "../services/blackList.service";
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
    secure: ENV.NODE_ENV === "production" ? true : false,
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

/**
 * @description login user with  email and password
 */
export const loginController = asyncHandler(async (req, res, next) => {
  //validate incoming requrest through zod
  const { email, password } = validateLogin(req.body);

  const user = await getUserByEmailOrId({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid credentials");
  }

  // create token
  const token = user.createJWT();

  //set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    secure: ENV.NODE_ENV === "production" ? true : false,
    sameSite: "strict", // to preventCSRF attack if domain is same, none is used for different domain
  });

  const userResponse = await getUserByIdWithoutPassword(user._id);

  res.status(200).json(
    new ApiResponse(201, "User login successfully", {
      user: userResponse,
      token,
    }),
  );
});

/**
 * @description logout user
 */
export const logoutController = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(200)
      .json(new ApiResponse(200, "User already logged out"));
  }

  const result = await isTokenBlackListed({ token });
  if (result) {
    throw new ApiError(
      400,
      "This token already blacklisted, User already logged out",
    );
  }

  await createBlackListToken({ token });

  res.clearCookie("token");

  res.status(200).json(new ApiResponse(201, "User logout successfully"));
});

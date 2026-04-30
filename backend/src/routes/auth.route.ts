import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controller";

const authRouter = express.Router();

/**
 * @route POST /api/v1/auth/signup
 */
authRouter.post("/signup", signupController);

/**
 * @route POST /api/v1/auth/login
 */
authRouter.post("/login", loginController);

/**
 * @route POST /api/v1/auth/logout
 */
authRouter.post("/logout", logoutController);

export default authRouter;

import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  getMeController,
} from "../controllers/auth.controller";
import { arcjetRateLimitter } from "../middlewares/arjet.middleware";
import { authenticateUser } from "../middlewares/auth.middleware";

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

/**
 * @route POST /api/v1/auth/check
 * @protected
 */
authRouter.get("/check", authenticateUser, getMeController);

export default authRouter;

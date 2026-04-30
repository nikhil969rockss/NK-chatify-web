import express from "express";
import {
  signupController,
  loginController,
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

export default authRouter;

import express from "express";
import { signupController } from "../controllers/auth.controller";

const authRouter = express.Router();

/**
 * @route POST /api/v1/auth/signup
 */
authRouter.post("/signup", signupController);

export default authRouter;

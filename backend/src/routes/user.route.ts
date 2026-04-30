import express from "express";
import {
  getMeController,
  updateProfileController,
} from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const userRouter = express.Router();

/**
 * @route POST /api/v1/user/update-profile
 * @protected
 */
userRouter.post("/update-profile", authenticateUser, updateProfileController);

/**
 * @route POST /api/v1/user/get-user
 * @protected
 */
userRouter.get("/get-user", authenticateUser, getMeController);

export default userRouter;

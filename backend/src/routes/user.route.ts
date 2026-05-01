import express from "express";
import { updateProfileController } from "../controllers/user.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const userRouter = express.Router();

/**
 * @route POST /api/v1/user/update-profile
 * @protected
 */
userRouter.post("/update-profile", authenticateUser, updateProfileController);

export default userRouter;

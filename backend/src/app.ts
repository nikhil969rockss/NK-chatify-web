import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";

import { ENV } from "./config/env";

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(arcjetRateLimitter); // for rate limiting

//routes
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

//routes use
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

//gloabal error middleware
import { globalErrorMiddleware } from "./middlewares/globalError.middleware";
import { arcjetRateLimitter } from "./middlewares/arjet.middleware";
app.use(globalErrorMiddleware);

//make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

export default app;

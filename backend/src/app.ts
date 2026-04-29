import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Your server is running");
});

//routes
import authRouter from "./routes/auth.route";

app.use("/api/v1/auth", authRouter);

export default app;

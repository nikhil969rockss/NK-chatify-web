import type { Response, NextFunction } from "express";
import ApiError from "../lib/ApiError";
import { NODE_ENV } from "../config/env";

export const globalErrorMiddleware = (
  err: IApiError,
  req: IApiRequest,
  res: Response,
  next: NextFunction,
) => {
  let error = err;
  console.log(err);

  if (!(error instanceof ApiError)) {
    error.statusCode = err.statusCode || err.code || 500;
    error.message = err.message || "Internal Server Error";
  }

  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    stack: NODE_ENV === "development" ? error.stack : undefined,
    errors: error.errors,
  };

  return res.status(error.statusCode!).json(response);
};

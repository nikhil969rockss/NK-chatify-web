class ApiError extends Error {
  readonly statusCode: number;
  readonly success: boolean;
  readonly errors: any;

  constructor(
    statusCode: number = 400,
    message: string,
    errors?: any,
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;

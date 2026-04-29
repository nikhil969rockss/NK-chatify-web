export class ApiResponse<T = unknown> {
  readonly statusCode: number;
  readonly success: boolean;
  readonly message: string;
  readonly data: T | null;

  constructor(
    statusCode: number,
    message: string = "success",
    data: T | null = null,
  ) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;

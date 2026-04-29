import type { Request, Errback } from "express";
declare global {
  interface Document {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  }

  interface IApiRequest extends Request {
    user?: any;
  }

  interface IApiError extends Errback {
    code?: number;
    statusCode?: number;
    message?: string;
    stack?: string;
  }
}
export {};

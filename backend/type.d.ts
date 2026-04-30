import type { Request, Errback } from "express";
import type { Document, Model } from "mongoose";
declare global {
  interface IApiRequest extends Request {
    user?: any;
  }

  interface IApiError extends Errback {
    code?: number;
    statusCode?: number;
    message?: string;
    stack?: string;
    errors?: any;
  }

  interface IUser {
    fullName: string;
    email: string;
    password: string;
    profilePic?: string;
  }

  interface IUserDocument extends IUser, Document {
    comparePassword: (password: string) => Promise<boolean>;
    createJWT: () => string;
  }

  interface IUserModel extends Model<IUserDocument> {}

  interface ISendEmail {
    subject: string;
    to: string;
    text: string;
    html: string;
  }
}
export {};

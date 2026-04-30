import type { Request, Errback } from "express";
import type { Document, Model, ObjectId } from "mongoose";
declare global {
  interface IApiRequest extends Request {
    user?: IUserDocument;
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

  interface IBlackListToken extends Document {
    token: string;
    createdAt: Date;
  }
  interface Idecoded {
    userId: string;
  }

  type UpdateUserData = {
    fullName?: string;
    password?: string;
    profilePic?: string;
  };

  interface IMessage extends Document {
    senderId: ObjectId;
    receiverId: ObjectId;
    text: string;
    image: string;
  }
}
export {};

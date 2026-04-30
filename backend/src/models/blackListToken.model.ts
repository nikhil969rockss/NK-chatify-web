import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema<IBlackListToken>({
  token: {
    type: String,
    required: [true, "token is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});

const BlackListTokenModel = mongoose.model<IBlackListToken>(
  "BlackListToken",
  blackListTokenSchema,
);

export default BlackListTokenModel;

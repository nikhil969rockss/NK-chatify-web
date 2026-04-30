import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: [true, "User already registered with this email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/027/448/973/large_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }
  const hasedPassword = await bcrypt.hash(this.password, 10);
  this.password = hasedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET!, { expiresIn: "7d" });
};

const UserModel = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default UserModel;

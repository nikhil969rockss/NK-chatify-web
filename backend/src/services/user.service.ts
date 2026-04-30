import UserModel from "../models/user.model";

export const getUserByEmailOrId = async ({
  _id,
  email,
}: {
  _id?: string | unknown;
  email?: string;
}) => {
  return await UserModel.findOne({
    $or: [{ _id }, { email }],
  });
};

export const getUserByIdWithoutPassword = async (id: string | unknown) => {
  return await UserModel.findById({ _id: id }).select("-password");
};

export const createUser = async (userData: IUser) => {
  return await UserModel.create(userData);
};

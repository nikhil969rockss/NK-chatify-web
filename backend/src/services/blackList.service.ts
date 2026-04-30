import BlackListTokenModel from "../models/blackListToken.model";

export const createBlackListToken = async ({ token }: { token: string }) => {
  return await BlackListTokenModel.create({
    token,
  });
};

export const isTokenBlackListed = async ({ token }: { token: string }) => {
  const blackListedToken = await BlackListTokenModel.findOne({ token });
  if (blackListedToken) return true;
  return false;
};

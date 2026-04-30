import type { RootFilterQuery } from "mongoose";
import MessageModel from "../models/message.model";

export const getAllMessages = async ({
  query = {},
}: {
  query: RootFilterQuery<IMessage>;
}) => {
  return await MessageModel.find(query);
};

export const createMessage = async (message: IMessage) => {
  return await MessageModel.create({
    senderId: message.senderId,
    receiverId: message.receiverId,
    text: message.text,
    image: message.image,
  });
};

import express from "express";
import {
  getAllContactsController,
  getAllChatsController,
  getAllMessagesOfChatController,
  sendMessageController,
} from "../controllers/message.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);
/**
 * @route GET /api/v1/messages/contacts
 */
messageRouter.get("/contacts", getAllContactsController);

/**
 * @route GET /api/v1/messages/chats
 */
messageRouter.get("/chats", getAllChatsController);

/**
 * @route GET /api/v1/messages/:id
 */
messageRouter.get("/:id", getAllMessagesOfChatController);

/**
 * @route POST /api/v1/messages/send/:id
 */
messageRouter.post("/send/:id", sendMessageController);

export default messageRouter;

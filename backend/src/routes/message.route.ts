import express from "express";
import {
  getAllContactsController,
  getAllChatsController,
  getAllMessagesOfChatController,
  sendMEssageController,
} from "../controllers/message.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);
/**
 * @route GET /api/v1/message/contacts
 */
messageRouter.get("/contacts", getAllContactsController);

// TODO: Will uncomment this later
// /**
//  * @route GET /api/v1/message/chats
//  */
// messageRouter.get("/chats", getAllChatsController);

// /**
//  * @route GET /api/v1/message/:id
//  */
// messageRouter.get("/:id", getAllMessagesOfChatController);

// /**
//  * @route POST /api/v1/message/send/:id
//  */
// messageRouter.get("/send/:id", sendMEssageController);

export default messageRouter;

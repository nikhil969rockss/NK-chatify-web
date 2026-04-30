import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import { getAllUser } from "../services/user.service";

/**
 * @description Get all contacts of the user
 */
export const getAllContactsController = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user;

  const filteredUser = await getAllUser({
    query: { _id: { $ne: loggedInUser?._id } },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "All contacts fetched", { users: filteredUser }),
    );
});

//TODO: Implement the controllers
/**
 * @description Get all people which user have sent messages or received
 */
export const getAllChatsController = asyncHandler(async (req, res, next) => {});

//TODO: Implement the controllers
/**
 * @description Get all chats of a particular user
 */
export const getAllMessagesOfChatController = asyncHandler(
  async (req, res, next) => {},
);

//TODO: Implement the controllers
/**
 * @description Send a message to a particular user
 */
export const sendMEssageController = asyncHandler(async (req, res, next) => {});

import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import { uploadToCloudinary } from "../lib/cloudinaryUpload";
import { createMessage, getAllMessages } from "../services/message.service";
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

/**
 * @description Get all people which user have sent messages or received
 */
export const getAllChatsController = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user;

  // find all the messages either send or received by the user
  const allMessages = await getAllMessages({
    query: {
      $or: [{ senderId: loggedInUser?._id }, { receiverId: loggedInUser?._id }],
    },
  });

  // find the users id
  const chatPartnerIds = [
    ...new Set(
      allMessages.map((message) =>
        message.senderId?.toString() === loggedInUser?._id?.toString()
          ? message.receiverId?.toString()
          : message.senderId?.toString(),
      ),
    ),
  ];
  const allChatPartners = await getAllUser({
    query: { _id: { $in: chatPartnerIds } },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "All chats fetched", { users: allChatPartners }),
    );
});

/**
 * @description Get all chats of a particular user
 */
export const getAllMessagesOfChatController = asyncHandler(
  async (req, res, next) => {
    const loggedInUser = req.user;
    const { id: userToChatId } = req.params;

    const allMessages = await getAllMessages({
      query: {
        $or: [
          { senderId: loggedInUser?._id, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: loggedInUser?._id },
        ],
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "All messages fetched", { messages: allMessages }),
      );
  },
);

/**
 * @description Send a message to a particular user
 */
export const sendMessageController = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user;
  const { id: toUserId } = req.params;

  const { text, image } = req.body;

  if (!text && !image) {
    throw new ApiError(400, "Message text or image is required");
  }

  //check sender can't send message to himself
  if (toUserId === loggedInUser?._id?.toString()) {
    throw new ApiError(400, "You can't send message to yourself");
  }

  let imageUrl: string = "";
  if (image) {
    //upload to cloudinary
    imageUrl = await uploadToCloudinary({ file: image });
  }

  //  @ts-ignore
  const message = await createMessage({
    senderId: loggedInUser?._id,
    receiverId: toUserId,
    text,
    image: imageUrl ? imageUrl : undefined,
  });

  //   TODO: send message in real time if user is online - socket.io

  return res.status(200).json(new ApiResponse(200, "Message sent", message));
});

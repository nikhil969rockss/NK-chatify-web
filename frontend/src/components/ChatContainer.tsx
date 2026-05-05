import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistory from "./NoChatHistory";
import clsx from "clsx";
import formatCreatedAtIntl from "../utils/formatDate";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />

      {/*  WHERE ALL CHATS DISPLAY */}

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message._id}
                className={clsx(
                  "chat",
                  message?.senderId === user?._id ? "chat-end" : "chat-start",
                )}
              >
                <div
                  className={clsx(
                    "chat-bubble relative",
                    message?.senderId === user?._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200",
                  )}
                >
                  {message?.image && (
                    <img src={message?.image} alt="image" className="" />
                  )}
                  {message?.text && <p className="mt-2">{message.text}</p>}
                  <p className="text-sm mt-1 opacity-75 flex items-center gap-1">
                    {formatCreatedAtIntl(message.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistory name={selectedUser?.fullName} />
        )}
      </div>
    </>
  );
};

export default ChatContainer;

import { useEffect, useRef } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistory from "./NoChatHistory";
import clsx from "clsx";
import formatCreatedAtIntl, { getMessageDay } from "../utils/formatDate";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();

  const { user } = useAuthStore();

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [selectedUser, getMessagesByUserId]);

  const groupedMessages = messages
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((msg) => ({
      ...msg,
      day: getMessageDay(msg.createdAt),
    }));

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupedMessages]);

  return (
    <>
      <ChatHeader />

      {/*  WHERE ALL CHATS DISPLAY */}

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {groupedMessages.map((message, index) => {
              const currentDay = getMessageDay(message.createdAt);
              const prevMessage = groupedMessages[index - 1];
              const prevDay = prevMessage
                ? getMessageDay(prevMessage.createdAt)
                : null;

              const showDateBadge = currentDay !== prevDay;
              return (
                <div key={message._id}>
                  {showDateBadge && (
                    <div className="flex justify-center">
                      <p className="text-center badge !bg-slate-600 ">
                        {message.day}
                      </p>
                    </div>
                  )}
                  <div
                    key={message._id}
                    className={clsx(
                      "chat relative z-2",
                      message?.senderId === user?._id
                        ? "chat-end"
                        : "chat-start",
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
                        {formatCreatedAtIntl(message?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* SCROLL DIV TO THE BOTTOM */}
            <div ref={endRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistory name={selectedUser?.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;

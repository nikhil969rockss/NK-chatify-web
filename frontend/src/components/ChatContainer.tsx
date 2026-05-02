import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../store/useChatStore";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages } = useChatStore();

  const { user } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
    </>
  );
};

export default ChatContainer;

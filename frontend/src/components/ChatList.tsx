import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const { getAllMyChats, chats, isUsersLoading, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getAllMyChats();
  }, [getAllMyChats]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-all duration-200"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* TODO: FIX THIS ONLINE STATUS WITH SOCKET SERVER */}
            <div className="avator online">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={chat?.profilePic || "/images/avatar.png"}
                  alt={chat?.fullName + "profile image"}
                />
              </div>
            </div>
            <h4 className="font-medium truncate text-slate-200">
              {chat?.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;

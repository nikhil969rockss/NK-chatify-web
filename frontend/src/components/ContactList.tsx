import { useEffect } from "react";
import useChatStore from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import useAuthStore from "../store/useAuthStore";
import clsx from "clsx";

const ContactList = () => {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  return (
    <>
      {allContacts.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-all duration-200"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div
              className={clsx(
                "avatar",
                onlineUsers.includes(chat._id) ? "online" : "offline",
              )}
            >
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

export default ContactList;

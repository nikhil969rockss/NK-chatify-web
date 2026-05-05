import useChatStore from "../store/useChatStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className="flex justify-between items-center bg-slate-500/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="size-12 rounded-full overflow-hidden">
            <img
              src={selectedUser?.profilePic || "/images/avatar.png"}
              alt={`${selectedUser?.fullName}'s profile picture`}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>

      {/* CLOSE ICON */}
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="cursor-pointer size-5 text-slate-400 hover:text-slate-200 transition-all duration-200" />
      </button>
    </div>
  );
};

export default ChatHeader;

import { useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useUserProfileStore from "../store/useUserProfile";
import useChatStore from "../store/useChatStore";
import {
  LogOutIcon,
  LoaderIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import { toast } from "react-toastify";

const ProfileHeader = () => {
  const { logoutUser, user, isLoggingOut } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const { updateProfilePic } = useUserProfileStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef(null);

  const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

  //   HANDING FOR IMAGE CHANGE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("Please select a file for changing image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image as string);

      await updateProfilePic({ profilePic: base64Image as string });
    };
  };
  return (
    <div className="p-6 border-b bg-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR IMAGE */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full relative group overflow-hidden"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImage || user?.profilePic || "/images/avatar.png"}
                alt="user-image"
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* USERNAM AND ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {user?.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* BUTTONS FOR LOGOUT AND VOLUME */}
        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            title="Logout"
            className="text-slate-400 hover:text-slate-200 transition-all duration-300"
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* DIALOGUE BOX FOR LOGOUT */}
          <dialog id="my_modal_2" className="modal ">
            <div className="modal-box">
              <h3 className="font-bold text-lg ">Logout</h3>
              <p className="py-4">Are you sure you want to Logout?</p>
              <button
                disabled={isLoggingOut}
                onClick={logoutUser}
                className="btn btn-error"
              >
                {isLoggingOut ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  "Sure"
                )}
              </button>
            </div>
            <form method="dialog" className="modal-backdrop ">
              <button>close</button>
            </form>
          </dialog>

          {/* SOUND TOGGLE BTN */}
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0; // reset the sound to the beginning
              mouseClickSound
                .play()
                .catch((err) => console.log("failed to play auido", err));
              toggleSound();
            }}
            className="text-slate-400 hover:text-slate-200 transition-all duration-300"
          >
            {isSoundEnabled === "true" ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

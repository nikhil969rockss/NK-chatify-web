import { create } from "zustand";
import type { UserProfileStore } from "../types";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";

const useUserProfileStore = create<UserProfileStore>((set) => ({
  updatedUser: null,
  isUpdating: false,

  updateProfilePic: async (imageFile: { profilePic: File | string }) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.post("/users/update-profile", imageFile);
      set({ updatedUser: res.data?.data?.updatedUser });
    } catch (error: any) {
      console.log("Error updating profile pic", error?.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to update profile pic",
      );
    } finally {
      set({ isUpdating: false });
    }
  },
}));

export default useUserProfileStore;

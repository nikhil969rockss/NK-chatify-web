import { create } from "zustand";
import axiosInstance from "../config/axios";
import type { AuthStore } from "../types.ts";

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        user: res.data.data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log("Error in checkAuth", error?.response?.data);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
export default useAuthStore;

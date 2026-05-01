import { create } from "zustand";
import axiosInstance from "../config/axios";
import type { AuthStore, SignupData } from "../types.ts";
import { toast } from "react-toastify";

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isSigningUp: false,

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

  signupUser: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({
        user: res.data?.data?.user,
        isAuthenticated: true,
      });
      toast.success("User signed up successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.errors[0]?.errors[0] || "Error signing up user",
      );
      console.log("Error signing up user", error?.response?.data);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
export default useAuthStore;

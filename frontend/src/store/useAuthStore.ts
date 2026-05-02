import { create } from "zustand";
import axiosInstance from "../config/axios";
import type { AuthStore, SignupData, loginData } from "../types.ts";
import { toast } from "react-toastify";

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        user: res.data.data,
        isAuthenticated: true,
      });
    } catch (error: any) {
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
    } catch (error: any) {
      toast.error(
        error?.response?.data?.errors[0]?.errors[0] || "Error signing up user",
      );
      console.log("Error signing up user", error?.response?.data);
    } finally {
      set({ isSigningUp: false });
    }
  },

  loginUser: async (data: loginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({
        user: res.data?.data?.user,
        isAuthenticated: true,
      });
      toast.success("User logged in successfully");
    } catch (error: any) {
      console.log("Error logging in user", error?.response?.data);

      if (
        error?.response?.data?.message?.toLowerCase() === "validation failed"
      ) {
        toast.error(
          error?.response?.data?.errors[0]?.errors[0] ||
            "Error logging in user",
        );
        return;
      }
      toast.error(error?.response?.data?.message || "Error logging in user");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logoutUser: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
      });
      toast.success("User logged out successfully");
    } catch (error: any) {
      console.log("Error loggging out user", error?.response?.data);
      toast.error(error?.response?.data?.message || "Error logging out user");
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
export default useAuthStore;

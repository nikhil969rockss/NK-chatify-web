import { create } from "zustand";
import axiosInstance from "../config/axios";
import type { AuthStore, SignupData, loginData } from "../types.ts";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        user: res.data.data,
        isAuthenticated: true,
      });
      get().connectSocket();
    } catch (error: any) {
      console.log("Error in checkAuth", error?.response?.data || error);
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
    } catch (error: any) {
      console.log("Error loggging out user", error?.response?.data);
      toast.error(error?.response?.data?.message || "Error logging out user");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  connectSocket: () => {
    const { user, socket } = get();
    if (!user || socket?.connected || socket?.active) return;

    const socketClient = io(BASE_URL, { withCredentials: true });

    socketClient.connect();

    set({ socket: socketClient });

    // listen for events

    socketClient.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
export default useAuthStore;

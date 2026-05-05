import { create } from "zustand";
import type { ChatStore, User } from "../types";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const useChatStore = create<ChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled:
    localStorage.getItem("isSoundEnabled") === "true" ? "true" : "false",

  toggleSound: () => {
    localStorage.setItem(
      "isSoundEnabled",
      get().isSoundEnabled === "true" ? "false" : "true",
    );
    set({ isSoundEnabled: get().isSoundEnabled === "true" ? "false" : "true" });
  },

  setActiveTab: (tab: "chats" | "contacts") => set({ activeTab: tab }),
  setSelectedUser: (user: User) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data?.data?.users });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch contacts");

      console.log("Error in getAllContacts", error?.response?.data);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getAllMyChats: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data?.data?.users });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch all your chats",
      );

      console.log("Error in getAllMyChats", error?.response?.data);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res?.data?.data?.messages });
    } catch (error) {
      console.log(
        `Error fetching messages of the user:${userId}`,
        error?.response?.data,
      );
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch the messages with this user",
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { user } = useAuthStore.getState();

    // using optimistic UI updates
    const optimisticMessage = {
      _id: Date.now().toLocaleString(),
      senderId: user?._id,
      receiverId: selectedUser?._id,
      text: messageData?.text,
      image: messageData?.image,
      createdAt: new Date().toISOString(),
    };

    console.log("ye chala");

    try {
      set({ messages: messages.concat(optimisticMessage) });
      const res = await axiosInstance.post(
        `messages/send/${selectedUser?._id}`,
        messageData,
      );
      set({ messages: messages.concat(res?.data?.data) });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Some error occurred while sending the message",
      );
      // remove the optimistic message
      set({ messages: messages });
    }
  },
}));

export default useChatStore;

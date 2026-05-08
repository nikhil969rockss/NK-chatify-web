import { create } from "zustand";
import type { ChatStore, User } from "../types";
import axiosInstance from "../config/axios";
import { toast } from "react-toastify";
import useAuthStore from "./useAuthStore";

const notificationSound = new Audio("/sounds/notification.mp3");

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
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),

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
    } catch (error: any) {
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
      senderId: user?._id as string,
      receiverId: selectedUser?._id as string,
      text: messageData?.text as string,
      image: messageData?.image as string,
      createdAt: new Date().toISOString(),
    };

    try {
      set({ messages: messages.concat(optimisticMessage) });
      const res = await axiosInstance.post(
        `messages/send/${selectedUser?._id}`,
        messageData,
      );
      set({ messages: messages.concat(res?.data?.data) });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Some error occurred while sending the message",
      );
      // remove the optimistic message
      set({ messages: messages });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.on("newMessage", (message) => {
      const isMessageSentFromSelectedUser =
        message?.senderId === selectedUser?._id;

      // if the message is not sent from the selected user, then don't do anything
      if (!isMessageSentFromSelectedUser) return;

      const currentMessges = get().messages;

      set({ messages: [...currentMessges, message] });

      if (isSoundEnabled === "true") {
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((e) => console.log("error playing notification sound", e));
      }
    });
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));

export default useChatStore;

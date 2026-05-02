export interface Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface User extends Document {
  fullName: string;
  email: string;
  profilePic: string;
}

export interface ApiResponse<T> {
  data: T | null;
  statusCode: number;
  message: string;
}

export type SignupData = {
  fullName: string;
  email: string;
  password: string;
};

export type loginData = {
  email: string;
  password: string;
};

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  checkAuth: () => Promise<void>;
  signupUser: (data: SignupData) => Promise<void>;
  loginUser: (data: loginData) => Promise<void>;
  logoutUsrer: () => Promise<void>;
}

export interface Chat extends Document {
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
}

export interface ChatStore {
  allContacts: User[];
  chats: User[];
  messages: Chat[];
  activeTab: "chats" | "contacts";
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: string;
  toggleSound: () => void;
  setActiveTab: (tab: "chats" | "contacts") => void;
  setSelectedUser: (user: User) => void;
  getAllContacts: () => Promise<void>;
  getAllMyChats: () => Promise<void>;
}

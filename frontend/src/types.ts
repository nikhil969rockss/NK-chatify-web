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

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

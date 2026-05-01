import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  // TODO: add more states as needed
}));
export default useAuthStore;

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

// struttura dello stato
interface AuthState {
  authUser: any | null;
  isSigninUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

// implemento interface e creo lo store per i componenti
// evitando il props drilling
export const useAuthStore = create<AuthState>((set) => ({
  isSigninUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  authUser: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;

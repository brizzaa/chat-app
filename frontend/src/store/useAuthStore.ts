import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

// struttura dello stato

interface AuthState {
  authUser: any | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

// implemento interface e creo lo store per i componenti
// evitando il props drilling
export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },
  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account creato con successo!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Errore durante la registrazione"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: any) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login effettuato con successo!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Errore durante il login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout effettuato");
    } catch (error) {
      set({ authUser: null });
      toast.error("Errore durante il logout");
    }
  },

  updateProfile: async (data: any) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update/profile", data);
      set({ authUser: res.data });
      toast.success("Profilo aggiornato con successo!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Errore durante l'aggiornamento"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

export default useAuthStore;

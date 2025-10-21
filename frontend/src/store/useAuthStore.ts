import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

// tipi per i dati di registrazione/login
interface AuthData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  fullName?: string;
  email?: string;
  profilePic?: string;
}

// struttura dello stato
interface AuthState {
  socket: Socket | null;
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: AuthData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  onlineUsers: string[];
  setOnlineUsers: (onlineUsers: string[]) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

// implemento interface e creo lo store per i componenti
// evitando il props drilling
export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isCheckingAuth: false });

      get().connectSocket();
    } catch (error) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },
  signup: async (data: AuthData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account creato con successo!");
      get().connectSocket();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Errore durante la registrazione"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login effettuato con successo!");
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Errore durante il login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logout effettuato");
    } catch (error: any) {
      set({ authUser: null });
      get().disconnectSocket();
      if (error.response?.status !== 401) {
        toast.error("Errore durante il logout");
      }
      toast.success("Logout effettuato");
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
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
  onlineUsers: [],
  setOnlineUsers: (onlineUsers: string[]) => set({ onlineUsers }),
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    // se non c'e piu il socket allora ci disconnettiamo
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));

export default useAuthStore;

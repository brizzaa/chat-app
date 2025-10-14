import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

// interfaccia per le implementazioni
interface ChatStore {
  messages: any[];
  users: any[];
  selectedUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: any) => void;
  sendMessage: (data: any) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Errore durante il recupero degli utenti, ritenta");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data: any) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("Seleziona un utente per inviare un messaggio");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      console.error("Errore invio messaggio:", error);
      toast.error(
        error.response?.data?.message || "Errore durante l'invio del messaggio"
      );
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

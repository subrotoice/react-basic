import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (name) => set((store) => ({ user: name })),
  logout: () => set({ user: "" }),
}));

export default useAuthStore;

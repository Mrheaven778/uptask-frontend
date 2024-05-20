import { User } from "@/interface/user.interface";
import { create } from "zustand";
import instance from "../../lib/axios";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  user: User;
  setUser: (user: User) => void;
  // getUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {
    id: "",
    email: "",
    username: "",
    created_at: "",
    updated_at: "",
    roles: [],
  },
  setUser: (user: User) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  // getUser: async () => {
  //   set({ isLoading: true });
  //   await instance
  //     .get("user/profile")
  //     .then(({ data }) => {
  //       set({ user: data });
  //       set({ isAuthenticated: true });
  //     })
  //     .catch(() => {
  //       set({ isAuthenticated: false });
  //     })
  //     .finally(() => {
  //       set({ isLoading: false });
  //     });
  // },
}));

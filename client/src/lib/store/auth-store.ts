import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreState {
  user: {
    username: string;
    email: string;
    profilePictureUrl: string;
    _id: string;
  } | null;
  setUser: (user: AuthStoreState["user"]) => void;
  accessToken: string;
  setAccessToken: (accessToken: AuthStoreState["accessToken"]) => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),

      user: null,
    }),
    { name: "imgspace:auth-store" },
  ),
);

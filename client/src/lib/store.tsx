import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StoreState {
  user: {
    username: string;
    email: string;
    profilePictureUrl: string;
    _id: string;
  } | null;
  setUser: (user: StoreState["user"]) => void;
  accessToken: string;
  setAccessToken: (accessToken: StoreState["accessToken"]) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      user: null,
    }),
    { name: "imgspace:store" },
  ),
);

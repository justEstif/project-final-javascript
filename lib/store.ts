import { create } from "zustand";
import { persist } from "zustand/middleware";

type TStore = {
  user: {
    id: string;
    email?: string;
    docId: string;
  } | null;
  signInUser: (user: TStore["user"]) => void;
  signOutUser: () => void;
};

const useStore = create<TStore>()(
  persist(
    (set) => ({
      user: null,
      signInUser: (user: TStore["user"]) =>
        set((state) => ({
          ...state,
          user: user,
        })),
      signOutUser: () => set((state) => ({ ...state, user: null })),
    }),
    {
      name: "project-final-javascript",
    }
  )
);

export default useStore;

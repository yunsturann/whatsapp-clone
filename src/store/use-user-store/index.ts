import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../../config/firebase";
import { IUser } from "../../types";

interface UserStore {
  currentUser: IUser | null;
  isLoading: boolean;
  fetchCurrentUser: (uid: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoading: true,
  fetchCurrentUser: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docSnap = await getDoc(doc(db, "users", uid));

      if (!docSnap.exists()) {
        return set({ currentUser: null, isLoading: false });
      }

      set({ currentUser: docSnap.data() as IUser, isLoading: false });
    } catch (error) {
      console.log((error as Error).message);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));

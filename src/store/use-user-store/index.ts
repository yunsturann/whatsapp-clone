import { create } from "zustand";
import { db } from "../../config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { IUser } from "../../types";
import toast from "react-hot-toast";

interface UserStore {
  currentUser: IUser | null;
  isLoading: boolean;
  fetchCurrentUser: (uid: string) => void;
  changeUserProfileInfo: (key: string, value: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
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
  changeUserProfileInfo: async (key: string, value: string) => {
    const currentUser = get().currentUser;

    try {
      const userRef = collection(db, "users");

      await updateDoc(doc(userRef, currentUser?.id), {
        [key]: value,
      });

      set((state) => ({
        currentUser: {
          ...state.currentUser!,
          [key]: value,
        },
      }));

      toast.success(`${key} updated successfully`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  },
}));

import { create } from "zustand";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Types
import { IChatList } from "../../types";

// ** Store
import { useUserStore } from "../use-user-store";
import { useChatStore } from "../use-chat-store";

// ** Firebase
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface CreateMessageStore {
  text: string;
  setText: (update: string | ((prev: string) => string)) => void;
  isSubmitting: boolean;
  sendMessage: (text: string, imgUrl?: string) => Promise<void | string>;
}

export const useCreateMessage = create<CreateMessageStore>((set) => ({
  text: "",

  setText: (update) =>
    set((state) => ({
      text: typeof update === "function" ? update(state.text) : update,
    })),

  isSubmitting: false,

  sendMessage: async (text, imgUrl) => {
    const { chatId, chatUser } = useChatStore.getState();
    const currentUser = useUserStore.getState().currentUser;

    // ** This is reusable function so that text should be validated in an another function.

    // ** Validate exist user
    if (!chatUser || !chatId || !currentUser)
      return toast.error("Chat not found. Please try again");

    try {
      set({ isSubmitting: true });
      // ** Update common chat
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          text,
          senderId: currentUser.id,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      // ** Update users' chatlists
      const userIDS = [currentUser.id, chatUser.id];

      userIDS.forEach(async (id) => {
        const chatlistRef = doc(db, "chatlist", id);

        const chatlistSnap = await getDoc(chatlistRef);

        if (!chatlistSnap.exists()) return;

        const chatlistData = chatlistSnap.data() as IChatList;

        const chatIndex = chatlistData.chats.findIndex(
          (chat) => chat.chatId === chatId
        );

        chatlistData.chats[chatIndex].lastMessage = text;
        chatlistData.chats[chatIndex].updatedAt = Date.now();
        chatlistData.chats[chatIndex].isSeen = id === currentUser.id;

        await updateDoc(chatlistRef, {
          chats: chatlistData.chats,
        });
      });

      set({ text: "" });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));

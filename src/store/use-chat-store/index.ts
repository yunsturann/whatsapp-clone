import { create } from "zustand";
import { IMessage, IUser } from "../../types";
import { useUserStore } from "../use-user-store";

interface ChatStore {
  chatId: string | null;
  chatUser: IUser | null;
  isCurrentUserBlocked: boolean;
  isChatUserBlocked: boolean;
  setChat: (chatId: string, chatUser: IUser) => void;
  toggleBlockUser: () => void;
  resetChat: () => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatId: null,
  chatUser: null,
  isCurrentUserBlocked: false,
  isChatUserBlocked: false,
  setChat: (chatId, chatUser) => {
    const currentUser = useUserStore.getState().currentUser;
    const isCurrentUserBlocked = chatUser.blocked.includes(currentUser!.id);
    const isChatUserBlocked = currentUser!.blocked.includes(chatUser.id);

    set({
      chatId,
      chatUser,
      isCurrentUserBlocked,
      isChatUserBlocked,
    });
  },
  toggleBlockUser: () => {
    set((state) => ({ ...state, isChatUserBlocked: !state.isChatUserBlocked }));
  },
  resetChat: () => {
    set({
      chatId: null,
      chatUser: null,
      isCurrentUserBlocked: false,
      isChatUserBlocked: false,
    });
  },
  messages: [],
  setMessages: (messages) => {
    set({ messages });
  },
}));

import { create } from "zustand";
import { IMessage } from "../../types";

interface ShowFileDialogStore {
  selectedFile: IMessage | null;
  setSelectedFile: (file: IMessage) => void;
  onClose: () => void;
}

export const useShowFileDialog = create<ShowFileDialogStore>((set) => ({
  selectedFile: null,

  setSelectedFile: (file) => {
    set({ selectedFile: file });
  },

  onClose: () => {
    set({ selectedFile: null });
  },
}));

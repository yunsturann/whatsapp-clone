import { create } from "zustand";
import { IFilePreview } from "../../types";
import { useCreateMessage } from "../use-create-message";

interface ISelectedFile extends IFilePreview {
  caption?: string;
}

interface FileDialogStore {
  selectedFiles: ISelectedFile[];
  setSelectedFiles: (files: ISelectedFile[]) => void;
  activeIndex: number;
  setActiveIndex: (url: number) => void;
  removeSelectedFile: (index: number) => void;
  closeFileDialog: () => void;
  setCaption: (text: string) => void;
}

export const useFileDialog = create<FileDialogStore>((set, get) => ({
  selectedFiles: [],

  setSelectedFiles: (files) => {
    const firstCaption = useCreateMessage.getState().text;

    files[0].caption = firstCaption;

    set({ selectedFiles: files });
  },

  activeIndex: 0,

  setActiveIndex: (number) => {
    set({ activeIndex: number });
  },

  removeSelectedFile: (index) => {
    // ** check activeIndex is valid
    const activeIndex = get().activeIndex;

    if (activeIndex === index && activeIndex !== 0) {
      set({ activeIndex: activeIndex - 1 });
    }

    // ** Remove Item
    const filteredFiles = get().selectedFiles.filter((_, i) => index !== i);

    set({ selectedFiles: filteredFiles });
  },

  closeFileDialog: () => {
    set({ selectedFiles: [], activeIndex: 0 });
  },

  setCaption: (text: string) => {
    //! TODO: might add index validation but I think not required
    const activeIndex = get().activeIndex;

    const updatedFiles = get().selectedFiles;

    updatedFiles[activeIndex].caption = text;

    set({ selectedFiles: updatedFiles });
  },
}));

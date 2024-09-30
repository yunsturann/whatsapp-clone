import { create } from "zustand";
import { IFilePreview } from "../../types";

interface FileDialogStore {
  selectedFiles: IFilePreview[];
  setSelectedFiles: (files: IFilePreview[]) => void;
  activeIndex: number;
  setActiveIndex: (url: number) => void;
  removeSelectedFile: (index: number) => void;
}

export const useFileDialog = create<FileDialogStore>((set, get) => ({
  selectedFiles: [],
  setSelectedFiles: (files) => {
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
}));

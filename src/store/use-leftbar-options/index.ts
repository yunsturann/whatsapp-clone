import { ReactNode } from "react";
import { create } from "zustand";

interface LeftSectionOptions {
  isOpen: boolean;
  props: {
    title: string;
    children: ReactNode;
  };
}

const initialOptions: LeftSectionOptions = {
  isOpen: false,
  props: {
    title: "",
    children: null,
  },
};

interface LeftBarOptionStore {
  options: LeftSectionOptions;
  setOptions: (options: LeftSectionOptions) => void;
}

export const useLeftbarOptions = create<LeftBarOptionStore>((set) => ({
  options: initialOptions,
  // setOptions
  setOptions: (options) => {
    set({ options });
  },
}));

import { create } from "zustand";
import { RightSectionProps } from "../../components/chat/right-section";

interface RightbarOptionsStore {
  isOpen: boolean;
  setIsOpen: (by: boolean) => void;
  rightSectionProps: RightSectionProps;
  setRightSectionProps: (props: RightSectionProps) => void;
}

export const useRightbarOptions = create<RightbarOptionsStore>((set) => ({
  isOpen: false,
  setIsOpen: (by) => {
    set((state) => ({ ...state, isOpen: by }));
  },
  rightSectionProps: {
    title: "",
    children: null,
  },
  setRightSectionProps: (props) => {
    set((state) => ({ ...state, rightSectionProps: props }));
  },
}));

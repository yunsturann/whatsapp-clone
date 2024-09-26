import { create } from "zustand";
import { IFilePreview } from "../../types";
import { initialAvatar } from "../../constants";

interface ProfilePhotoDialogsStore {
  avatar: IFilePreview;
  setAvatar: (file: IFilePreview) => void;
  showUploadDialog: boolean;
  setShowUploadDialog: (by?: boolean) => void;
}

export const useProfilePhotoDialogs = create<ProfilePhotoDialogsStore>(
  (set) => ({
    avatar: initialAvatar,
    setAvatar: (file) => {
      set({ avatar: file });
    },
    showUploadDialog: false,
    setShowUploadDialog: (by) => {
      if (by !== undefined) {
        set({ showUploadDialog: by });
      } else {
        set((state) => ({
          ...state,
          showUploadDialog: !state.showUploadDialog,
        }));
      }
    },
  })
);

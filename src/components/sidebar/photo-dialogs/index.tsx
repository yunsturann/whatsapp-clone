// ** React Imports
import { useState } from "react";

// ** Store
import { useProfilePhotoDialogs } from "../../../store/use-profile-photo-dialogs";
import { useUserStore } from "../../../store/use-user-store";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Custom Components
import PhotoDialog from "../left-section/profile/profile-photo/photo-dialog";

// ** Icons
import { MdCheck } from "react-icons/md";

// ** Utils
import uploadStorage from "../../../lib/firebase/uploadStorage";

const PhotoDialogs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setShowUploadDialog, showUploadDialog, avatar } =
    useProfilePhotoDialogs();

  const { changeUserProfileInfo } = useUserStore();

  const handleSaveUploadedPhoto = async () => {
    if (!avatar.file) {
      return toast.error("Select a photo!");
    }

    try {
      setIsSubmitting(true);
      let imgUrl = await uploadStorage(avatar.file, "avatars");

      await changeUserProfileInfo("avatar", imgUrl);

      setShowUploadDialog(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showUploadDialog && (
        <PhotoDialog
          onClose={() => setShowUploadDialog(false)}
          header={{
            title: "Drag the image to adjust",
            action: { text: "Upload", handleAction: () => {} },
          }}
          footerChildren={
            <button
              className="right"
              onClick={handleSaveUploadedPhoto}
              disabled={isSubmitting}
            >
              <MdCheck />
            </button>
          }
        >
          <img src={avatar.url} alt="Selected Photo" />
        </PhotoDialog>
      )}
    </>
  );
};

export default PhotoDialogs;

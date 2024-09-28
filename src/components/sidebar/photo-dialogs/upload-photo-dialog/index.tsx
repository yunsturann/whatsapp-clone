import { ChangeEvent, useRef, useState } from "react";

// ** Stores
import { useUserStore } from "../../../../store/use-user-store";
import { useProfilePhotoDialogs } from "../../../../store/use-profile-photo-dialogs";

// ** Utils
import uploadStorage from "../../../../lib/firebase/uploadStorage";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Icons
import { MdCheck } from "react-icons/md";

// ** Custom Components
import PhotoDialog from "../photo-dialog";

const UploadPhotoDialog = () => {
  // ** States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ** Refs
  const uploadPhotoRef = useRef<HTMLInputElement>(null);

  // ** Stores
  const { setShowUploadDialog, avatar, setAvatar } = useProfilePhotoDialogs();
  const { changeUserProfileInfo } = useUserStore();

  const handleClickUpload = () => {
    uploadPhotoRef.current?.click();
  };

  const handleSelectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (!e.target.files[0].type.includes("image"))
      return toast.error("File is not an image");

    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });

    setShowUploadDialog(true);
  };

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
      <PhotoDialog
        onClose={() => setShowUploadDialog(false)}
        header={{
          title: "Drag the image to adjust",
          action: { text: "Upload", handleAction: handleClickUpload },
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

      <input
        ref={uploadPhotoRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleSelectAvatar}
        accept="image/*"
      />
    </>
  );
};

export default UploadPhotoDialog;

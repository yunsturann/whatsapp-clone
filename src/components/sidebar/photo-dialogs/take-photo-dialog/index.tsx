// ** React Imports
import { useEffect, useState } from "react";

// ** Icons
import { FaCamera } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

// ** Stores
import { useProfilePhotoDialogs } from "../../../../store/use-profile-photo-dialogs";
import { useUserStore } from "../../../../store/use-user-store";

// ** Custom Components
import PhotoDialog from "../../left-section/profile/profile-photo/photo-dialog";

// ** Hooks
import useCamera from "../../../../hooks/use-camera";

// ** Third Party Imports
import toast from "react-hot-toast";
import { base64ToFile } from "../../../../lib/utils";
import uploadStorage from "../../../../lib/firebase/uploadStorage";

const TakePhotoDialog = () => {
  // ** States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ** Stores
  const { videoRef, canvasRef, startCamera, takePhoto, photo, reset } =
    useCamera();
  const { setShowTakePhotoDialog } = useProfilePhotoDialogs();
  const { changeUserProfileInfo } = useUserStore();

  useEffect(() => {
    startCamera();
  }, []);

  const handleTakePhoto = () => {
    takePhoto();
  };

  const handleRetake = () => {
    reset();
    startCamera();
  };

  const handleSaveUploadedPhoto = async () => {
    if (!photo) {
      return toast.error("Select a photo!");
    }

    // ** Convert base64 to File
    const avatarFile = base64ToFile(photo, "avatar");

    try {
      setIsSubmitting(true);
      let imgUrl = await uploadStorage(avatarFile, "avatars");

      await changeUserProfileInfo("avatar", imgUrl);

      setShowTakePhotoDialog(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onApprove = photo ? true : false;

  const headerProps = onApprove
    ? {
        title: "Drag the image to adjust",
        action: {
          text: "Retake",
          handleAction: handleRetake,
        },
      }
    : { title: "Take photo" };

  const footerProps = onApprove ? (
    <button
      className="right"
      onClick={handleSaveUploadedPhoto}
      disabled={isSubmitting}
    >
      <MdCheck />
    </button>
  ) : (
    <button className="center" onClick={handleTakePhoto}>
      <FaCamera />
    </button>
  );

  return (
    <PhotoDialog
      onClose={() => setShowTakePhotoDialog(false)}
      header={headerProps}
      footerChildren={footerProps}
    >
      <div>
        {photo ? (
          <img
            src={photo}
            alt="Captured photo "
            style={{ width: "100%", maxWidth: "500px", height: "100%" }}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "100%",
                transform: "scaleX(-1)",
              }}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        )}
      </div>
    </PhotoDialog>
  );
};

export default TakePhotoDialog;

// ** Store
import { useProfilePhotoDialogs } from "../../../store/use-profile-photo-dialogs";

// ** Custom Components
import TakePhotoDialog from "./take-photo-dialog";
import UploadPhotoDialog from "./upload-photo-dialog";

const PhotoDialogs = () => {
  // ** Stores
  const { showUploadDialog, showTakePhotoDialog } = useProfilePhotoDialogs();

  return (
    <>
      {showUploadDialog && <UploadPhotoDialog />}

      {showTakePhotoDialog && <TakePhotoDialog />}
    </>
  );
};

export default PhotoDialogs;

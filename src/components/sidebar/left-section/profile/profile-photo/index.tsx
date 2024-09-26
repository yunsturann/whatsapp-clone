import { ChangeEvent, useRef, useState } from "react";

// ** Icons
import { FaCamera } from "react-icons/fa";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../../../ui/dropdown";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Store
import { useUserStore } from "../../../../../store/use-user-store";
import { useProfilePhotoDialogs } from "../../../../../store/use-profile-photo-dialogs";

const ProfilePhoto = () => {
  // States
  const [showDropdown, setShowDropdown] = useState(false);

  // ** Refs
  const uploadPhotoRef = useRef<HTMLInputElement>(null);

  // ** Stores
  const { currentUser } = useUserStore();
  const { setShowUploadDialog, setAvatar } = useProfilePhotoDialogs();

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

  return (
    <div className="avatar-container">
      {/* Avatar & actions */}
      <Dropdown
        isOpen={showDropdown}
        setIsOpen={setShowDropdown}
        triggerElement={
          <div className="avatar">
            <img
              src={currentUser?.avatar || "/images/avatar.png"}
              alt={currentUser?.username + "'s avatar" || "user avatar"}
            />

            {/* Add pp overlay */}
            <div className="pp-overlay">
              <FaCamera />
              <p>
                ADD PROFILE <br /> PHOTO
              </p>
            </div>
          </div>
        }
      >
        <DropdownItem>Take photo</DropdownItem>
        <DropdownItem onClick={handleClickUpload}>Upload photo</DropdownItem>
      </Dropdown>

      <input
        ref={uploadPhotoRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleSelectAvatar}
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePhoto;

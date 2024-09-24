// ** React Imports
import { ChangeEvent, useEffect, useState } from "react";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Store
import { useUserStore } from "../../../../store/use-user-store";

// ** Custom Components
import EditableSection from "./editable-section";

// ** Firebase
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";

// ** Constants
import { initialAvatar } from "../../../../constants";

// ** Icons
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  // States
  const [avatar, setAvatar] = useState(initialAvatar);

  // ** Stores
  const { currentUser, setUserProfile } = useUserStore();

  useEffect(() => {
    currentUser?.avatar && setAvatar({ file: null, url: currentUser.avatar });
  }, [currentUser]);

  const handleSaveContent = async (key: string, value: string) => {
    try {
      const userRef = collection(db, "users");

      await updateDoc(doc(userRef, currentUser?.id), {
        [key]: value,
      });

      setUserProfile(key, value);

      toast.success(`${key} updated successfully`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (!e.target.files[0].type.includes("image"))
      return toast.error("File is not an image");

    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="profile">
      {/* User avatar */}
      <div className="avatar">
        <label htmlFor="profile_avatar">
          {/* Avatar */}
          <img
            src={avatar.url || "/images/avatar.png"}
            alt={currentUser?.username + "'s avatar" || "user avatar"}
          />

          {/* Add pp overlay */}
          <div className="pp-overlay">
            <FaCamera />
            <p>
              ADD PROFILE <br /> PHOTO
            </p>
          </div>
        </label>

        <input
          type="file"
          id="profile_avatar"
          style={{ display: "none" }}
          onChange={handleAvatar}
          accept="image/*"
        />
      </div>

      {/* username */}
      <EditableSection
        title="Your username"
        content={currentUser!.username}
        maxLength={25}
        onSave={(value: string) => handleSaveContent("username", value)}
      />

      {/* Information */}
      <p className="info">
        This is your username. This name is visible to your Whatsapp contacts.
      </p>

      {/* About */}
      <EditableSection
        title="About"
        content={currentUser?.about || ""}
        maxLength={140}
        onSave={(value: string) => handleSaveContent("about", value)}
      />
    </div>
  );
};

export default Profile;

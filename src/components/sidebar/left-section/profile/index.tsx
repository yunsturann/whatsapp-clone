// ** Store
import { useUserStore } from "../../../../store/use-user-store";

// ** Custom Components
import EditableSection from "./editable-section";

// ** Icons
import ProfilePhoto from "./profile-photo";

const Profile = () => {
  // ** Stores
  const { currentUser, changeUserProfileInfo } = useUserStore();

  return (
    <div className="profile">
      {/* User avatar container*/}
      <ProfilePhoto />

      {/* username */}
      <EditableSection
        title="Your username"
        content={currentUser!.username}
        maxLength={25}
        onSave={(value: string) => changeUserProfileInfo("username", value)}
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
        onSave={(value: string) => changeUserProfileInfo("about", value)}
      />
    </div>
  );
};

export default Profile;

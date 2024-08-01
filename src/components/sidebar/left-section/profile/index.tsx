// ** Store
import toast from "react-hot-toast";
import { useUserStore } from "../../../../store/use-user-store";

// ** Custom Components
import EditableSection from "./editable-section";

// ** Firebase
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";

const Profile = () => {
  // ** Stores
  const currentUser = useUserStore((state) => state.currentUser);

  const handleSaveContent = async (key: string, value: string) => {
    try {
      const userRef = collection(db, "users");

      await updateDoc(doc(userRef, currentUser?.id), {
        [key]: value,
      });

      toast.success(`${key} updated successfully`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="profile">
      {/* User avatar */}
      <div className="avatar">
        <img
          src={currentUser?.avatar || "/images/avatar.png"}
          alt={currentUser?.username + "'s avatar" || "user avatar"}
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

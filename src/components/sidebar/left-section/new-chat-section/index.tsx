// ** React Imports
import { useCallback, useEffect, useState } from "react";

// ** Icons
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

// ** Firebase
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";
import toast from "react-hot-toast";
import { IUser } from "../../../../types";
import { useUserStore } from "../../../../store/use-user-store";

const NewChatSection = () => {
  const { currentUser } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState<IUser | null>(null);

  // ** Fetch Users
  const fetchUsers = useCallback(async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", searchTerm));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return setSearchedUser(null);

      setSearchedUser(querySnapshot.docs[0].data() as IUser);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    // debounce the search
    const timeoutId = setTimeout(() => fetchUsers(), 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchUsers]);

  // ** Add User
  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const chatListRef = collection(db, "chatlist");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // update chatlist of chat user then update chatlist of current user
      await Promise.all([
        await updateDoc(doc(chatListRef, currentUser?.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: searchedUser?.id,
            updatedAt: Date.now(),
          }),
        }),
        await updateDoc(doc(chatListRef, searchedUser?.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser?.id,
            updatedAt: Date.now(),
          }),
        }),
      ]);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="new-chat-section">
      {/* search input */}
      <div className="search">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <IoCloseOutline
            className="x-icon"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      <h3>CONTACTS ON WHATSAPP</h3>

      {/* User */}
      {searchedUser && (
        <div className="user">
          <img
            src={searchedUser.avatar || "/images/avatar.png"}
            alt={searchedUser.username + "'s avatar" || "avatar"}
          />
          <div className="texts">
            <h4>{searchedUser.username}</h4>
            <p>about mee</p>
          </div>
          <button onClick={handleAddUser}>Add</button>
        </div>
      )}
    </div>
  );
};

export default NewChatSection;

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
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";

// ** Types
import { IChatList, IUser } from "../../../../types";

// ** Store
import { useUserStore } from "../../../../store/use-user-store";

// ** Third Party Components
import toast from "react-hot-toast";

const NewChatSection = () => {
  const { currentUser } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState<IUser | null>(null);
  const [isLoadingAddUser, setIsLoadingAddUser] = useState(false);

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
    if (!searchTerm.trim()) {
      setSearchedUser(null);
      return;
    }

    // debounce the search
    const timeoutId = setTimeout(() => fetchUsers(), 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchUsers]);

  // ** Add User
  const handleAddUser = async () => {
    if (currentUser === null || searchedUser === null)
      return toast.error("User not found");

    setIsLoadingAddUser(true);

    const chatRef = collection(db, "chats");
    const chatListRef = collection(db, "chatlist");

    try {
      const newChatRef = doc(chatRef);

      // check if chat already exists
      const currentChatListSnap = await getDoc(
        doc(db, "chatlist", currentUser.id)
      );

      if (!currentChatListSnap.exists())
        throw new Error("Current user chatlist not found");

      const currentChatList = currentChatListSnap.data() as IChatList;

      const chatExists = currentChatList.chats.some(
        (chat) => chat.receiverId === searchedUser.id
      );

      if (chatExists) return toast.error("Chat already exists");

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // update chatlist of chat user then update chatlist of current user
      await Promise.all([
        updateDoc(doc(chatListRef, currentUser?.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: searchedUser?.id,
            updatedAt: Date.now(),
          }),
        }),
        updateDoc(doc(chatListRef, searchedUser?.id), {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser?.id,
            updatedAt: Date.now(),
          }),
        }),
      ]);

      toast.success("User added successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoadingAddUser(false);
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
            <h4 className="line-clamp-1">{searchedUser.username}</h4>
            <p className="line-clamp-1">
              about mee Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium perspiciatis assumenda sit natus eius, necessitatibus
              porro in cumque unde nam.
            </p>
          </div>
          <button onClick={handleAddUser} disabled={isLoadingAddUser}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default NewChatSection;

// ** React Imports
import { useEffect, useState } from "react";

// ** Store
import { useUserStore } from "../../../store/use-user-store";

// ** Firebase Imports
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";

// ** Types
import { IChatList, IChatListData } from "../../../types";

// ** Custom Components
import ChatListItem from "./chat-list-item";

const ChatList = () => {
  // ** States
  const [chatListData, setChatListData] = useState<IChatListData[]>([]);

  // ** Store
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(db, "chatlist", currentUser.id),
      async (response) => {
        const items = response.data() as IChatList;

        const promises = items.chats.map(async (item) => {
          const userRef = doc(db, "users", item.receiverId);
          const userSnap = await getDoc(userRef);

          return {
            ...item,
            user: userSnap.data(),
          } as IChatListData;
        });

        const chatListData = await Promise.all(promises);

        setChatListData(chatListData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => unSub();
  }, [currentUser?.id]);

  return (
    <ul className="chat-list">
      {chatListData.map((item) => (
        <ChatListItem key={item.chatId} chatData={item} />
      ))}
    </ul>
  );
};

export default ChatList;

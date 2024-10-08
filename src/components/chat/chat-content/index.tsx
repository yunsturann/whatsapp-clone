/* eslint-disable react-refresh/only-export-components */

import "./chat-content.css";

// ** React Imports
import { memo, useEffect, useRef, useState } from "react";

// ** Custom Components
import MessageItem from "./message-item";
import { useChatStore } from "../../../store/use-chat-store";
import { useUserStore } from "../../../store/use-user-store";

// ** Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";

// ** Types
import { IChat } from "../../../types";

const ChatContent = () => {
  // ** States
  const [chat, setChat] = useState<IChat | null>(null);

  // ** Refs
  const chatEnd = useRef<HTMLDivElement | null>(null);

  // ** Stores
  const chatId = useChatStore((state) => state.chatId);
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    // ** Go to end of the chat
    chatEnd.current?.scrollIntoView({ behavior: "instant" });
  }, [chat]);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
      setChat(response.data() as IChat);
    });

    return () => unSub();
  }, [chatId]);

  return (
    <div className="chat-content">
      {chat?.messages.map((message) => (
        <MessageItem
          key={message.createdAt.seconds}
          isOwn={currentUser?.id === message.senderId}
          message={message}
        />
      ))}

      {/* End of the Chat */}
      <div ref={chatEnd} />
    </div>
  );
};

export default memo(ChatContent);

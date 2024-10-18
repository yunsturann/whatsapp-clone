/* eslint-disable react-refresh/only-export-components */

import "./chat-content.css";

// ** React Imports
import { memo, useEffect, useRef } from "react";

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
  // ** Refs
  const chatEnd = useRef<HTMLDivElement | null>(null);

  // ** Stores
  const { chatId, messages, setMessages } = useChatStore();
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    // ** Go to end of the chat
    chatEnd.current?.scrollIntoView({ behavior: "instant" });
  }, [chatId, messages]);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), (response) => {
      const messageData = response.data() as IChat;
      setMessages(messageData.messages);
    });

    return () => unSub();
  }, [chatId, setMessages]);

  return (
    <div className="chat-content">
      {messages.map((message) => (
        <MessageItem
          key={message.createdAt.toString()}
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

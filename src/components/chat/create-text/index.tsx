/* eslint-disable react-refresh/only-export-components */

import "./create-text.css";

// ** React Imports
import { FormEvent, memo, useState } from "react";

// ** Third Party Libs
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import toast from "react-hot-toast";

// ** Icons
import { BsEmojiSmile } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// ** Store
import { useChatStore } from "../../../store/use-chat-store";

// ** Firebase
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useUserStore } from "../../../store/use-user-store";
import { IChatList } from "../../../types";

const CreateText = () => {
  // ** States
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ** Stores
  const currentUser = useUserStore((state) => state.currentUser);
  const { chatId, chatUser } = useChatStore();

  const handleSelectedEmoji = (e: EmojiClickData) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return toast.error("Please enter a message");
    if (!chatUser || !chatId || !currentUser)
      return toast.error("Chat not found. Please try again");

    try {
      // ** Update the chat
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          text,
          senderId: currentUser.id,
          createdAt: new Date(),
          //! TODO: Add the img if exists
        }),
      });

      // ** Update users' chat list

      const userIDS = [currentUser.id, chatUser.id];

      userIDS.forEach(async (id) => {
        const chatlistRef = doc(db, "chatlist", id);

        const chatlistSnap = await getDoc(chatlistRef);

        if (!chatlistSnap.exists()) return;

        const chatlistData = chatlistSnap.data() as IChatList;

        const chatIndex = chatlistData.chats.findIndex(
          (chat) => chat.chatId === chatId
        );

        chatlistData.chats[chatIndex].lastMessage = text;
        chatlistData.chats[chatIndex].updatedAt = Date.now();
        chatlistData.chats[chatIndex].isSeen = id === currentUser.id;

        await updateDoc(chatlistRef, {
          chats: chatlistData.chats,
        });
      });

      // ** Reset the text
      setText("");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="create-text">
      {/* icons emoji & attach */}

      <div className="emoji-picker-wrapper">
        {/* Close icon */}
        <div
          className="icon"
          style={{ display: showEmojiPicker ? "block" : "none" }}
          onClick={() => setShowEmojiPicker(false)}
        >
          <MdClose />
        </div>
        {/* Open icon */}
        <div
          className="icon"
          style={{ color: showEmojiPicker ? "#00a884" : "" }}
          onClick={() => setShowEmojiPicker(true)}
        >
          <BsEmojiSmile />
        </div>

        {/* Emoji Picker */}
        <div className="picker">
          <EmojiPicker
            open={showEmojiPicker}
            onEmojiClick={handleSelectedEmoji}
          />
        </div>
      </div>

      <div className="icon">
        <FaPlus />
      </div>

      {/* input area */}

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder="Type a message"
        />

        <button type="submit" className="icon" aria-label="Send Message">
          <IoSend />
        </button>
      </form>

      {/* send and mic icon */}
    </div>
  );
};

export default memo(CreateText);

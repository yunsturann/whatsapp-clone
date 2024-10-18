/* eslint-disable react-refresh/only-export-components */

import "./create-message.css";

// ** React Imports
import { FormEvent, memo, useState } from "react";

// ** Third Party Libs
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import toast from "react-hot-toast";

// ** Icons
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// ** Store
import { useCreateMessage } from "../../../store/use-create-message";

// ** Custom Components
import AttachDropdown from "./attach-dropdown";

const CreateMessage = () => {
  // ** States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ** Stores
  const { text, setText, isSubmitting, sendMessage } = useCreateMessage();

  const handleSelectedEmoji = (e: EmojiClickData) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return toast.error("Please enter a message");

    sendMessage(text);
  };

  return (
    <div className="create-message">
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

      {/* Attach */}
      <AttachDropdown />

      {/* Input area */}

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder="Type a message"
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="icon"
          aria-label="Send Message"
          disabled={isSubmitting}
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default memo(CreateMessage);

// ** React Imports
import { FormEvent, useState } from "react";

// ** Third Party Libs
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

// ** Icons
import { BsEmojiSmile } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const CreateText = () => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSelectedEmoji = (e: EmojiClickData) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder="Type a message"
        />

        <button type="submit" className="icon">
          <IoSend />
        </button>
      </form>

      {/* send and mic icon */}
    </div>
  );
};

export default CreateText;

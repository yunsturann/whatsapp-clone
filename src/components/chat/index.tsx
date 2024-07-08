import "./chat.css";

import { FaLock } from "react-icons/fa";

const Chat = () => {
  const user = false;

  return (
    <div className="chat-section">
      {user ? (
        <div></div>
      ) : (
        <div className="without-chat">
          <img src="/images/noChat.png" alt="" />
          <header>
            <h1>Download WhatsApp for Windows</h1>
            <p>
              Make calls, share your screen and get a faster experience when you
              download the <br /> Windows app.
            </p>
          </header>

          <button>Get from Microsoft Store</button>

          <footer>
            <FaLock />
            Your personal messages are end-to-end encrypted
          </footer>
        </div>
      )}
    </div>
  );
};

export default Chat;

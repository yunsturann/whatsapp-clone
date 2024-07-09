import ChatContent from "./chat-content";
import ChatUserDetail from "./chat-user-detail";
import "./chat.css";
import CreateText from "./create-text";
import WithoutChat from "./without-chat";

const Chat = () => {
  const user = true;

  return (
    <div className="chat-section">
      {user ? (
        <div className="with-chat">
          <ChatUserDetail />
          <ChatContent />
          <CreateText />
        </div>
      ) : (
        <WithoutChat />
      )}
    </div>
  );
};

export default Chat;

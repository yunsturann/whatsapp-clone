import "./chat.css";

// ** Custom Components
import ChatContent from "./chat-content";
import ChatUserDetail from "./chat-user-detail";
import CreateText from "./create-text";
import WithoutChat from "./without-chat";
import RightSection from "./right-section";
import { useRightbarOptions } from "../../store/use-rightbar-options";

const Chat = () => {
  const currentUser = true;
  // const chatUser = true;

  const rightIsOpen = useRightbarOptions((state) => state.isOpen);
  const rightSectionProps = useRightbarOptions(
    (state) => state.rightSectionProps
  );

  return (
    <div className="chat-section">
      {currentUser ? (
        <div className="with-chat">
          <ChatUserDetail />
          <ChatContent />
          <CreateText />
        </div>
      ) : (
        <WithoutChat />
      )}
      {rightIsOpen && <RightSection {...rightSectionProps} />}
    </div>
  );
};

export default Chat;

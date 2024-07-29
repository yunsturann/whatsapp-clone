import "./chat.css";

// ** Store
import { useRightbarOptions } from "../../store/use-rightbar-options";
import { useChatStore } from "../../store/use-chat-store";

// ** Custom Components
import ChatContent from "./chat-content";
import ChatUserDetail from "./chat-user-detail";
import CreateText from "./create-text";
import WithoutChat from "./without-chat";
import RightSection from "./right-section";

const Chat = () => {
  const chatId = useChatStore((state) => state.chatId);
  const rightIsOpen = useRightbarOptions((state) => state.isOpen);
  const rightSectionProps = useRightbarOptions(
    (state) => state.rightSectionProps
  );

  return (
    <div className="chat-section">
      {chatId ? (
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

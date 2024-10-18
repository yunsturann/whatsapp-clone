import "./chat.css";

// ** Store
import { useRightbarOptions } from "../../store/use-rightbar-options";
import { useChatStore } from "../../store/use-chat-store";
import { useFileDialog } from "../../store/use-upload-file-dialog";

// ** Custom Components
import ChatContent from "./chat-content";
import ChatUserDetail from "./chat-user-detail";
import CreateMessage from "./create-message";
import WithoutChat from "./without-chat";
import RightSection from "./right-section";
import UploadFileDialog from "./upload-file-dialog";

const Chat = () => {
  const chatId = useChatStore((state) => state.chatId);
  const { isOpen: rightIsOpen, rightSectionProps } = useRightbarOptions();
  const { selectedFiles } = useFileDialog();

  return (
    <div className="chat-section">
      {chatId ? (
        <div className="with-chat">
          <ChatUserDetail />
          <ChatContent />
          <CreateMessage />
        </div>
      ) : (
        <WithoutChat />
      )}
      {rightIsOpen && <RightSection {...rightSectionProps} />}
      {selectedFiles.length > 0 && <UploadFileDialog />}
    </div>
  );
};

export default Chat;

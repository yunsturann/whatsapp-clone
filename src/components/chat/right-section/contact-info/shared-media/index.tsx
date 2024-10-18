import "./shared-media.css";

// ** Icons
import { IoChevronForwardOutline } from "react-icons/io5";

// ** Stores
import { useChatStore } from "../../../../../store/use-chat-store";
import { useShowFileDialog } from "../../../../../store/use-show-file-dialog";

const SharedMedia = () => {
  // ** Stores
  const messages = useChatStore((state) => state.messages);
  const setSelectedFile = useShowFileDialog((state) => state.setSelectedFile);

  // ** Variables
  const chatImages = messages.filter((message) => message.img);
  const lastThreeImages = chatImages.slice(-3);

  return (
    <div className="shared-media">
      <div className="header">
        <h4>Media, links and docs</h4>
        <div className="right">
          <div>{chatImages.length}</div>
          <IoChevronForwardOutline />
        </div>
      </div>

      {/* Media Preview */}
      <div className="media-preview">
        {lastThreeImages.map((item) => (
          <div
            key={item.createdAt.seconds.toString()}
            className="preview-item"
            onClick={() => setSelectedFile(item)}
          >
            <img src={item.img} alt={`Sended image`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedMedia;

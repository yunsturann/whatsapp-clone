import "./shared-media.css";

// ** Icons
import { IoChevronForwardOutline } from "react-icons/io5";

// ** Stores
import { useChatStore } from "../../../../../store/use-chat-store";

const SharedMedia = () => {
  // ** Stores
  const messages = useChatStore((state) => state.messages);

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
          <div key={item.createdAt.toString()} className="preview-item">
            <img src={item.img} alt={`Sended image`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedMedia;

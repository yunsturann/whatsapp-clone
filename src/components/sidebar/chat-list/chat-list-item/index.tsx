// ** React Imports
import { MouseEvent, useState } from "react";

// ** Icons
import { IoChevronDown } from "react-icons/io5";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../../ui/dropdown";
import { IChatListData } from "../../../../types";
import { useChatStore } from "../../../../store/use-chat-store";

interface ChatListItemProps {
  chatData: IChatListData;
}

const calculateLastMessageTime = (lastMessageTime: number) => {
  const currentTime = new Date().getTime();
  const diff = currentTime - lastMessageTime;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatData } = props;

  // ** States
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  // ** Store
  const { setChat } = useChatStore();

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.add("show");
  };

  const handleMouseLeave = (e: MouseEvent<HTMLLIElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.remove("show");
  };

  const handleSelectChat = () => {
    setChat(chatData.chatId, chatData.user);
  };

  return (
    <li
      className="chat-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelectChat}
    >
      <img src={chatData.user.avatar || "/images/avatar.png"} alt="" />

      <div className="content">
        <div className="row title">
          <h2>{chatData.user.username}</h2>
          <p>{calculateLastMessageTime(chatData.updatedAt)}</p>
        </div>
        <div className="row actions">
          <p className="line-clamp-1">{chatData.lastMessage}</p>
          <Dropdown
            isOpen={isOpenDropdown}
            setIsOpen={setIsOpenDropdown}
            triggerElement={<IoChevronDown className="icon action" />}
          >
            <DropdownItem>Archive chat</DropdownItem>
            <DropdownItem>Mute notifications</DropdownItem>
            <DropdownItem>Delete chat</DropdownItem>
            <DropdownItem>Pin chat</DropdownItem>
            <DropdownItem>Mark as unread</DropdownItem>
            <DropdownItem>Block</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </li>
  );
};

export default ChatListItem;

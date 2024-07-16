// ** React Imports
import { MouseEvent, useState } from "react";

// ** Icons
import { IoChevronDown } from "react-icons/io5";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../../ui/dropdown";

interface ChatListItemProps {}

const ChatListItem = (props: ChatListItemProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.add("show");
  };

  const handleMouseLeave = (e: MouseEvent<HTMLLIElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.remove("show");
  };
  return (
    <li
      className="chat-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/images/avatar.png" alt="" />

      <div className="content">
        <div className="row title">
          <h2>John Doe</h2>
          <p>Yesterday</p>
        </div>
        <div className="row actions">
          <p className="line-clamp-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            quos excepturi ullam architecto sint eum asperiores est nihil fugiat
            veniam.
          </p>
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

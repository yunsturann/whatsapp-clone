// ** React Imports
import { MouseEvent, useState } from "react";

// ** Icons
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../../ui/dropdown";

// ** Types
import { IMessage } from "../../../../types";

interface MessageItemProps {
  message: IMessage;
  isOwn: boolean;
}

const MessageItem = (props: MessageItemProps) => {
  const { isOwn, message } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.add("show");
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const actionElement = e.currentTarget.querySelector(".action");

    actionElement?.classList.remove("show");
  };

  return (
    <div className="message-item">
      <div
        className={isOwn ? "content own" : "content"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {message.img && <img src={message.img} alt="Message file" />}
        <p>{message.text}</p>

        <div className="detail">
          <span>10:42 AM</span>
          {isOwn && <RiCheckDoubleFill />}
        </div>
        <Dropdown
          isOpen={showDropdown}
          setIsOpen={setShowDropdown}
          triggerElement={
            <div
              className="action"
              style={{ backgroundColor: isOwn ? "#d9fdd3" : "#ffffff" }}
            >
              <IoChevronDown />
            </div>
          }
        >
          <DropdownItem>Message info</DropdownItem>
          <DropdownItem>Reply</DropdownItem>
          <DropdownItem>React</DropdownItem>
          <DropdownItem>Forward</DropdownItem>
          <DropdownItem>Pin</DropdownItem>
          <DropdownItem>Star</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

export default MessageItem;

// ** React Imports
import { MouseEvent, useState } from "react";

// ** Icons
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../../ui/dropdown";

// ** Types
import { IMessage } from "../../../../types";

// ** Hooks
import useLineCount from "../../../../hooks/use-line-count";
import classNames from "classnames";
import { formatFirestoreTimestampToTime } from "../../../../lib/utils";

interface MessageItemProps {
  message: IMessage;
  isOwn: boolean;
}

const MessageItem = (props: MessageItemProps) => {
  const { isOwn, message } = props;

  // ** States
  const [showDropdown, setShowDropdown] = useState(false);

  // ** Hooks
  const { lineCount, ref } = useLineCount();

  // ** Variables
  const isOneLine = lineCount === 1;
  const hasImage = message.img ? true : false;
  const time = formatFirestoreTimestampToTime(message.createdAt);

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
        className={classNames({
          content: true,
          own: isOwn,
          "has-image": hasImage,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasImage && (
          <div className="img-container">
            <img src={message.img} alt="Message file" />

            {message.text.length === 0 && (
              <div className="detail in-image">
                <span>{time}</span>
                {isOwn && <RiCheckDoubleFill />}
              </div>
            )}
          </div>
        )}

        {message.text && (
          <div
            className="text-wrapper"
            style={
              isOneLine ? { paddingRight: "80px" } : { paddingBottom: "18px" }
            }
          >
            <p ref={ref}>{message.text}</p>
            <div className="detail">
              <span>{time}</span>
              {isOwn && <RiCheckDoubleFill />}
            </div>
          </div>
        )}

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

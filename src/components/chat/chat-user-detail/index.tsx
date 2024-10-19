/* eslint-disable react-refresh/only-export-components */

import "./chat-user-detail.css";

import { memo, useEffect, useState } from "react";

// ** Icons
import { GrSearch } from "react-icons/gr";

// ** Store
import { useRightbarOptions } from "../../../store/use-rightbar-options";
import { useChatStore } from "../../../store/use-chat-store";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../ui/dropdown";
import ContactInfo from "../right-section/contact-info";
import SearchMessages from "../right-section/search-messages";

const ChatUserDetail = () => {
  // ** States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(true);

  // ** Stores
  const { setIsOpen: setIsRightSectionOpen, setRightSectionProps } =
    useRightbarOptions();
  const { resetChat, chatUser } = useChatStore();

  useEffect(() => {
    const timer = setTimeout(() => setShowContactInfo(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactInfo = () => {
    setIsMenuOpen(false);

    setIsRightSectionOpen(true);

    setRightSectionProps({
      title: "Contact info",
      children: <ContactInfo />,
    });
  };

  const handleSearchMessages = () => {
    setIsMenuOpen(false);

    setIsRightSectionOpen(true);

    setRightSectionProps({
      title: "Search messages",
      children: <SearchMessages />,
    });
  };

  return (
    <div className="chat-user-detail">
      <div className="user-info" onClick={handleContactInfo}>
        {/* chat user avatar */}
        <img
          src={chatUser?.avatar || "/images/avatar.png"}
          alt={chatUser?.username + "'s avatar" || "user avatar"}
        />

        <div className="username">
          <h2>{chatUser?.username}</h2>
          {showContactInfo && <p>click here for contact info</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        {/* Camera Call */}

        {/* Search Icon to Open rightbar */}
        <div className="action-icon" onClick={handleSearchMessages}>
          <GrSearch />
        </div>

        {/* Menu */}
        <Dropdown isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
          <DropdownItem onClick={handleContactInfo}>Contact info</DropdownItem>
          <DropdownItem>Select messages</DropdownItem>
          <DropdownItem
            onClick={() => {
              resetChat();
              setIsMenuOpen(false);
            }}
          >
            Close chat
          </DropdownItem>
          <DropdownItem>Mute notifications</DropdownItem>
          <DropdownItem>Clear chat</DropdownItem>
          <DropdownItem>Delete chat</DropdownItem>
          <DropdownItem>Report</DropdownItem>
          <DropdownItem>Block</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

export default memo(ChatUserDetail);

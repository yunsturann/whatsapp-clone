import { useEffect, useState } from "react";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../ui/dropdown";

// ** Icons
import { GrSearch } from "react-icons/gr";

const ChatUserDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowContactInfo(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chat-user-detail">
      <div className="user-info">
        {/* chat user avatar */}
        <img src="/images/avatar.png" alt="" />

        <div className="username">
          <h2>John Doe</h2>
          {showContactInfo && <p>click here for contact info</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        {/* Camera Call */}

        {/* Search Icon to Open rightbar */}
        <div className="action-icon">
          <GrSearch />
        </div>

        {/* Menu */}
        <Dropdown isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
          <DropdownItem>Contact info</DropdownItem>
          <DropdownItem>Select messages</DropdownItem>
          <DropdownItem>Close chat</DropdownItem>
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

export default ChatUserDetail;

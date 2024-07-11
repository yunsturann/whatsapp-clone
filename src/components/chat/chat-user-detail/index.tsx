import { useEffect, useState } from "react";

// ** Icons
import { GrSearch } from "react-icons/gr";

// ** Store
import { useRightbarOptions } from "../../../store/use-rightbar-options";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../ui/dropdown";
import ContactInfo from "../right-section/contact-info";
import SearchMessages from "../right-section/search-messages";

const ChatUserDetail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(true);

  const setIsRightbarOpen = useRightbarOptions((state) => state.setIsOpen);
  const setRightbarProps = useRightbarOptions(
    (state) => state.setRightSectionProps
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowContactInfo(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactInfo = () => {
    setIsRightbarOpen(true);

    setRightbarProps({
      title: "Contact info",
      children: <ContactInfo />,
    });
  };

  const handleSearchMessages = () => {
    setIsRightbarOpen(true);

    setRightbarProps({
      title: "Search messages",
      children: <SearchMessages />,
    });
  };

  return (
    <div className="chat-user-detail">
      <div className="user-info" onClick={handleContactInfo}>
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
        <div className="action-icon" onClick={handleSearchMessages}>
          <GrSearch />
        </div>

        {/* Menu */}
        <Dropdown isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
          <DropdownItem onClick={handleContactInfo}>Contact info</DropdownItem>
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

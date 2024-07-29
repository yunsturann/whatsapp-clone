// ** React Imports
import { useState } from "react";

// ** Icons
import { RiChatNewLine } from "react-icons/ri";
import { HiOutlineStatusOnline } from "react-icons/hi";

// ** Firebase
import { auth } from "../../../config/firebase";

// ** Store
import { useLeftbarOptions } from "../../../store/use-leftbar-options";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../ui/dropdown";
import NewChatSection from "../left-section/new-chat-section";
import { useUserStore } from "../../../store/use-user-store";

const Navbar = () => {
  // ** States
  const [menuDropdown, setMenuDropdown] = useState(false);

  // ** Store
  const { setOptions } = useLeftbarOptions();
  const currentUser = useUserStore((state) => state.currentUser);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleNewChatSection = () => {
    setOptions({
      isOpen: true,
      props: {
        title: "New chat",
        children: <NewChatSection />,
      },
    });
  };

  return (
    <div className="navbar">
      {/* avatar */}
      <img
        src={currentUser?.avatar || "/images/avatar.png"}
        alt={currentUser?.username + "'s avatar" || "user avatar"}
      />
      {/* navigators*/}

      <ul>
        {/* Status */}
        <li className="action-icon" title="Status">
          <HiOutlineStatusOnline />
        </li>

        {/* New chat */}
        <li
          className="action-icon"
          title="New chat"
          onClick={handleNewChatSection}
        >
          <RiChatNewLine />
        </li>

        <li title="Menu">
          <Dropdown isOpen={menuDropdown} setIsOpen={setMenuDropdown}>
            <DropdownItem>New group</DropdownItem>
            <DropdownItem>New community</DropdownItem>
            <DropdownItem>Archived</DropdownItem>
            <DropdownItem>Starred messages</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            <hr />
            <DropdownItem>Get Whatsapp for Windows</DropdownItem>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

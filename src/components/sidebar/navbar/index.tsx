// ** React Imports
import { useState } from "react";

// ** Custom Components
import Dropdown, { DropdownItem } from "../../ui/dropdown";

import { RiChatNewLine } from "react-icons/ri";

const Navbar = () => {
  const [menuDropdown, setMenuDropdown] = useState(false);

  return (
    <div className="navbar">
      {/* avatar */}
      <img src="/images/avatar.png" alt="" />
      {/* navigators*/}

      <ul>
        <li className="action-icon">
          <RiChatNewLine />
        </li>

        <li>
          <Dropdown isOpen={menuDropdown} setIsOpen={setMenuDropdown}>
            <DropdownItem>New group</DropdownItem>
            <DropdownItem>New community</DropdownItem>
            <DropdownItem>Archived</DropdownItem>
            <DropdownItem>Starred messages</DropdownItem>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

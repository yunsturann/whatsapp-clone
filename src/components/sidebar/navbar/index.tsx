import { FaEllipsisVertical } from "react-icons/fa6";
import { RiChatNewLine } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* avatar */}
      <img src="/images/avatar.png" alt="" />
      {/* navigators*/}

      <ul>
        <li>
          <RiChatNewLine />
        </li>
        <li>
          <FaEllipsisVertical />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

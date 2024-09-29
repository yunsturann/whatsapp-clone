import "./attach-dropdown.css";

import { useRef } from "react";

// ** Icons
import { FaPhotoVideo } from "react-icons/fa";
import { FaCamera, FaPlus } from "react-icons/fa6";
import useClickOutside from "../../../../hooks/use-click-outside";

const AttachDropdown = () => {
  // ** Refs
  const attachIconRef = useRef<HTMLSpanElement>(null);
  const attachDropdownRef = useRef<HTMLUListElement>(null);
  const attachContainer = useRef<HTMLDivElement>(null);

  const handleClickAttach = () => {
    attachIconRef.current?.classList.toggle("active");
    attachDropdownRef.current?.classList.toggle("open");
    attachDropdownRef.current?.classList.toggle("close");
  };

  useClickOutside(attachContainer, () => {
    if (attachDropdownRef.current?.classList.contains("open")) {
      handleClickAttach();
    }
  });

  return (
    <div ref={attachContainer} className="attach-dropdown-container">
      <span
        ref={attachIconRef}
        className="action-icon"
        onClick={handleClickAttach}
      >
        <FaPlus />
      </span>

      {/* Animated Dropdown */}
      <ul ref={attachDropdownRef} className="attach-dropdown close">
        <li>
          <FaPhotoVideo style={{ color: "#2563eb" }} />
          <p>Photos & videos</p>
        </li>
        <li>
          <FaCamera style={{ color: "#f43f5e" }} />
          <p> Camera</p>
        </li>
      </ul>
    </div>
  );
};

export default AttachDropdown;

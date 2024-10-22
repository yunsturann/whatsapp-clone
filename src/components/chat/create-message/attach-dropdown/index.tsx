import "./attach-dropdown.css";

import { useRef } from "react";

// ** Icons
import { FaPhotoVideo } from "react-icons/fa";
import { FaCamera, FaPlus } from "react-icons/fa6";

// ** Hooks
import useClickOutside from "../../../../hooks/use-click-outside";

// ** Store
import { useFileDialog } from "../../../../store/use-upload-file-dialog";

const AttachDropdown = () => {
  // ** Refs
  const attachIconRef = useRef<HTMLSpanElement>(null);
  const attachDropdownRef = useRef<HTMLUListElement>(null);
  const attachContainer = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // ** Stores
  const { setSelectedFiles } = useFileDialog();

  // ** Hooks
  useClickOutside(attachContainer, () => {
    if (attachDropdownRef.current?.classList.contains("open")) {
      handleClickAttach();
    }
  });

  // ** Open And Close
  const handleClickAttach = () => {
    attachIconRef.current?.classList.toggle("active");

    const isOpen = attachDropdownRef.current?.classList.contains("open");
    attachDropdownRef.current?.classList.toggle("open", !isOpen);
    attachDropdownRef.current?.classList.toggle("close", isOpen);
  };

  const handlePhotosAndVideos = () => {
    inputFileRef.current?.click();
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedFiles(selectedFiles);
  };

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
      <ul ref={attachDropdownRef} className="attach-dropdown">
        <li onClick={handlePhotosAndVideos}>
          <FaPhotoVideo style={{ color: "#2563eb" }} />
          <p>Photos & videos</p>
          <input
            ref={inputFileRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            multiple
            onChange={handleSelectFiles}
          />
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

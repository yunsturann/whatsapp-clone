// ** React Imports
import { MouseEvent, useState } from "react";

// ** Icons
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const FilterChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("Search");

  const handleSelectChip = (e: MouseEvent<HTMLDivElement>) => {
    const chipBoxes = document.querySelectorAll(".chip-boxes .box");

    chipBoxes.forEach((box) => box.classList.remove("active"));

    e.currentTarget.classList.add("active");

    const chipText = e.currentTarget.textContent?.toLowerCase();

    if (chipText !== "all") {
      setPlaceholder(() => `Search ${chipText} texts`);
    } else {
      setPlaceholder("Search");
    }
  };

  return (
    <div className="filter-chat-list">
      {/* search  */}
      <div className="search">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <IoCloseOutline
            className="x-icon"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      {/* chips such as All, Unread, Groups */}
      <div className="chip-boxes">
        <div className="box active" onClick={handleSelectChip}>
          All
        </div>
        <div className="box" onClick={handleSelectChip}>
          Unread
        </div>
        <div className="box" onClick={handleSelectChip}>
          Groups
        </div>
      </div>
    </div>
  );
};

export default FilterChatList;

import "./filter-chat-list.css";

// ** React Imports
import { MouseEvent, useState } from "react";

// ** Custom Components
import SearchInput from "../../ui/search-input";

const FilterChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("Search");

  const handleSelectChip = (e: MouseEvent<HTMLDivElement>) => {
    const chipBox = document.querySelector(".chip-boxes .box.active");

    chipBox?.classList.remove("active");

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
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClickCloseIcon={() => setSearchTerm("")}
        placeholder={placeholder}
      />

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

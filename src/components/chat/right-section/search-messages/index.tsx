import "./search-messages.css";
// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Icons
import { FaRegCalendar } from "react-icons/fa";

// ** Custom Components
import SearchInput from "../../../ui/search-input";
import FilteredMessageItem from "./filtered-message-item";

// ** Stores
import { useChatStore } from "../../../../store/use-chat-store";

const SearchMessages = () => {
  // ** States
  const [searchTerm, setSearchTerm] = useState("");

  // ** Stores
  const messages = useChatStore((state) => state.messages);

  // ** Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // ** Effects
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ** Variables
  const filteredMessages = searchTerm
    ? messages.filter((message) =>
        message.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="search-messages">
      {/* Input */}
      <div className="inputs-wrapper">
        <span className="date-picker cursor-not-allowed">
          <FaRegCalendar />
        </span>

        <SearchInput
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          onClickCloseIcon={() => setSearchTerm("")}
        />
      </div>

      {filteredMessages.length > 0 ? (
        // Search Results
        <ul>
          {filteredMessages.map((message) => (
            <FilteredMessageItem
              key={message.createdAt.seconds.toString()}
              message={message}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      ) : (
        // User Information Area
        <div className="information">
          <p>Search for messages within Not.</p>
        </div>
      )}
    </div>
  );
};

export default SearchMessages;

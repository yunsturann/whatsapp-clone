import "./filtered-message-item.css";

// ** Icons
import { RiCheckDoubleFill } from "react-icons/ri";

// ** Types
import { IMessage } from "../../../../../types";
import { FaCamera } from "react-icons/fa";

interface FilteredMessageItemProps {
  message: IMessage;
  searchTerm: string;
}

const FilteredMessageItem = (props: FilteredMessageItemProps) => {
  const { message, searchTerm } = props;

  // ** Variables
  const date = new Date(message.createdAt.seconds * 1000);

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="matched-text">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <li className="filtered-message-item">
      {/* Date */}
      <span>{date.toLocaleDateString()}</span>

      {/* Content */}
      <div className="content">
        <RiCheckDoubleFill />

        {message.img ? <FaCamera /> : null}

        <p className="line-clamp-1">
          {highlightText(message.text, searchTerm)}
        </p>
      </div>
    </li>
  );
};

export default FilteredMessageItem;

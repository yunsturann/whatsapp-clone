import "./search-input.css";

// ** React Imports
import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// ** Icons
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClickCloseIcon?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { onClickCloseIcon, value, ...rest } = props;

    // ** States
    const [isFocused, setIsFocused] = useState(false);

    // ** Refs
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleToggleFocus = () => {
      const updatedStatus = !isFocused;

      updatedStatus ? inputRef?.current?.focus() : inputRef.current?.blur();

      setIsFocused(updatedStatus);
    };

    return (
      <div className="search-input">
        {isFocused ? (
          <FaArrowDown className="arrow-icon" onClick={handleToggleFocus} />
        ) : (
          <IoIosSearch className="search-icon" onClick={handleToggleFocus} />
        )}

        <input
          ref={inputRef}
          {...rest}
          type="text"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {value && (
          <IoCloseOutline className="x-icon" onClick={onClickCloseIcon} />
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;

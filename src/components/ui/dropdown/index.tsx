import "./dropdown.css";

// ** React Imports
import { Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react";

// ** Icons
import { FaEllipsisVertical } from "react-icons/fa6";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: "top" | "bottom" | "top-right" | "bottom-right";
  triggerElement?: ReactNode;
  children: ReactNode;
}

const Dropdown = (props: DropdownProps) => {
  const {
    isOpen,
    setIsOpen,
    children,
    triggerElement,
    position = "bottom",
  } = props;

  return (
    <div className="dropdown">
      {/* Trigger Element */}

      <div onClick={() => setIsOpen((prev) => !prev)}>
        {triggerElement || (
          <div className="action-icon">
            <FaEllipsisVertical />
          </div>
        )}
      </div>

      {/* Action Item List */}
      {isOpen && (
        <div className={`wrapper ${position} shadow-left-bottom`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DropdownItem = ({ className, ...rest }: DropdownItemProps) => {
  return <div {...rest} className={className || "dropdown-item"}></div>;
};

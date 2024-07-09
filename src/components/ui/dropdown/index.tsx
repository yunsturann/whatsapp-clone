import "./dropdown.css";

// ** React Imports
import {
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";

// ** Icons
import { FaEllipsisVertical } from "react-icons/fa6";
import useClickOutside from "../../../hooks/shared/use-click-outside";

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

  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="dropdown" ref={ref}>
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
        <div className={`wrapper ${position} shadow-md`}>{children}</div>
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
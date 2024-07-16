import { ReactNode } from "react";

// ** Icons
import { MdClose } from "react-icons/md";
import { useRightbarOptions } from "../../../store/use-rightbar-options";

export interface RightSectionProps {
  title: string;
  children: ReactNode;
}

const RightSection = (props: RightSectionProps) => {
  const { children, title } = props;

  const setIsOpen = useRightbarOptions((state) => state.setIsOpen);

  return (
    <div className="right-section">
      {/* Section header*/}
      <header>
        {/* close icon */}
        <div className="close-icon" onClick={() => setIsOpen(false)}>
          <MdClose />
        </div>

        {/* title */}
        <h2 className="title">{title}</h2>
      </header>
      {children}
    </div>
  );
};

export default RightSection;

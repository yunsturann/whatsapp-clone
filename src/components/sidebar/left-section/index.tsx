import "./left-section.css";

// ** React Imports
import { useEffect } from "react";

// ** Icons
import { FaArrowLeft } from "react-icons/fa6";
import { useLeftbarOptions } from "../../../store/use-leftbar-options";

const LeftSection = () => {
  const { options, setOptions } = useLeftbarOptions();

  useEffect(() => {
    const leftSectionElement = document.getElementById("left-section");

    if (options.isOpen) {
      leftSectionElement?.classList.add("show");
    } else {
      leftSectionElement?.classList.remove("show");
    }
  }, [options]);

  const handleCloseLeftSection = () => {
    setOptions({
      ...options,
      isOpen: false,
    });
  };

  return (
    <div id="left-section">
      <header>
        <div className="header-content">
          <FaArrowLeft onClick={handleCloseLeftSection} />
          <h4>{options.props.title}</h4>
        </div>
      </header>

      <div className="content">{options.props.children}</div>
    </div>
  );
};

export default LeftSection;

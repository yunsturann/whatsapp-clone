import "./content.css";

// ** React Imports
import { useEffect, useMemo, useState } from "react";

// ** Stores
import { useShowFileDialog } from "../../../store/use-show-file-dialog";
import { useChatStore } from "../../../store/use-chat-store";

// ** Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Content = () => {
  // ** Stores
  const { selectedFile, setSelectedFile } = useShowFileDialog();
  const messages = useChatStore((state) => state.messages);

  // ** Variables
  const chatImages = useMemo(
    () => messages.filter((message) => message.img),
    [messages]
  );

  // ** States
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = chatImages.findIndex(
      (message) => message.createdAt.seconds === selectedFile?.createdAt.seconds
    );
    return index === -1 ? 0 : index;
  });

  // ** Effects
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const keyActions: { [key: string]: () => void } = {
        ArrowLeft: handlePrevious,
        ArrowRight: handleNext,
      };

      keyActions[e.key]?.();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handlePrevious = () => {
    const previousIndex = activeIndex <= 0 ? activeIndex : activeIndex - 1;

    setActiveIndex(previousIndex);

    setSelectedFile(chatImages[previousIndex]);
  };

  const handleNext = () => {
    const nextIndex =
      activeIndex + 1 === chatImages.length ? activeIndex : activeIndex + 1;

    setActiveIndex(nextIndex);

    setSelectedFile(chatImages[nextIndex]);
  };

  return (
    <div className="content">
      {/* Previous Button */}
      <div className="btn-container">
        <button
          className="previous"
          aria-label="Previous File Button"
          onClick={handlePrevious}
          disabled={activeIndex <= 0}
        >
          <FaChevronLeft />
        </button>
      </div>

      {/* content */}
      <div className="file-and-text">
        {/* File */}
        <div className="file">
          <div className="wrapper">
            <img src={selectedFile?.img} alt="Selected Photo" />
          </div>
        </div>

        {selectedFile?.text ? <p>{selectedFile?.text}</p> : null}
      </div>

      {/* Next Button */}
      <div className="btn-container">
        <button
          className="next"
          aria-label="Next File Button"
          onClick={handleNext}
          disabled={activeIndex + 1 === chatImages.length}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Content;

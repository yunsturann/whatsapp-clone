import { useEffect, useRef, useState } from "react";

const useLineCount = () => {
  const ref = useRef<HTMLParagraphElement>(null); // Create a reference for the element
  const [lineCount, setLineCount] = useState(0); // State to store the number of lines

  const calculateLineCount = () => {
    const element = ref.current;
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      let lineHeight = parseInt(computedStyle.lineHeight, 10);

      // Fallback if lineHeight is 'normal' or NaN
      if (isNaN(lineHeight)) {
        const fontSize = parseInt(computedStyle.fontSize, 10); // Get the font size
        lineHeight = fontSize * 1.2; // Estimate lineHeight as 1.2x the font size
      }

      const lines = element.offsetHeight / lineHeight;
      setLineCount(Math.round(lines)); // Store the number of lines in state
    }
  };

  useEffect(() => {
    calculateLineCount(); // Calculate line count initially

    // Recalculate on window resize
    const handleResize = () => {
      calculateLineCount();
    };

    window.addEventListener("resize", handleResize); // Listen to window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener
    };
  }, []);

  return { ref, lineCount }; // Return the ref and line count
};

export default useLineCount;

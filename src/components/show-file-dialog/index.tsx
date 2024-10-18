import "./show-file-dialog.css";
// ** React Imports
import { useEffect } from "react";

// ** Custom Components
import DialogHeader from "./dialog-header";
import Content from "./content";

// ** Stores
import { useShowFileDialog } from "../../store/use-show-file-dialog";

const ShowFileDialog = () => {
  // ** Stores
  const { selectedFile, onClose } = useShowFileDialog();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  if (!selectedFile) return null;

  return (
    <div className="show-file-dialog">
      {/* File Dialog Header  */}
      <DialogHeader />

      {/* Content */}
      <Content />

      {/* Bottom  */}
      <div className="bottom"></div>
    </div>
  );
};

export default ShowFileDialog;

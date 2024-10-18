import "./show-file-dialog.css";

// ** Custom Components
import DialogHeader from "./dialog-header";
import Content from "./content";

// ** Stores
import { useShowFileDialog } from "../../store/use-show-file-dialog";

const ShowFileDialog = () => {
  // ** Stores
  const { selectedFile } = useShowFileDialog();

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

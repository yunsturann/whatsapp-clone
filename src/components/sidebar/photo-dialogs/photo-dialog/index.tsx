import "./photo-dialog.css";

// ** Icons
import { LuCornerUpLeft } from "react-icons/lu";
import { MdClose } from "react-icons/md";

interface PhotoDialogProps {
  onClose: () => void;
  header: {
    title: string;
    action?: {
      text: string;
      handleAction: () => void;
    };
  };
  children: React.ReactNode;
  footerChildren?: React.ReactNode;
}

const PhotoDialog = (props: PhotoDialogProps) => {
  const { onClose, header, children, footerChildren } = props;

  return (
    <div className="photo-dialog">
      <div className="inner">
        {/* Header */}
        <header>
          {/* Close Icon*/}
          <span className="close-dialog" onClick={onClose}>
            <MdClose />
          </span>

          {/*  Title*/}
          <h2>{header.title}</h2>

          {/* action */}
          {header.action ? (
            <span className="action" onClick={header.action.handleAction}>
              <LuCornerUpLeft />
              {header.action.text}
            </span>
          ) : null}
        </header>

        {/* Body */}
        <div className="photo-dialog-body">{children}</div>

        {/* footer */}
        <div className="photo-dialog-footer">{footerChildren}</div>
      </div>
    </div>
  );
};

export default PhotoDialog;

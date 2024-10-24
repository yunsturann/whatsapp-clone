import "./dialog-header.css";

// ** Icons
import { LuMessageSquare } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BsEmojiSmile, BsFillPinFill } from "react-icons/bs";
import { RiCloseLargeLine, RiShareForwardFill } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";

// ** Stores
import { useShowFileDialog } from "../../../store/use-show-file-dialog";

const DialogHeader = () => {
  // ** Stores
  const { onClose, selectedFile } = useShowFileDialog();

  if (!selectedFile) return null;

  const formattedDate = new Date(selectedFile.createdAt.seconds * 1000)
    .toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(",", " at");

  return (
    <div className="dialog-header">
      {/* Detail */}
      <div className="detail">
        {/* Sender Avatar */}
        <img src={"/images/avatar.png"} alt="Sender Avatar" />

        {/*  Sender & Submit Time*/}
        <div className="texts">
          <p className="sender">Yunus Turan</p>
          <p className="time">{formattedDate}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <span className="action-icon cursor-not-allowed" title="Go to message">
          <LuMessageSquare />
        </span>

        <span className="action-icon cursor-not-allowed" title="Star">
          <FaStar />
        </span>

        <span className="action-icon cursor-not-allowed" title="Pin">
          <BsFillPinFill />
        </span>

        <span className="action-icon cursor-not-allowed" title="React">
          <BsEmojiSmile />
        </span>

        <span className="action-icon cursor-not-allowed" title="Forward">
          <RiShareForwardFill />
        </span>

        <span className="action-icon cursor-not-allowed" title="Download">
          <IoMdDownload />
        </span>

        <span className="action-icon cursor-not-allowed" title="Menu">
          <FaEllipsisVertical />
        </span>

        <span className="action-icon" onClick={onClose}>
          <RiCloseLargeLine />
        </span>
      </div>
    </div>
  );
};

export default DialogHeader;

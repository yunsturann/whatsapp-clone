import "./upload-file-dialog.css";
// ** React Imports

// ** Constants
import { uploadFileDialogSettings } from "../../../constants";

// ** Icons
import { MdClose } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const UploadFileDialog = () => {
  return (
    <div className="upload-file-dialog">
      {/* settings */}
      <div className="settings">
        {/* Close Icon */}
        <span className="close-icon">
          <MdClose />
        </span>

        {/* Settings */}
        <ul>
          {uploadFileDialogSettings.map((setting, index) => (
            <li key={`${setting.title}-${index}`} title={setting.title}>
              {<setting.Icon />}
            </li>
          ))}
        </ul>
      </div>

      {/* Selected File */}
      <div className="content">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/whatsapp-web-b3525.appspot.com/o/avatars%2FFri%20Sep%2027%202024%2010%3A33%3A42%20GMT%2B0300%20(GMT%2B03%3A00)me1.jpg?alt=media&token=6f527645-d909-4622-95ae-595919e68005"
          alt="Selected File"
        />
      </div>

      {/*  caption container*/}
      <div className="caption-container">
        {/* caption */}
        <div className="caption">
          <input type="text" placeholder="Add a caption" />

          <div className="actions">
            <span aria-label="Clear caption" title="Clear caption">
              <MdClose />
            </span>

            <span aria-label="Open emojis panel" title="Open emojis panel">
              <BsEmojiSmile />
            </span>
          </div>
        </div>
      </div>

      {/*  files and send btn  */}
      <div className="files-and-submit">
        <div className="files">
          {/* selected files */}
          <ul>
            <li className="active">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/whatsapp-web-b3525.appspot.com/o/avatars%2FFri%20Sep%2027%202024%2010%3A33%3A42%20GMT%2B0300%20(GMT%2B03%3A00)me1.jpg?alt=media&token=6f527645-d909-4622-95ae-595919e68005"
                alt="Selected File"
                className="active"
              />
              {/* delete icon */}
            </li>

            {Array.from({ length: 25 }).map((_) => (
              <li>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/whatsapp-web-b3525.appspot.com/o/avatars%2FFri%20Sep%2027%202024%2010%3A33%3A42%20GMT%2B0300%20(GMT%2B03%3A00)me1.jpg?alt=media&token=6f527645-d909-4622-95ae-595919e68005"
                  alt="Selected File"
                />
                {/* delete icon */}
              </li>
            ))}
          </ul>

          {/* add file button */}
          <label
            htmlFor="add-file-button"
            aria-label="Add more file"
            title="Add more file"
          >
            <FaPlus />

            <input
              type="file"
              id="add-file-button"
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* send */}

        <button aria-label="Send files" title="Send files">
          <IoSend />

          <span>12</span>
        </button>
      </div>
    </div>
  );
};

export default UploadFileDialog;

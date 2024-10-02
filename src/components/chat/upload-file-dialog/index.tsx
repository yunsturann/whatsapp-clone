import "./upload-file-dialog.css";

// ** React Imports
import { useRef, useState } from "react";

// ** Constants
import { uploadFileDialogSettings } from "../../../constants";

// ** Icons
import { MdClose } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

// ** Store
import { useFileDialog } from "../../../store/use-file-dialog";

// ** Third Party Imports
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const UploadFileDialog = () => {
  // ** States
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ** Refs
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // ** Stores
  const {
    selectedFiles,
    setSelectedFiles,
    activeIndex,
    setActiveIndex,
    removeSelectedFile,
    setCaption,
    closeFileDialog,
  } = useFileDialog();

  // ** Variables
  const captionText = selectedFiles[activeIndex].caption || "";

  const handleSelectedEmoji = (e: EmojiClickData) => {
    setCaption(captionText + e.emoji);
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const additionalSelectedFiles = Array.from(files).map((file) => ({
      // ** TODO: Add another files preview
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedFiles([...selectedFiles, ...additionalSelectedFiles]);
  };

  console.log(selectedFiles);

  return (
    <div className="upload-file-dialog">
      {/* settings */}
      <div className="settings">
        {/* Close Icon */}
        <span
          aria-label="Close file dialog"
          title="Close file dialog"
          className="close-icon"
          onClick={closeFileDialog}
        >
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
          src={selectedFiles[activeIndex].url}
          alt={selectedFiles[activeIndex].file?.name}
        />
      </div>

      {/*  caption container*/}
      <div className="caption-container">
        {/* caption */}
        <div className="caption">
          <input
            type="text"
            placeholder="Add a caption"
            value={captionText}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="actions">
            {/* clear caption icon */}
            {captionText ? (
              <span
                aria-label="Clear caption"
                title="Clear caption"
                onClick={() => setCaption("")}
              >
                <MdClose />
              </span>
            ) : null}

            {/* add emojis */}

            {/* TODO: USE CLICK OUTSIDE */}
            <span
              aria-label="Open emojis panel"
              title="Open emojis panel"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <BsEmojiSmile />
            </span>

            <div ref={emojiPickerRef} className="emoji-picker">
              <EmojiPicker
                open={showEmojiPicker}
                onEmojiClick={handleSelectedEmoji}
              />
            </div>
          </div>
        </div>
      </div>

      {/*  files and send btn  */}
      <div className="files-and-submit">
        <div className="files">
          {/* selected files */}
          <ul>
            {selectedFiles.map((file, index) => {
              const isActive = activeIndex === index;

              return (
                <li
                  key={file.url}
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                >
                  <img
                    src={file.url}
                    alt={file.file?.name}
                    className={isActive ? "active" : ""}
                  />

                  {/* delete icon */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedFile(index);
                    }}
                  >
                    <MdClose />
                  </span>
                </li>
              );
            })}
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
              multiple
              onChange={handleSelectFiles}
              accept="image/*"
            />
          </label>
        </div>

        {/* send */}

        <button aria-label="Send files" title="Send files">
          <IoSend />

          <span>{selectedFiles.length}</span>
        </button>
      </div>
    </div>
  );
};

export default UploadFileDialog;

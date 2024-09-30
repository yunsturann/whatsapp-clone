import "./upload-file-dialog.css";

// ** Constants
import { uploadFileDialogSettings } from "../../../constants";

// ** Icons
import { MdClose } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

// ** Store
import { useFileDialog } from "../../../store/use-file-dialog";

const UploadFileDialog = () => {
  const {
    selectedFiles,
    setSelectedFiles,
    activeIndex,
    setActiveIndex,
    removeSelectedFile,
  } = useFileDialog();

  const onClose = () => {
    setSelectedFiles([]);
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const additionalSelectedFiles = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      // let preview = url;

      // if (file.type.startsWith("text/")) {
      //   const reader = new FileReader();
      //   reader.onload = (event) => {
      //     preview = event.target?.result as string;
      //     setSelectedFiles((prevFiles) =>
      //       prevFiles.map((f) => (f.file === file ? { ...f, preview } : f))
      //     );
      //   };
      //   reader.readAsText(file);
      // }

      return {
        file,
        url,
        // preview,
      };
    });

    setSelectedFiles([...selectedFiles, ...additionalSelectedFiles]);
  };

  return (
    <div className="upload-file-dialog">
      {/* settings */}
      <div className="settings">
        {/* Close Icon */}
        <span
          aria-label="Close file dialog"
          title="Close file dialog"
          className="close-icon"
          onClick={onClose}
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

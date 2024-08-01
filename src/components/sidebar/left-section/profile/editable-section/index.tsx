// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// ** Icons
import { MdCheck, MdEdit } from "react-icons/md";

interface EditableSectionProps {
  title: string;
  content: string;
  maxLength: number;
  onSave: (value: string) => Promise<void>;
}

const EditableSection = (props: EditableSectionProps) => {
  const { title, content, maxLength, onSave } = props;

  // ** States
  const [currentContent, setCurrentContent] = useState(content);
  const [text, setText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ** Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    bottomLineRef.current?.classList.remove("active");
  };

  const handleFocus = () => {
    bottomLineRef.current?.classList.add("active");
  };

  const handleAction = async () => {
    // if not editing, start editing
    if (!isEditing) {
      inputRef.current?.classList.add("editable");
      setIsEditing(true);
      return;
    }
    if (text === currentContent) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);

    try {
      await onSave(text);
      setCurrentContent(text);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="editable-section">
      <h3>{title}</h3>
      <div className="edit">
        {/* content */}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          maxLength={maxLength}
          disabled={!isEditing}
        />

        {/* actions */}
        <div className="action">
          {isEditing && <p>{maxLength - text.length}</p>}
          <button onClick={handleAction} disabled={isSaving}>
            {isEditing ? <MdCheck /> : <MdEdit />}
          </button>
        </div>
        {/* bottom-line */}
      </div>
      {isEditing && <div ref={bottomLineRef} className="bottom-line" />}
    </div>
  );
};

export default EditableSection;

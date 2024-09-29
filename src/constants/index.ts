import { IFilePreview } from "../types";

// ** Icons
import { MdBlurLinear, MdCropRotate } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { PiSticker } from "react-icons/pi";
import { RiHdLine, RiText } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { BiRedo, BiUndo } from "react-icons/bi";

export const initialAvatar: IFilePreview = {
  file: null,
  url: "",
};

export const uploadFileDialogSettings = [
  {
    title: "Emoji",
    Icon: BsEmojiSmile,
  },
  {
    title: "Sticker",
    Icon: PiSticker,
  },
  {
    title: "Text",
    Icon: RiText,
  },
  {
    title: "Paint",
    Icon: GoPencil,
  },
  {
    title: "Blur",
    Icon: MdBlurLinear,
  },
  {
    title: "Crop and rotate",
    Icon: MdCropRotate,
  },
  {
    title: "HD resolution",
    Icon: RiHdLine,
  },
  {
    title: "Undo",
    Icon: BiUndo,
  },
  {
    title: "Redo",
    Icon: BiRedo,
  },
];

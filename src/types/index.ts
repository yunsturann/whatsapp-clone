import { Timestamp } from "firebase/firestore";

// ** User Types
export interface IUser {
  id: string;
  email: string;
  username: string;
  avatar: string;
  blocked: string[];
  about?: string;
}

// ** Chat List Types
export interface IChatListItem {
  chatId: string;
  isSeen: boolean;
  lastMessage: string;
  receiverId: string;
  updatedAt: number;
}

export interface IChatList {
  chats: IChatListItem[];
}

export interface IChatListData extends IChatListItem {
  user: IUser;
}

// ** Chat Types
export interface IMessage {
  createdAt: Timestamp;
  senderId: string;
  text: string;
  img?: string;
}

export interface IChat {
  createdAt: string;
  messages: IMessage[];
}

// ** File Preview Type
export interface IFilePreview {
  file: File | null;
  url: string;
}

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
  createdAt: string;
  senderId: string;
  text: string;
}

export interface IChat {
  createdAt: string;
  messages: IMessage[];
}

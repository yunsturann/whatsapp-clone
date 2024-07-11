// ** React Imports
import { useEffect, useRef } from "react";
import MessageItem from "./message-item";

const ChatContent = () => {
  const chatEnd = useRef<HTMLDivElement | null>(null);

  // ** Go to end of the chat
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="chat-content">
      <MessageItem isOwn={false} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={true} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={false} />
      <MessageItem isOwn={true} />

      {/* End of the Chat */}
      <div ref={chatEnd} />
    </div>
  );
};

export default ChatContent;

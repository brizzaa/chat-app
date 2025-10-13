import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import { MessageInput } from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeletonComponent from "./MessageSkeletonComponent";

export const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeletonComponent />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>Messaggi.. <br />(da implementare!!)</p>
      <MessageInput />
    </div>
  );
};

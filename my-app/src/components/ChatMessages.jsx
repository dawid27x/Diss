import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Start a conversation...</p>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))
      )}
      <div ref={messagesEndRef} className="h-50" /> {/* Adds extra space at the bottom */}
    </div>
  );
};

export default ChatMessages;
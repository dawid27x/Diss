import MessageBubble from "./MessageBubble";

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Start a conversation...</p>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))
      )}
    </div>
  );
};

export default ChatMessages;

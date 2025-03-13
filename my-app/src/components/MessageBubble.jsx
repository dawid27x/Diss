const MessageBubble = ({ text, sender }) => {
    const isUser = sender === "user";
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`p-3 rounded-lg max-w-xs text-white ${
            isUser ? "bg-blue-600" : "bg-gray-500"
          }`}
        >
          {text}
        </div>
      </div>
    );
  };
  
  export default MessageBubble;
  
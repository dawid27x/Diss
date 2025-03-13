import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
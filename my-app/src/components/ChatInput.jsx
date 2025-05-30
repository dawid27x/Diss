import { useState } from "react";

const ChatInput = ({ onSendMessage, buttons = [] }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleButtonClick = (task) => {
    if (!task.trim()) return;
    onSendMessage(task);
  };

  return (
    <div className="absolute bottom-4 left-2 right-2 p-4  flex flex-col items-center">
      {buttons.length > 0 && (
        <div className="flex justify-center space-x-4 mb-4">
          {buttons.map((button, index) => (
            button.name && button.task ? (
              <button
                key={index}
                onClick={() => handleButtonClick(button.task)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                {button.name}
              </button>
            ) : null
          ))}
        </div>
      )}

      <div className="w-full flex items-center">
        <label htmlFor="chat-input" className="sr-only">
          Chat message input
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="ml-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

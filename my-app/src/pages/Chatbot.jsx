import { useState } from "react";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { Link } from "react-router-dom";

const Chatbot = () => {
  const storedSettings = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
  const { backgroundColor, font, textColor, logo } = storedSettings;

  const botSettings = JSON.parse(localStorage.getItem("advancedSettings")) || {};
  const { role } = JSON.parse(localStorage.getItem("botSettings")) || {};

  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
  
    const userMessage = { text, sender: "user" };
  
    // Simulated bot response
    const botResponses = [
      "Hello! How can I assist you?",
      "That’s an interesting question!",
      "Let me think about that...",
      "I'm here to help!",
      "Can you clarify your request?"
    ];
    const botMessage = { text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: "bot" };
  
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]); // ✅ Fix: Ensure proper state updates
  };
  
  

  return (
    
    <div className="flex flex-col h-screen" style={{ backgroundColor, fontFamily: font, color: textColor }}>
        <Link
        to="/customisation"
        className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        ← Back
      </Link>
      {/* Header */}
      <div className="p-4 text-center text-xl font-bold flex items-center justify-center border-b">
        {logo && <img src={logo} alt="Logo" className="h-10 mr-2" />}
        <span>{role || "Chatbot"}</span>
      </div>
      
      {/* Chat Messages */}
      <ChatMessages messages={messages} />
      
      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;

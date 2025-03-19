/* eslint-disable no-unused-vars */
import { useState } from "react";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { Link } from "react-router-dom";
import { sendToOpenAI } from "../utils/openAIService";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const UISettings = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
  const AdvancedSettings = JSON.parse(localStorage.getItem("advancedSettings")) || {};
  const PromptSettings = JSON.parse(localStorage.getItem("customisationFormData")) || {};
  
  const { backgroundColor, textColor, logo, messageStyle, buttons } = UISettings;
  const { aiName, dataSources, format, level, personality, role, structure, tone} = PromptSettings;
  const { effort, store, temperature } = AdvancedSettings;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = async (task) => {
    if (!task.trim()) return;
    await handleSendMessage(task);
  };

  const infoMessage = `
    You have successfully created your own AI-powered chatbot, customized to your preferences! 

    🖌 User Interface
    - Background color: ${backgroundColor}  
    - Text color: ${textColor}  
    - Message Style: ${messageStyle}  
    - ${logo ? "A custom logo is included." : "No logo uploaded."}

    🤖 AI Personality & Role  
    - AI Name: ${aiName || "Your Chatbot"}  
    - Role: ${role}  
    - Personality: ${personality}  
    - Response Format: ${format}  
    - Response Structure: ${structure}  
    - Response Tone: ${tone}  
    - Knowledge Level: ${level}  
    - Data Sources: ${dataSources?.join(", ") || "None specified"}

    ⚙️ Advanced Settings  
    - Reasoning Effort: ${effort}  
    - Response Temperature: ${temperature}  
    - ${store ? "Responses are stored for retrieval." : "Responses are not stored."}

    Your chatbot is now fully functional and tailored to your exact specifications. 🎉
    `;


    const handleSendMessage = async (text) => {
      if (!text.trim()) return;
    
      const userMessage = { text, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    
      try {
        const chatHistory = messages.map(msg => ({ role: msg.sender === "user" ? "user" : "assistant", content: msg.text }));
        
        const botResponse = await sendToOpenAI(text, chatHistory);
        if (botResponse) {
          const botMessage = { text: botResponse, sender: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error("Error fetching OpenAI response:", error);
      }
    };
    

  return (
    
    <div className="flex flex-col h-screen" style={{ backgroundColor, color: textColor }}>
        <Link
        to="/advancedSettings"
        className="absolute top-6 left-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
      >
        ← Back
      </Link>
      {/* Info Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Info
      </button>
      {/* Header */}
      <div className="p-4 text-center text-3xl font-bold flex items-center justify-center border-b">
        {logo && <img src={logo} alt="Logo" className="h-20 mr-4 w-20" />}
        <span>{aiName || "Chatbot"} - {role || "Personal Assistant"}</span>
      </div>
      
      {/* Chat Messages */}
      <ChatMessages messages={messages} />
      
      {/* Action Buttons Positioned Above Input Box */}
      {buttons.length > 0 && (
        <div className="p-4 flex justify-center space-x-4 border-t">
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
      <ChatInput buttons={buttons} onSendMessage={handleSendMessage} />

      {isPopupOpen && (
        <div className="fixed inset-0 bg-blue-950 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Your Chatbot</h2>
            <p className="text-gray-700 whitespace-pre-line">{infoMessage}</p>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-lime-700 text-white rounded-lg hover:bg-lime-900"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
    
  );
};

export default Chatbot;

/* eslint-disable no-unused-vars */
import { useState } from "react";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { Link } from "react-router-dom";
import { sendToOpenAI } from "../utils/openAIService";
import configurePrompt from "../utils/configurePrompt";

const Chatbot = () => {
  const [exported, setExported] = useState(false);
  const [messages, setMessages] = useState([]);

  const UISettings = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
  const AdvancedSettings = JSON.parse(localStorage.getItem("advancedSettings")) || {};
  const PromptSettings = JSON.parse(localStorage.getItem("customisationFormData")) || {};
  
  const { backgroundColor, textColor, logo, messageStyle, buttons } = UISettings;
  const { aiName, dataSources, level, personality, role, structure, tone, additionalinfo, wordcount, refrain} = PromptSettings;
  const { effort, store, temperature } = AdvancedSettings;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = async (task) => {
    if (!task.trim()) return;
    await handleSendMessage(task);
  };

  const infoMessage = `
  You have successfully created your own AI-powered chatbot, customized to your preferences! 

  🤖 AI Personality & Role  
  - AI Name: ${aiName || "Your Chatbot"}  
  - Role: ${role}  
  - Personality: ${personality}  
  - Response Format: ${PromptSettings.format}  
  - Response Structure: ${structure}  
  - Response Tone: ${tone}  
  - Knowledge Level: ${level}  
  - Data Sources: ${dataSources?.join(", ") || "None specified"}

  📌 Additional Instructions
  - ${additionalinfo || "No additional information provided."}

  ❌ Words/Phrases to Avoid
  - ${refrain || "No restrictions specified."}

  ✍️ Response Settings  
  - Word Count: ${wordcount}  

  ⚙️ Advanced Settings  
  - Reasoning Effort: ${effort}  
  - Response Temperature: ${temperature}  
  - ${store ? "Responses are stored for retrieval." : "Responses are not stored."}

  Your chatbot is now fully functional and tailored to your exact specifications. 🎉
`;


    const handleExportPrompt = () => {
      if (navigator.clipboard && window.isSecureContext) {
        const prompt = configurePrompt(PromptSettings);
        navigator.clipboard.writeText(prompt).then(() => {
          setExported(true);
          setTimeout(() => setExported(false), 3000); // Reset after 3 seconds
        });
      } else {
        console.error("Clipboard API not supported.");
      }
    };
    


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
      <div className="absolute top-6 right-6 flex space-x-4">
      <button
        onClick={handleExportPrompt}
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        {exported ? "Exported!" : "Export Prompt"}
      </button>

        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Info
        </button>
      </div>

      {/* Header */}
      <div className="p-4 text-center text-3xl font-bold flex items-center justify-center border-b">
        {logo && <img src={logo} alt="Logo" className="h-20 mr-4 w-20 rounded-md" />}
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

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === "user";
  const [displayedText, setDisplayedText] = useState(isUser ? text : "");

  // Retrieve logo from uiCustomisationSettings in localStorage
  const uiSettings = JSON.parse(localStorage.getItem("uiCustomisationSettings")) || {};
  const logo = uiSettings.logo || null;

  useEffect(() => {
    if (!isUser) { 
      setDisplayedText(""); 
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1)); 
          index++;
        } else {
          clearInterval(interval);
        }
      }, 15); 

      return () => clearInterval(interval);
    }
  }, [text, isUser]); 

  return (
    <div className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && logo && (
        <img src={logo} alt="Chatbot Logo" className="w-9 h-9 rounded-full mr-2 border-2 border-black" />
      )}
      <div
        className={`p-3 rounded-lg max-w-lg w-auto break-words ${
          isUser ? "bg-blue-600 text-white" : "text-black bg-gray-200"
        }`}
      >
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={displayedText}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium">{children}</h3>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            

          }}
        />
      </div>
    </div>
  );
};

export default MessageBubble;

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const MessageBubble = ({ text, sender }) => {
  const isUser = sender === "user";
  const [displayedText, setDisplayedText] = useState(isUser ? text : "");

  useEffect(() => {
    if (!isUser) { // Only animate bot messages
      setDisplayedText(""); // Reset before animation starts
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1)); // Correct slicing for animation
          index++;
        } else {
          clearInterval(interval);
        }
      }, 15); // Adjust speed if needed

      return () => clearInterval(interval);
    }
  }, [text, isUser]); // Runs only when `text` changes

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-lg w-auto break-words ${
          isUser ? "bg-blue-600 text-white" : "text-black"
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
          }}
        />
      </div>
    </div>
  );
};

export default MessageBubble;

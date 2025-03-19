// const handleSendMessage = (text) => {
//     if (!text.trim()) return;
  
//     const userMessage = { text, sender: "user" };
  
//     // Simulated bot response
//     const botResponses = [
//       "Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How caHello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?n I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?Hello! How can I assist you?",
//       "That’s an interesting question!",
//       "Let me think about that...",
//       "I'm here to help!",
//       "Can you clarify your request?"
//     ];
//     const botMessage = { text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: "bot" };
  
//     setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]); // ✅ Fix: Ensure proper state updates
//   };  
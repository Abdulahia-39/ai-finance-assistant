import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AIContext = createContext();

import { API_URL } from "../config/api";

export const AIProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userText) => {
    if (!userText.trim() || isTyping) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: "user",
      text: userText,
    };

    setChatHistory((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/ai/chat`, {
        message: userText,
        history: chatHistory,
      });

      const data = await response.data;

      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "assistant", text: data.text },
        ]);
      }
    } catch (error) {
      console.error("AI Context Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          id: "err",
          role: "assistant",
          text: "Connection lost. Is the server running?",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setChatHistory([
      { id: "1", role: "assistant", text: "Chat cleared. How can I help?" },
    ]);
  };

  return (
    <AIContext.Provider
      value={{ chatHistory, isTyping, sendMessage, clearChat }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);

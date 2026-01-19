import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const AIContext = createContext();

import { API_URL } from "../config/api";

export const AIProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const { userToken } = useContext(AuthContext);

  const insightInFlight = useRef(false);

  const fetchInsight = useCallback(async () => {
    if (!userToken || insightInFlight.current) return;
    insightInFlight.current = true;
    setInsightLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        {
          message:
            "Give one concise, actionable spending insight based on my recent transactions. Under 28 words, no greeting.",
          history: [],
        },
        config,
      );

      const data = await response.data;
      if (data?.success && data?.text) {
        setInsight(data.text.trim());
      } else {
        setInsight("No insight available right now.");
      }
    } catch (error) {
      console.error("AI insight error", error?.response?.data || error);
      setInsight("Could not load AI insight.");
    } finally {
      insightInFlight.current = false;
      setInsightLoading(false);
    }
  }, [userToken]);

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
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/api/ai/chat`,
        {
          message: userText,
          history: chatHistory,
        },
        config,
      );

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
      value={{
        chatHistory,
        isTyping,
        sendMessage,
        clearChat,
        insight,
        insightLoading,
        fetchInsight,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);

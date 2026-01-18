import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config/api";

const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const withAuth = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    return { headers: { Authorization: `Bearer ${userToken}` } };
  };

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const config = await withAuth();
      const res = await axios.get(`${API_URL}/api/goals`, config);
      setGoals(res.data || []);
    } catch (err) {
      console.error("fetchGoals error", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async ({ title, targetAmount, category, deadline }) => {
    try {
      const config = await withAuth();
      const res = await axios.post(
        `${API_URL}/api/goals`,
        { title, targetAmount: Number(targetAmount), category, deadline },
        config
      );
      setGoals((prev) => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      console.error("createGoal error", err?.response?.data || err.message);
      return { success: false };
    }
  };

  const addToGoal = async (id, amount) => {
    try {
      const config = await withAuth();
      const res = await axios.put(
        `${API_URL}/api/goals/${id}/add`,
        { amount: Number(amount) },
        config
      );
      setGoals((prev) => prev.map((g) => (g._id === id ? res.data : g)));
      return { success: true };
    } catch (err) {
      console.error("addToGoal error", err?.response?.data || err.message);
      return { success: false };
    }
  };

  const deleteGoal = async (id) => {
    try {
      const config = await withAuth();
      await axios.delete(`${API_URL}/api/goals/${id}`, config);
      setGoals((prev) => prev.filter((g) => g._id !== id));
      return { success: true };
    } catch (err) {
      console.error("deleteGoal error", err?.response?.data || err.message);
      return { success: false };
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalsContext.Provider
      value={{ goals, loading, fetchGoals, createGoal, addToGoal, deleteGoal }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);

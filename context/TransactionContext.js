import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch all transactions for the logged-in user
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const response = await axios.get(`${API_URL}/api/transactions/`, config);
      setTransactions(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Save a new transaction
  const saveTransaction = async (amount, type, category, store, note) => {
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const response = await axios.post(
        `${API_URL}/api/transactions/`,
        { amount: parseFloat(amount), type, category, merchant: store, note },
        config
      );

      // Update local state immediately so UI refreshes
      setTransactions((prev) => [response.data, ...prev]);
      // Alert.alert("Success", "Transaction saved successfully!");
      return { success: true };
    } catch (err) {
      Alert.alert("Error", "Could not save transaction");
      return { success: false };
    }
  };

  // 3. AI & Financial Logic (The Calculations)
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    // Your 30% Safety Buffer Logic
    // Assuming a default budget goal or using total income as the monthly ceiling
    const safetyBuffer = balance * 0.3;
    const safeToSpend = balance - safetyBuffer;

    return {
      balance,
      income,
      expenses,
      safeToSpend: safeToSpend > 0 ? safeToSpend : 0,
    };
  }, [transactions]);

  // Load data on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const values = {
    transactions,
    saveTransaction,
    fetchTransactions,
    loading,
    ...totals, // Spreads balance, income, expenses, and safeToSpend
  };

  return (
    <TransactionContext.Provider value={values}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);

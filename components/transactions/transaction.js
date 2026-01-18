import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Calendar,
  Store,
  MessageSquare,
  Check,
} from "lucide-react-native";
import { useTransaction } from "../../context/TransactionContext";

const CATEGORIES = {
  expense: [
    { id: "1", label: "Food", icon: "🍔", color: "bg-orange-100" },
    { id: "2", label: "Transport", icon: "🚗", color: "bg-blue-100" },
    { id: "3", label: "Shopping", icon: "🛍️", color: "bg-pink-100" },
    { id: "4", label: "Bills", icon: "📜", color: "bg-purple-100" },
  ],
  income: [
    { id: "1", label: "Salary", icon: "💰", color: "bg-emerald-100" },
    { id: "2", label: "Freelance", icon: "💻", color: "bg-cyan-100" },
    { id: "3", label: "Gift", icon: "🎁", color: "bg-yellow-100" },
    { id: "4", label: "Invest", icon: "📈", color: "bg-indigo-100" },
  ],
};

const TransactionForm = ({ type = "expense" }) => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [store, setStore] = useState("");
  const [note, setNote] = useState("");
  const { saveTransaction } = useTransaction();

  const isExpense = type === "expense";
  const themeColor = isExpense ? "#f43f5e" : "#10b981"; // Rose vs Emerald

  const handleSend = async () => {
    try {
      const transaction = await saveTransaction(
        amount,
        type,
        category,
        store,
        note
      );
      if (transaction) {
        Alert.alert("Success", "Transaction saved successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", "Transaction could not be saved.");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to save transaction. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-14 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-slate-100 rounded-full"
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-slate-900">
          New {isExpense ? "Expense" : "Income"}
        </Text>
        <View className="w-10" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
        >
          {/* Amount Input */}
          <View className="items-center my-8">
            <Text className="text-slate-400 font-medium mb-2">Amount</Text>
            <View className="flex-row items-center">
              <Text
                style={{ color: themeColor }}
                className="text-4xl font-bold mr-2"
              >
                $
              </Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                autoFocus
                style={{ color: themeColor }}
                className="text-5xl font-bold"
                placeholderTextColor="#cbd5e1"
              />
            </View>
          </View>

          {/* Category Selection */}
          <Text className="text-slate-900 font-bold text-base mb-4">
            Category
          </Text>
          <View className="flex-row flex-wrap justify-between mb-8">
            {CATEGORIES[type].map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setCategory(item.label)}
                className={`w-[22%] aspect-square rounded-3xl items-center justify-center mb-4 border-2 ${
                  category === item.label
                    ? "border-slate-900"
                    : "border-transparent"
                } ${item.color}`}
              >
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-[10px] font-bold text-slate-600 uppercase">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            {/* Date Field (Mock) */}
            <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl">
              <Calendar size={20} color="#64748b" />
              <Text className="ml-4 text-slate-600 font-medium flex-1">
                Today, Jan 4th
              </Text>
            </View>

            {/* merchant*/}
            {type === "expense" ? (
              <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl mt-4">
                <Store size={20} color="#64748b" />
                <TextInput
                  value={store}
                  onChangeText={setStore}
                  placeholder="Add store name..."
                  className="ml-4 flex-1 text-slate-900 font-medium text-left"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            ) : null}

            {/* Note Field */}
            <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl mt-4">
              <MessageSquare size={20} color="#64748b" />
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Add a note..."
                className="ml-4 flex-1 text-slate-900 font-medium text-left"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={{ backgroundColor: themeColor }}
            className="rounded-3xl py-5 mt-10 mb-10 items-center flex-row justify-center shadow-lg shadow-slate-300"
            onPress={handleSend}
          >
            <Check size={24} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Save Transaction
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TransactionForm;

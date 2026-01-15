import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  PieChart,
  Bell,
  Calendar,
  Target,
  Check,
} from "lucide-react-native";

const BUDGET_CATEGORIES = [
  { id: "1", label: "Housing", icon: "🏠", color: "bg-indigo-100" },
  { id: "2", label: "Groceries", icon: "🛒", color: "bg-emerald-100" },
  { id: "3", label: "Dining", icon: "🍕", color: "bg-orange-100" },
  { id: "4", label: "Entertainment", icon: "🎬", color: "bg-purple-100" },
  { id: "5", label: "Transport", icon: "🚌", color: "bg-blue-100" },
  { id: "6", label: "Health", icon: "🏥", color: "bg-rose-100" },
  { id: "7", label: "Personal", icon: "✨", color: "bg-cyan-100" },
  { id: "8", label: "Other", icon: "📦", color: "bg-slate-100" },
];

const BudgetScreen = () => {
  const router = useRouter();
  const [limit, setLimit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");

  const themeColor = "#4f46e5"; // Indigo 600

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
        <Text className="text-lg font-bold text-slate-900">Set Budget</Text>
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
          {/* Budget Limit Input */}
          <View className="items-center my-8">
            <Text className="text-slate-400 font-medium mb-2">
              Spending Limit
            </Text>
            <View className="flex-row items-center">
              <Text
                style={{ color: themeColor }}
                className="text-4xl font-bold mr-2"
              >
                $
              </Text>
              <TextInput
                value={limit}
                onChangeText={setLimit}
                placeholder="0"
                keyboardType="decimal-pad"
                autoFocus
                style={{ color: themeColor }}
                className="text-5xl font-bold"
                placeholderTextColor="#cbd5e1"
              />
            </View>
          </View>

          {/* Category Picker */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 font-bold text-base">
              Select Category
            </Text>
            <PieChart size={18} color="#94a3b8" />
          </View>

          <View className="flex-row flex-wrap justify-between mb-8">
            {BUDGET_CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedCategory(item.id)}
                className={`w-[22%] aspect-square rounded-3xl items-center justify-center mb-4 border-2 ${
                  selectedCategory === item.id
                    ? "border-indigo-600"
                    : "border-transparent"
                } ${item.color}`}
              >
                <Text className="text-2xl mb-1">{item.icon}</Text>
                <Text className="text-[9px] font-bold text-slate-600 uppercase text-center px-1">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Budget Options */}
          <View className="space-y-4">
            <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl">
              <Bell size={20} color="#64748b" />
              <View className="ml-4 flex-1">
                <Text className="text-slate-900 font-bold text-sm">
                  Alert Me
                </Text>
                <Text className="text-slate-400 text-xs">
                  When I reach 80% of limit
                </Text>
              </View>
              <Check size={18} color="#10b981" />
            </View>

            <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl mt-4">
              <Calendar size={20} color="#64748b" />
              <View className="ml-4 flex-1">
                <Text className="text-slate-900 font-bold text-sm">
                  Reset Date
                </Text>
                <Text className="text-slate-400 text-xs">
                  First day of every month
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={{ backgroundColor: themeColor }}
            className="rounded-3xl py-5 mt-10 mb-10 items-center flex-row justify-center shadow-lg shadow-indigo-200"
            onPress={() => router.back()}
          >
            <Target size={22} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Create Budget
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default BudgetScreen;

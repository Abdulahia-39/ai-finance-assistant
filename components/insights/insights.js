import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { TrendingUp, TrendingDown, Zap } from "lucide-react-native";

// --- Dynamic Pie Chart Component ---
const SpendingPieChart = ({ data }) => {
  const size = 120;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  let currentOffset = 0;

  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        {data.map((item, index) => {
          const strokeDashoffset =
            circumference - (item.percentage / 100) * circumference;
          const rotation = (currentOffset / 100) * 360;
          currentOffset += item.percentage;

          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              transform={`rotate(${rotation}, ${size / 2}, ${size / 2})`}
            />
          );
        })}
      </Svg>
      {/* Center Label */}
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-xl font-bold text-slate-900">65%</Text>
        <Text className="text-[10px] text-slate-500 uppercase font-bold">
          Food
        </Text>
      </View>
    </View>
  );
};

const AnalyticsScreen = () => {
  const [isProjected, setIsProjected] = useState(false);

  // Data for the Pie Chart
  const chartData = [
    { label: "Food", percentage: 45, color: "#2563eb", amount: "$1,200" }, // Blue-600
    { label: "Rent", percentage: 35, color: "#fbbf24", amount: "$1,000" }, // Amber-400
    { label: "Other", percentage: 20, color: "#fb7185", amount: "$640" }, // Rose-400
  ];

  return (
    <ScrollView
      className="flex-1 bg-slate-50 pt-5"
      showsVerticalScrollIndicator={false}
    >
      {/* Header & Toggle */}
      <View className="px-6 pt-12 pb-6 bg-white border-b border-slate-100 flex-row justify-between items-end">
        <View>
          <Text className="text-slate-500 font-medium">Monthly Insights</Text>
          <Text className="text-3xl font-bold text-slate-900">Statistics</Text>
        </View>

        <TouchableOpacity
          onPress={() => setIsProjected(!isProjected)}
          className={`flex-row items-center px-4 py-2 rounded-full border ${
            isProjected
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-slate-200"
          }`}
        >
          <Zap size={16} color={isProjected ? "white" : "#64748b"} />
          <Text
            className={`ml-2 font-semibold ${
              isProjected ? "text-white" : "text-slate-500"
            }`}
          >
            {isProjected ? "Forecasting" : "Actual"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-6 py-6">
        {/* Income vs Expenses Summary */}
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <View className="bg-emerald-100 w-8 h-8 rounded-full items-center justify-center mb-2">
              <TrendingUp size={16} color="#059669" />
            </View>
            <Text className="text-slate-500 text-xs">Income</Text>
            <Text className="text-lg font-bold text-slate-900">$4,500</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <View className="bg-rose-100 w-8 h-8 rounded-full items-center justify-center mb-2">
              <TrendingDown size={16} color="#e11d48" />
            </View>
            <Text className="text-slate-500 text-xs">Expenses</Text>
            <Text className="text-lg font-bold text-slate-900">
              {isProjected ? "$3,120" : "$2,840"}
            </Text>
          </View>
        </View>

        {/* Category Breakdown (SVG Pie Chart) */}
        <View className="bg-white rounded-3xl p-6 border border-slate-100 mb-8 shadow-sm">
          <Text className="text-xl font-bold text-slate-900 mb-6">
            Spending Breakdown
          </Text>
          <View className="flex-row items-center justify-between">
            {/* Real SVG Pie Chart */}
            <SpendingPieChart data={chartData} />

            {/* Legend */}
            <View className="flex-1 ml-8 space-y-3">
              {chartData.map((item, idx) => (
                <LegendItem
                  key={idx}
                  color={item.color}
                  label={item.label}
                  amount={item.amount}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Budget Progress */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-slate-900 mb-4">
            Budget Progress
          </Text>
          <View className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <ProgressBar
              label="Groceries"
              spent={300}
              total={500}
              color="bg-blue-600"
            />
            <ProgressBar
              label="Entertainment"
              spent={180}
              total={200}
              color="bg-rose-500"
            />
            <ProgressBar
              label="Savings Goal"
              spent={850}
              total={1000}
              color="bg-emerald-500"
            />
          </View>
        </View>

        {/* Forecasting Note */}
        {isProjected && (
          <View className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex-row items-start">
            <Zap size={20} color="#2563eb" />
            <Text className="ml-3 text-blue-800 text-sm flex-1">
              Based on your current habits, you are projected to save{" "}
              <Text className="font-bold">$1,380</Text> by the end of the month.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// --- Helpers ---
const LegendItem = ({ color, label, amount }) => (
  <View className="flex-row justify-between items-center">
    <View className="flex-row items-center">
      <View
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      <Text className="text-slate-500 text-sm">{label}</Text>
    </View>
    <Text className="text-slate-900 font-semibold text-sm">{amount}</Text>
  </View>
);

const ProgressBar = ({ label, spent, total, color }) => {
  const percentage = Math.min((spent / total) * 100, 100);
  return (
    <View>
      <View className="flex-row justify-between mb-2">
        <Text className="text-slate-700 font-medium">{label}</Text>
        <Text className="text-slate-500 text-xs">
          ${spent} / ${total}
        </Text>
      </View>
      <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <View
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};

export default AnalyticsScreen;

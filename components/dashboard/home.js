import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  TrendingUp,
  Coffee,
  ShoppingBag,
  ArrowUpRight,
  CreditCard,
  Lightbulb,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const chartData = [
  { day: "sat", height: 40 },
  { day: "sun", height: 70 },
  { day: "mon", height: 45 },
  { day: "tue", height: 90 },
  { day: "wed", height: 65 },
  { day: "thu", height: 30 },
  { day: "fri", height: 80 },
];

const maxHeight = Math.max(...chartData.map((item) => item.height));

const HomeScreen = () => {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View className="px-6 pt-12 pb-6 bg-white border-b border-slate-100">
        <Text className="text-slate-500 font-medium">Total Balance</Text>
        <Text className="text-4xl font-bold text-slate-900 mt-1">
          $12,450.80
        </Text>
      </View>

      <View className="px-6 py-6">
        {/* Safe-to-Spend Widget */}
        <View className="bg-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-200 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-blue-100 font-semibold text-lg">
              Safe-to-Spend
            </Text>
            <View className="bg-blue-500/30 p-2 rounded-full">
              <CreditCard size={20} color="white" />
            </View>
          </View>
          <Text className="text-white text-3xl font-bold">$2,104.00</Text>
          <Text className="text-blue-100 mt-2 text-sm opacity-80">
            Until next payday (Oct 15)
          </Text>
        </View>

        {/* AI Nudge / Insight Card */}
        <View className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex-row items-center">
          <View className="bg-amber-100 p-3 rounded-xl mr-4">
            <Lightbulb size={24} color="#d97706" />
          </View>
          <View className="flex-1">
            <Text className="text-amber-900 font-bold text-sm">AI Insight</Text>
            <Text className="text-amber-800 text-sm leading-5">
              You've spent 20% more on <Text className="font-bold">coffee</Text>{" "}
              this week than usual.
            </Text>
          </View>
        </View>

        {/* Weekly Summary Chart Placeholder */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-slate-900 mb-4">
            Weekly Spending
          </Text>
          <View className="bg-white rounded-3xl p-6 border border-slate-100 flex-row items-end justify-between h-42">
            {/* Simple Bar Chart Representation */}
            {chartData.map((data, i) => (
              <View key={data.day} className="items-center">
                <View
                  className={`w-3 rounded-full ${
                    data.height === maxHeight ? "bg-blue-600" : "bg-slate-200"
                  }`}
                  style={{ height: data.height }}
                />
                <Text className="text-[10px] text-slate-400 mt-2">
                  {data.day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity Section */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-slate-900">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction List */}
          <View className="space-y-3">
            <TransactionItem
              icon={<Coffee size={20} color="#64748b" />}
              title="Starbucks"
              category="Food & Drink"
              amount="-$5.50"
              date="Today"
            />
            <TransactionItem
              icon={<ShoppingBag size={20} color="#64748b" />}
              title="Amazon"
              category="Shopping"
              amount="-$42.00"
              date="Yesterday"
            />
            <TransactionItem
              icon={<TrendingUp size={20} color="#059669" />}
              title="Stock Dividend"
              category="Investment"
              amount="+$12.40"
              isPositive
              date="Oct 2"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const TransactionItem = ({
  icon,
  title,
  category,
  amount,
  date,
  isPositive,
}) => (
  <View className="bg-white p-4 rounded-2xl border border-slate-100 flex-row items-center justify-between">
    <View className="flex-row items-center flex-1">
      <View className="bg-slate-50 p-3 rounded-xl mr-4">{icon}</View>
      <View>
        <Text className="font-bold text-slate-900">{title}</Text>
        <Text className="text-slate-500 text-xs">
          {category} • {date}
        </Text>
      </View>
    </View>
    <Text
      className={`font-bold text-lg ${
        isPositive ? "text-emerald-600" : "text-slate-900"
      }`}
    >
      {amount}
    </Text>
  </View>
);

export default HomeScreen;

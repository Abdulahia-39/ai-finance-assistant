import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import {
  CreditCard,
  Lightbulb,
  PieChart,
  DollarSign,
  BriefcaseBusiness,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useTransaction } from "../../context/TransactionContext";

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

const ACTIONS = [
  {
    id: "1",
    label: "Pay",
    icon: <DollarSign size={22} color="#ef4444" />,
    bgColor: "bg-red-50",
    // Use explicit segment path to avoid navigation errors when coming from tabs
    url: "/(transactions)/expense",
  },
  {
    id: "2",
    label: "Receive",
    icon: <BriefcaseBusiness size={22} color="#10b981" />,
    bgColor: "bg-emerald-50",
    url: "/(transactions)/revenue",
  },
  {
    id: "3",
    label: "Set Budget",
    icon: <PieChart size={22} color="#3b82f6" />,
    bgColor: "bg-blue-50",
    url: "/(transactions)/budget",
  },
];

const maxHeight = Math.max(...chartData.map((item) => item.height));

const HomeScreen = () => {
  const router = useRouter();
  const { transactions, loading } = useTransaction();
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

        <View className="mb-8 w-full">
          <FlatList
            data={ACTIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="items-center mr-6"
                onPress={() => router.push(item.url)}
              >
                <View
                  className={`${item.bgColor} p-8 rounded-3xl mb-2 shadow-lg shadow-slate-200 border border-white`}
                >
                  {item.icon}
                </View>
                <Text className="text-slate-600 text-xs font-semibold uppercase tracking-tighter">
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
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
            <TouchableOpacity
              onPress={() => router.push("/(transactions)/expense")}
            >
              <Text className="text-blue-600 font-semibold">Add</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            {loading ? (
              <ActivityIndicator size="small" />
            ) : transactions && transactions.length ? (
              transactions
                .slice(0, 6)
                .map((tx) => (
                  <TransactionItem key={tx._id || tx.date} tx={tx} />
                ))
            ) : (
              <Text className="text-slate-500">No transactions yet.</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const TransactionItem = ({ tx }) => {
  const isIncome = tx.type === "income";
  const amountValue = Number(tx.amount || 0);
  const amountText = `${isIncome ? "+" : "-"}$${amountValue.toFixed(2)}`;
  const categoryLabel = tx.category || "General";
  const title = tx.merchant || categoryLabel;
  const dateLabel = tx.date
    ? new Date(tx.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Today";

  const icon = (
    <View
      className={`${
        isIncome ? "bg-emerald-50" : "bg-slate-50"
      } w-10 h-10 rounded-xl items-center justify-center mr-4`}
    >
      <Text className="font-bold text-slate-700">
        {categoryLabel[0]?.toUpperCase() || "?"}
      </Text>
    </View>
  );

  return (
    <View className="bg-white p-4 rounded-2xl border border-slate-100 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        {icon}
        <View>
          <Text className="font-bold text-slate-900">{title}</Text>
          <Text className="text-slate-500 text-xs">
            {categoryLabel} • {dateLabel}
          </Text>
        </View>
      </View>
      <Text
        className={`font-bold text-lg ${
          isIncome ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {amountText}
      </Text>
    </View>
  );
};

export default HomeScreen;

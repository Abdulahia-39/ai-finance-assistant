import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import {
  Target,
  Car,
  Home,
  ShieldCheck,
  Plus,
  Zap,
  ArrowRight,
  Repeat,
} from "lucide-react-native";

const GoalCard = ({ title, saved, target, icon: Icon, color }) => {
  const progress = Math.min((saved / target) * 100, 100);

  return (
    <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm border border-slate-100">
      <View className="flex-row justify-between items-start mb-4">
        <View className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
          <Icon size={24} color={color.replace("bg-", "")} />
        </View>
        <TouchableOpacity>
          <Plus size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <Text className="text-slate-500 text-xs font-medium uppercase tracking-wider">
        {title}
      </Text>
      <View className="flex-row items-baseline mb-2">
        <Text className="text-2xl font-bold text-slate-900">
          ${saved.toLocaleString()}
        </Text>
        <Text className="text-slate-400 text-sm ml-1">
          of ${target.toLocaleString()}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: color.replace("bg-", ""),
          }}
        />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-slate-400 text-[10px] font-bold">
          {Math.round(progress)}% COMPLETE
        </Text>
        <Text className="text-slate-400 text-[10px] font-bold">
          ${(target - saved).toLocaleString()} LEFT
        </Text>
      </View>
    </View>
  );
};

const GoalsScreen = () => {
  const [roundUps, setRoundUps] = useState(true);
  const [paydaySave, setPaydaySave] = useState(false);

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="px-6 pt-14 pb-6">
        <Text className="text-3xl font-bold text-slate-900">Vault</Text>
        <Text className="text-slate-500">
          You're saving 12% more than last month.
        </Text>
      </View>

      {/* Savings Goals Section */}
      <View className="px-6">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-lg font-bold text-slate-800">Your Goals</Text>
          <TouchableOpacity>
            <Text className="text-blue-600 font-semibold">View All</Text>
          </TouchableOpacity>
        </View>

        <GoalCard
          title="Emergency Fund"
          saved={8400}
          target={10000}
          icon={ShieldCheck}
          color="#10b981" // emerald
        />
        <GoalCard
          title="New Tesla"
          saved={12500}
          target={45000}
          icon={Car}
          color="#3b82f6" // blue
        />
        <GoalCard
          title="Dream Home"
          saved={45000}
          target={150000}
          icon={Home}
          color="#8b5cf6" // violet
        />
      </View>

      {/* Auto-Save Rules Section */}
      <View className="px-6 mt-6 pb-12">
        <Text className="text-lg font-bold text-slate-800 mb-4">
          Auto-Save Rules
        </Text>

        <View className="bg-slate-900 rounded-3xl p-6 shadow-xl">
          {/* Round-ups */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="bg-blue-500/20 p-2 rounded-xl mr-4">
                <Zap size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">Round-ups</Text>
                <Text className="text-slate-400 text-xs">
                  Save the change from every buy
                </Text>
              </View>
            </View>
            <Switch
              value={roundUps}
              onValueChange={setRoundUps}
              trackColor={{ false: "#334155", true: "#3b82f6" }}
            />
          </View>

          {/* Payday Save */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="bg-emerald-500/20 p-2 rounded-xl mr-4">
                <Repeat size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">Payday Boost</Text>
                <Text className="text-slate-400 text-xs">
                  Save $100 every time you get paid
                </Text>
              </View>
            </View>
            <Switch
              value={paydaySave}
              onValueChange={setPaydaySave}
              trackColor={{ false: "#334155", true: "#10b981" }}
            />
          </View>

          <View className="mt-6 pt-6 border-t border-slate-800">
            <TouchableOpacity className="flex-row items-center justify-center bg-white/10 py-3 rounded-2xl">
              <Plus size={18} color="white" />
              <Text className="text-white font-bold ml-2">Add New Rule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default GoalsScreen;

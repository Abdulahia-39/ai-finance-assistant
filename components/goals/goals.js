import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
import { Plus } from "lucide-react-native";
import { useGoals } from "../../context/GoalsContext";
import AddAmountModal from "./addAmountModal";
import AddGoalModal from "./addGoalModal";

const GoalCard = ({ goal, color }) => {
  const progress = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100,
  );
  const initial = goal.title?.[0]?.toUpperCase() || "?";

  return (
    <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm border border-slate-100">
      <View className="flex-row justify-between items-start mb-4">
        <View
          className="p-3 rounded-2xl"
          style={{ backgroundColor: `${color}1A` }}
        >
          <Text className="font-bold" style={{ color }}>
            {initial}
          </Text>
        </View>
        <TouchableOpacity>
          <Plus size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <Text className="text-slate-500 text-xs font-medium uppercase tracking-wider">
        {goal.title}
      </Text>
      <View className="flex-row items-baseline mb-2">
        <Text className="text-2xl font-bold text-slate-900">
          ${goal.currentAmount.toLocaleString()}
        </Text>
        <Text className="text-slate-400 text-sm ml-1">
          of ${goal.targetAmount.toLocaleString()}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </View>
      <View className="flex-row justify-between mt-2">
        <Text className="text-slate-400 text-[10px] font-bold">
          {Math.round(progress)}% COMPLETE
        </Text>
        <Text className="text-slate-400 text-[10px] font-bold">
          ${(goal.targetAmount - goal.currentAmount).toLocaleString()} LEFT
        </Text>
      </View>
    </View>
  );
};

const GoalsScreen = () => {
  const { goals, loading, addToGoal, createGoal, deleteGoal } = useGoals();
  const [showAdd, setShowAdd] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { totalSaved, totalTarget, completion } = useMemo(() => {
    const saved = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
    const target = goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0);
    const pct = target > 0 ? Math.min((saved / target) * 100, 100) : 0;
    return { totalSaved: saved, totalTarget: target, completion: pct };
  }, [goals]);

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="px-6 pt-14 pb-6">
        <Text className="text-3xl font-bold text-slate-900">Vault</Text>
        <Text className="text-slate-500">
          Saved ${totalSaved.toLocaleString()} of $
          {totalTarget.toLocaleString() || "0"}
          {totalTarget > 0 ? ` • ${Math.round(completion)}% to goals` : ""}
        </Text>
      </View>

      {/* Savings Goals Section */}
      <View className="px-6">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-lg font-bold text-slate-800">Your Goals</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="small" />
        ) : goals.length ? (
          goals.map((goal) => (
            <TouchableOpacity
              key={goal._id}
              activeOpacity={0.9}
              onPress={() => {
                setSelectedGoal(goal);
                setAmount("");
                setShowAdd(true);
              }}
            >
              <GoalCard goal={goal} color="#10b981" />
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-slate-500">No goals yet.</Text>
        )}
      </View>

      <View className="px-6 mt-6 pb-12">
        <View className="bg-slate-900 rounded-3xl p-6 shadow-xl">
          <View className="">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white/10 py-3 rounded-2xl"
              onPress={() => setShowCreate(true)}
            >
              <Plus size={18} color="white" />
              <Text className="text-white font-bold ml-2">Add New Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AddAmountModal
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        selectedGoal={selectedGoal}
        addToGoal={addToGoal}
        deleteGoal={deleteGoal}
        amount={amount}
        setAmount={setAmount}
        submitting={submitting}
        setSubmitting={setSubmitting}
        deleting={deleting}
        setDeleting={setDeleting}
      />

      <AddGoalModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        submitting={creating}
        onSave={async ({ title, targetAmount, category }) => {
          setCreating(true);
          const res = await createGoal({ title, targetAmount, category });
          setCreating(false);
          if (res?.success) {
            setShowCreate(false);
          }
        }}
      />
    </ScrollView>
  );
};

export default GoalsScreen;

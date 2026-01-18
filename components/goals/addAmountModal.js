import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function AddAmountModal({
  showAdd,
  setShowAdd,
  selectedGoal,
  addToGoal,
  deleteGoal,
  amount,
  setAmount,
  submitting,
  setSubmitting,
  deleting,
  setDeleting,
}) {
  return (
    <Modal transparent visible={showAdd} animationType="fade">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6 shadow-xl">
          <Text className="text-xl font-bold text-slate-900 mb-2">
            Add to Goal
          </Text>
          <Text className="text-slate-500 mb-4">{selectedGoal?.title}</Text>

          <Text className="text-slate-600 font-medium mb-2">Amount</Text>
          <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3 mb-4">
            <Text className="text-lg font-bold text-slate-500 mr-2">$</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="decimal-pad"
              className="flex-1 text-xl font-bold text-slate-900"
              placeholderTextColor="#cbd5e1"
            />
          </View>

          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              className="px-4 py-3 rounded-2xl bg-rose-50 border border-rose-100 mx-1"
              onPress={() => {
                Alert.alert(
                  "Delete goal?",
                  "This will remove the goal and its progress.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: async () => {
                        if (!selectedGoal) return;
                        setDeleting(true);
                        const res = await deleteGoal(selectedGoal._id);
                        setDeleting(false);
                        if (res?.success) {
                          setShowAdd(false);
                          setAmount("");
                        }
                      },
                    },
                  ]
                );
              }}
              disabled={submitting || deleting}
            >
              <Text className="font-semibold text-rose-600">
                {deleting ? "Deleting..." : "Delete"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-3 rounded-2xl bg-slate-100 mx-1"
              onPress={() => setShowAdd(false)}
              disabled={submitting || deleting}
            >
              <Text className="font-semibold text-slate-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-3 rounded-2xl bg-emerald-600 mx-1"
              onPress={async () => {
                if (!selectedGoal) return;
                if (!amount) return;
                setSubmitting(true);
                const result = await addToGoal(selectedGoal._id, amount);
                setSubmitting(false);
                if (result?.success) {
                  setShowAdd(false);
                  setAmount("");
                }
              }}
              disabled={submitting || deleting}
            >
              <Text className="font-semibold text-white">
                {submitting ? "Adding..." : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

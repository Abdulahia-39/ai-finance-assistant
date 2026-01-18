import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

// Reusable bottom-sheet style modal for creating a new goal
export default function AddGoalModal({
  visible,
  onClose,
  onSave,
  submitting = false,
}) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!visible) {
      setTitle("");
      setTarget("");
      setCategory("");
    }
  }, [visible]);

  const handleSave = async () => {
    if (!title || !target) return;
    await onSave?.({ title, targetAmount: Number(target), category });
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-6 shadow-xl">
          <Text className="text-xl font-bold text-slate-900 mb-2">
            Add a Goal
          </Text>

          <Text className="text-slate-600 font-medium mb-2">Title</Text>
          <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3 mb-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Goal Title"
              className="flex-1 text-xl font-bold text-slate-900"
              placeholderTextColor="#cbd5e1"
            />
          </View>

          <Text className="text-slate-600 font-medium mb-2">Target</Text>
          <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3 mb-4">
            <Text className="text-lg font-bold text-slate-500 mr-2">$</Text>
            <TextInput
              value={target}
              onChangeText={setTarget}
              placeholder="0"
              keyboardType="decimal-pad"
              className="flex-1 text-xl font-bold text-slate-900"
              placeholderTextColor="#cbd5e1"
            />
          </View>

          <Text className="text-slate-600 font-medium mb-2">
            Category (optional)
          </Text>
          <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3 mb-4">
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="e.g. Travel"
              className="flex-1 text-base font-semibold text-slate-900"
              placeholderTextColor="#cbd5e1"
            />
          </View>

          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              className="px-4 py-3 rounded-2xl bg-slate-100 mx-1"
              onPress={onClose}
              disabled={submitting}
            >
              <Text className="font-semibold text-slate-700">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-3 rounded-2xl bg-emerald-600 mx-1"
              onPress={handleSave}
              disabled={submitting}
            >
              <Text className="font-semibold text-white">
                {submitting ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

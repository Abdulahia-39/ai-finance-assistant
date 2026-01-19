import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { User, LogOut, Mail } from "lucide-react-native";
import { AuthContext } from "../../context/AuthContext";

const ProfileScreen = () => {
  const { logout, user } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
  };

  const initials = React.useMemo(() => {
    const name = user?.name || "";
    if (!name.trim()) return "U";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
    return `${first}${last}`.toUpperCase() || first.toUpperCase() || "U";
  }, [user]);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header & Avatar */}
      <View className="items-center pt-16 pb-8 bg-slate-50">
        <View className="relative">
          <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center border-4 border-white shadow-sm">
            <Text className="text-3xl font-bold text-blue-600">{initials}</Text>
          </View>
          {/* Removed settings button since it has no function */}
        </View>
        <Text className="text-2xl font-bold text-slate-900 mt-4">
          {user?.name || "Your Account"}
        </Text>
        <Text className="text-slate-500 font-medium text-sm">
          {user?.email || ""}
        </Text>

        {/* Removed hardcoded plan/member since as they are not functional */}
      </View>

      <View className="px-6 py-4">
        {/* Show basic, read-only account info */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between py-4 border-b border-slate-50">
            <View className="flex-row items-center flex-1">
              <View className="bg-slate-100 p-2 rounded-xl mr-4">
                <User size={20} color="#475569" />
              </View>
              <View>
                <Text className="text-slate-900 font-semibold text-base">
                  Name
                </Text>
                <Text className="text-slate-400 text-xs">
                  {user?.name || "—"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center justify-between py-4 border-b border-slate-50">
            <View className="flex-row items-center flex-1">
              <View className="bg-slate-100 p-2 rounded-xl mr-4">
                <Mail size={20} color="#475569" />
              </View>
              <View>
                <Text className="text-slate-900 font-semibold text-base">
                  Email
                </Text>
                <Text className="text-slate-400 text-xs">
                  {user?.email || "—"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-50 p-4 rounded-2xl mt-4 border border-red-100"
        >
          <LogOut size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-slate-300 text-xs mt-8 pb-12">
          App Version 1.0.2 (Build 42)
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

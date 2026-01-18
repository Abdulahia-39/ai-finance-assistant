import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import {
  User,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  CreditCard,
  HelpCircle,
  ExternalLink,
} from "lucide-react-native";
import { AuthContext } from "../../context/AuthContext";

const SettingItem = ({
  icon: Icon,
  title,
  subtitle,
  value,
  isSwitch,
  onPress,
  color = "text-slate-600",
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isSwitch}
    className="flex-row items-center justify-between py-4 border-b border-slate-50"
  >
    <View className="flex-row items-center flex-1">
      <View className="bg-slate-100 p-2 rounded-xl mr-4">
        <Icon size={20} color="#475569" />
      </View>
      <View>
        <Text className="text-slate-900 font-semibold text-base">{title}</Text>
        {subtitle && <Text className="text-slate-400 text-xs">{subtitle}</Text>}
      </View>
    </View>

    {isSwitch ? (
      <Switch
        value={value}
        trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
        thumbColor="white"
      />
    ) : (
      <ChevronRight size={18} color="#cbd5e1" />
    )}
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    alert("Logged out successfully");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header & Avatar */}
      <View className="items-center pt-16 pb-8 bg-slate-50">
        <View className="relative">
          <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center border-4 border-white shadow-sm">
            <Text className="text-3xl font-bold text-blue-600">AH</Text>
          </View>
          <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white">
            <Settings size={14} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-2xl font-bold text-slate-900 mt-4">
          Ahmed Hassan
        </Text>
        <Text className="text-slate-500 font-medium text-sm">
          ahmed@example.so
        </Text>

        <View className="flex-row mt-6 px-6">
          <View className="flex-1 items-center border-r border-slate-200">
            <Text className="text-slate-900 font-bold text-lg">Pro</Text>
            <Text className="text-slate-400 text-xs uppercase tracking-tighter">
              Plan
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-slate-900 font-bold text-lg">2024</Text>
            <Text className="text-slate-400 text-xs uppercase tracking-tighter">
              Member Since
            </Text>
          </View>
        </View>
      </View>

      <View className="px-6 py-4">
        {/* Account Section */}
        <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
          Account
        </Text>
        <View className="mb-6">
          <SettingItem
            icon={User}
            title="Personal Info"
            subtitle="Edit your name and location"
          />
          <SettingItem
            icon={CreditCard}
            title="Linked Banks"
            subtitle="2 accounts connected"
          />
          <SettingItem
            icon={Shield}
            title="Security"
            subtitle="FaceID and Passcode"
          />
        </View>

        {/* Preferences Section */}
        <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
          Preferences
        </Text>
        <View className="mb-6">
          <SettingItem
            icon={Bell}
            title="Notifications"
            isSwitch={true}
            value={true}
          />
          <SettingItem icon={HelpCircle} title="Support Center" />
          <SettingItem icon={ExternalLink} title="Terms of Service" />
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

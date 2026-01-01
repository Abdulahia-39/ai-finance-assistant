import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { Link } from "expo-router";

const LoginScreen = () => {
  return (
    <View className="flex-1 justify-center">
      {/* Header Section */}
      <View className="mb-10">
        <Text className="text-4xl font-bold text-blue-600 text-center">
          Welcome Back
        </Text>
        <Text className="text-slate-500 mt-2 text-lg text-center">
          Sign in to continue your journey.
        </Text>
      </View>

      {/* Form Fields */}
      <View className="space-y-4 flex flex-col gap-2">
        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Mail size={20} color="#64748b" />
          </View>
          <TextInput
            placeholder="Email Address"
            className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 shadow-sm"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Lock size={20} color="#64748b" />
          </View>
          <TextInput
            placeholder="Password"
            className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 shadow-sm"
            secureTextEntry
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-blue-500 mt-8 rounded-2xl py-4 flex-row justify-center items-center shadow-lg shadow-blue-300"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-semibold mr-2">Sign In</Text>
        <ArrowRight size={20} color="white" />
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-12 flex-row justify-center">
        <Text className="text-slate-500">Don't have an account? </Text>
        <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;

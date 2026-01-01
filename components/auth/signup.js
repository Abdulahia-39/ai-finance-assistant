import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react-native";

const SignupScreen = () => {
  return (
    <View className="flex-1 justify-center">
      {/* Header */}
      <View className="mb-10">
        <Text className="text-4xl font-bold text-blue-600 text-center">
          Create Account
        </Text>
        <Text className="text-slate-500 mt-2 text-lg text-center">
          Join us and start your journey today.
        </Text>
      </View>

      {/* Form Fields */}
      <View className="space-y-4">
        {/* Full Name Field */}
        <View className="relative mb-2">
          <View className="absolute left-4 top-4 z-10">
            <User size={20} color="#64748b" />
          </View>
          <TextInput
            placeholder="Full Name"
            className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 shadow-sm"
          />
        </View>

        {/* Email Field */}
        <View className="relative mb-2">
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

        {/* Password Field */}
        <View className="relative mb-2">
          <View className="absolute left-4 top-4 z-10">
            <Lock size={20} color="#64748b" />
          </View>
          <TextInput
            placeholder="Password"
            className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 shadow-sm"
            secureTextEntry
          />
        </View>

        {/* Confirm Password Field */}
        <View className="relative">
          <View className="absolute left-4 top-4 z-10">
            <Lock size={20} color="#64748b" />
          </View>
          <TextInput
            placeholder="Confirm Password"
            className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 shadow-sm"
            secureTextEntry
          />
        </View>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        className="bg-blue-500 mt-8 rounded-2xl py-4 flex-row justify-center items-center shadow-lg shadow-blue-300"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-semibold mr-2">
          Create Account
        </Text>
        <ArrowRight size={20} color="white" />
      </TouchableOpacity>

      {/* Link to Login */}
      <View className="mt-10 flex-row justify-center">
        <Text className="text-slate-500">Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text className="text-blue-600 font-bold">Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default SignupScreen;

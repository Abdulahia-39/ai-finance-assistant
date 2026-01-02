import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react-native";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Invalid password", "Passwords must match");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name: name,
        email: email,
        password: password,
      });
      login(email, password);
    } catch (err) {
      Alert.alert("Error", "Invalid Credentials");
    }
  };

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
            value={name}
            onChangeText={setName}
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
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        className="bg-blue-500 mt-8 rounded-2xl py-4 flex-row justify-center items-center shadow-lg shadow-blue-300"
        activeOpacity={0.8}
        onPress={handleRegister}
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

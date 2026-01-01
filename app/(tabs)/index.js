import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { logout } = React.useContext(AuthContext);
  return (
    <View className="flex-1 flex items-center justify-center">
      <Text>Home page</Text>
      <Link href="/signup">Sign up</Link>
      <TouchableOpacity className="mt-5 bg-blue-600 p-5" onPress={logout}>
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

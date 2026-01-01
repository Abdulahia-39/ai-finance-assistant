import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 flex items-center justify-center">
      <Text>Home page</Text>
      <Link href="/signup">Sign up</Link>
    </View>
  );
}

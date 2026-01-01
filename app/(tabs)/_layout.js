import { Ionicons } from "@expo/vector-icons";
import { Tabs, Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userToken) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

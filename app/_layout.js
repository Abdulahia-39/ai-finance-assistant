import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { AIProvider } from "../context/AiContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AIProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AIProvider>
    </AuthProvider>
  );
}

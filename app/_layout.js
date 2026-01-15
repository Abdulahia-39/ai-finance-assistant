import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { AIProvider } from "../context/AiContext";
import { TransactionProvider } from "../context/TransactionContext";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <AuthProvider>
        <AIProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AIProvider>
      </AuthProvider>
    </TransactionProvider>
  );
}

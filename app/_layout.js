import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { AIProvider } from "../context/AiContext";
import { TransactionProvider } from "../context/TransactionContext";
import { GoalsProvider } from "../context/GoalsContext";

export default function RootLayout() {
  return (
    <TransactionProvider>
      <AuthProvider>
        <GoalsProvider>
          <AIProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </AIProvider>
        </GoalsProvider>
      </AuthProvider>
    </TransactionProvider>
  );
}

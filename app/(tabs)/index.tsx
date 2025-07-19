// app/index.tsx
import { registerForPushNotifications } from "@/utils/notifications";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KindPulse</Text>
      <Text style={styles.subtitle}>
        You’ll receive 3 gentle reminders daily. You are not alone.
      </Text>
      <Text style={styles.status}>🕊 Reminders Enabled</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    color: "#4CAF50",
    fontWeight: "600",
  },
});

// app/index.tsx
import { registerForPushNotifications } from "@/utils/notifications";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [granted, setGranted] = useState<boolean>(false);

  useEffect(() => {
    // Check permission on mount
    Notifications.getPermissionsAsync().then((res) => {
      console.log("Initial check:", res.status);
      if (res.status === "granted") {
        setGranted(true);
      }
    });
  }, []);

  const handlePress = async () => {
    const success = await registerForPushNotifications();
    setGranted(success);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KindPulse</Text>
      <Text style={styles.subtitle}>
        A gentle reminder app to make you feel seen and safe.
      </Text>

      {!granted && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Enable Reminders</Text>
        </Pressable>
      )}

      {granted && <Text style={styles.status}>✅ Notifications Enabled</Text>}

      <Text style={styles.footer}>🕊 Lofi soulcare for your mind</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6EC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginBottom: 28,
    maxWidth: 300,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#C9E4C5",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    backgroundColor: "#B6DAB4",
  },
  buttonText: {
    fontSize: 16,
    color: "#2F4F4F",
    fontWeight: "500",
    textAlign: "center",
  },
  status: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: "#A07F6B",
    fontStyle: "italic",
  },
});

import affirmations from "@/data/affirmations.json";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Types from JSON
type AffirmationData = typeof affirmations;
type TimeType = keyof AffirmationData; // 'morning' | 'noon' | 'night'

// Get random message from category
function getRandomAffirmation(type: TimeType): string {
  const messages = affirmations[type];
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

// Get hour based on type
function getTimeHour(type: TimeType): number {
  switch (type) {
    case "morning":
      return 9;
    case "noon":
      return 14;
    case "night":
      return 21;
  }
}

export async function scheduleDailyNotifications() {
  const types: TimeType[] = ["morning", "noon", "night"];

  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const type of types) {
    const content = {
      title: "KindPulse",
      body: getRandomAffirmation(type),
      sound: Platform.OS === "ios" ? "default" : undefined,
    };

    // const trigger = {
    //   type: "calendar",
    //   hour: getTimeHour(type),
    //   minute: 0,
    //   repeats: true,
    // } as Notifications.CalendarTriggerInput;

    const trigger = {
      seconds: 2,
      repeats: true,
    } as Notifications.TimeIntervalTriggerInput;

    await Notifications.scheduleNotificationAsync({ content, trigger });
    console.log(`✅ Scheduled ${type} at ${getTimeHour(type)}:00`);
  }
}

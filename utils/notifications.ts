import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotifications(): Promise<void> {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission required for notifications to work.");
    }
  } else {
    alert("Must use a physical device for notifications.");
  }
}

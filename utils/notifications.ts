// utils/notifications.ts
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotifications(): Promise<boolean> {
  if (!Device.isDevice) {
    alert("Must use physical device for notifications.");
    return false;
  }

  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    console.log("Existing status:", existingStatus);

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log("New status:", finalStatus);
    }

    return finalStatus === "granted";
  } catch (error) {
    console.error("Error requesting permissions:", error);
    return false;
  }
}

// export async function registerForPushNotifications(): Promise<boolean> {
//   const { status } = await Notifications.getPermissionsAsync();
//   console.log("[PERMISSION STATUS]:", status);

//   if (status !== "granted") {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     console.log("[REQUESTED NEW STATUS]:", newStatus);
//     if (newStatus !== "granted") {
//       alert("Permission denied");
//       return false;
//     }
//     return true;
//   }

//   return true;
// }

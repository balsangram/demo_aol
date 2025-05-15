import axios from "axios";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { addToken } from "./src/allapi/api";
import toast from "react-hot-toast"; // Import react-hot-toast
import CustomToast from "./src/components/CustomToast";

// Notify function to show success notification
const notify = (msg: string) => toast.success(msg);

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestForToken = async (): Promise<void> => {
  try {
    // Check for notification permission
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Get the FCM token
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // Corrected to VITE_ prefix
      });

      if (token) {
        console.log("FCM Web Token:", token);
        localStorage.setItem("aolfcmToken", token);
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        const phone = localStorage.getItem("phone");
        console.log(username, email, phone);

        // Send token to your backend
        axios
          .post(addToken, { token, username, email, phone })
          .then((response) => {
            console.log(response, "response");
            // notify("Token successfully sent to server!");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to send token to server.");
          });
      }
    } else {
      console.log("Notification permission denied.");
      toast.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
    toast.error("Error getting FCM token.");
  }
};

// Initialize the message listener only once
let isMessageListenerRegistered = false;

export const initializeMessageListener = () => {
  if (isMessageListenerRegistered) return;

  isMessageListenerRegistered = true;

  onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);

    const title = payload?.notification?.title || "Notification";
    const body = payload?.notification?.body || "You have a new message.";

    // Show toast notification with react-hot-toast
    toast.success(`${title}: ${body}`, {
      duration: 4000,
      position: "top-right",
    });

    // Show system notification
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  });
};

if (!isMessageListenerRegistered) {
  isMessageListenerRegistered = true;

  onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);

    const title =
      payload?.notification?.title || payload?.data?.title || "Notification";
    const body =
      payload?.notification?.body ||
      payload?.data?.body ||
      "You have a new message.";

    // ✅ Show custom toast
    toast.custom((t) => <CustomToast title={title} body={body} />);

    // ✅ Optional system notification
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  });
}

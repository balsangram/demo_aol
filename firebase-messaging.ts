import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { addToken } from "./src/allapi/api";
import { ToastContainer, toast } from 'react-toastify';
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
        vapidKey: import.meta.env.REACT_APP_FIREBASE_VAPID_KEY, // From Firebase Cloud Messaging
      });

      if (token) {
        console.log("FCM Web Token:", token);
        // Send token to your backend
        axios.post(addToken, { token })
          .then((response) => {
            console.log(response, "response");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

// Handle foreground push notifications
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
const title = payload?.notification?.title;
const body = payload?.notification?.body;

  // Displaying an alert with the notification title
  alert(`${title}\n\n${body}`);
  // <CustomToast title={payload?.notification?.title} body={payload?.notification?.body} />

});

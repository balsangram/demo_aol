// firebase-messaging.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAAxzK29bYT1V-DWBU_jCrclegWCbSjqZM",
  authDomain: "art-of-living-1b75a.firebaseapp.com",
  projectId: "art-of-living-1b75a",
  storageBucket: "art-of-living-1b75a.firebasestorage.app",
  messagingSenderId: "977417645515",
  appId: "1:977417645515:web:a7b36ae35f6cd485841a4e",
  measurementId: "G-F7XKVV9G2M",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request Permission and Get Token
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "cFZBSFLGR0uAVdYvjjAu-d:APA91bH9tTDzc1dYkzkleAdhxkdYau1PQKVW7N_VtHOZnI5AZUcsfHvKKFJzXzrE-iP7oK2hD4juAm5f3HMLwufjcgh6ZuLP0S5Fz4b4-C24jjYdiLYjb-s", // From Firebase > Cloud Messaging tab
      // vapidKey: "YOUR_PUBLIC_VAPID_KEY", // From Firebase > Cloud Messaging tab
    });

    if (token) {
      console.log("FCM Web Token:", token);
      // Send this token to your backend just like mobile token
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  // You can show a custom notification here if needed
});

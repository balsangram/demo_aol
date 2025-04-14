// firebaseConfig.ts or firebaseInit.ts

import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import axios from "axios";
import { addToken } from "./src/allapi/api";

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

// Request FCM token
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.REACT_APP_FIREBASE_VAPID_KEY,
      });

      if (token) {
        console.log("✅ FCM Token:", token);
        await axios.post(addToken, { token });
      }
    } else {
      console.log("❌ Notification permission denied.");
    }
  } catch (err) {
    console.error("🔥 Error getting token", err);
  }
};

// 👇 Flag to ensure it's only registered once
let isMessageListenerRegistered = false;

export const registerOnMessageListener = () => {
  if (isMessageListenerRegistered) return;
  isMessageListenerRegistered = true;

  onMessage(messaging, (payload) => {
    const title = payload?.notification?.title;
    const body = payload?.notification?.body;
    console.log("📩 Message received in foreground:", payload);

    alert(`${title}\n\n${body}`);
  });
};



// import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { addToken } from "./src/allapi/api";
// import { ToastContainer, toast } from 'react-toastify';
// import CustomToast from "./src/components/CustomToast";

// // Notify function to show success notification
// const notify = (msg: string) => toast.success(msg);

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Request permission and get token
// export const requestForToken = async (): Promise<void> => {
//   try {
//     // Check for notification permission
//     const permission = await Notification.requestPermission();

//     if (permission === "granted") {
//       // Get the FCM token
//       const token = await getToken(messaging, {
//         vapidKey: import.meta.env.REACT_APP_FIREBASE_VAPID_KEY, // From Firebase Cloud Messaging
//       });

//       if (token) {
//         console.log("FCM Web Token:", token);
//         // Send token to your backend
//         axios.post(addToken, { token })
//           .then((response) => {
//             console.log(response, "response");
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//     } else {
//       console.log("Notification permission denied.");
//     }
//   } catch (error) {
//     console.error("Error getting FCM token", error);
//   }
// };

// // Handle foreground push notifications
// let isMessageListenerRegistered = false;

// onMessage(messaging, (payload) => {
//   if (isMessageListenerRegistered) return;
//   isMessageListenerRegistered = true;

//   console.log("Message received in foreground:", payload);
// const title = payload?.notification?.title;
// const body = payload?.notification?.body;

//   // Displaying an alert with the notification title
//   alert(`${title}\n\n${body}`);
//   // <CustomToast title={payload?.notification?.title} body={payload?.notification?.body} />

// });

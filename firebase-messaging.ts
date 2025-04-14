// firebase-messaging.js
import axios from "axios";
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken, onMessage } from "firebase/messaging";
import { addToken } from "./src/allapi/api";
import { ToastContainer, toast } from 'react-toastify';

const notify = (msg: string) => toast.success(msg);
// const firebaseConfig = {
//   apiKey: "AIzaSyAAxzK29bYT1V-DWBU_jCrclegWCbSjqZM",
//   authDomain: "art-of-living-1b75a.firebaseapp.com",
//   projectId: "art-of-living-1b75a",
//   storageBucket: "art-of-living-1b75a.firebasestorage.app",
//   messagingSenderId: "977417645515",
//   appId: "1:977417645515:web:a7b36ae35f6cd485841a4e",
//   measurementId: "G-F7XKVV9G2M",
// };

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

// Request Permission and Get Token
export const requestForToken = async () => {
  try {
    // await deleteToken(messaging);
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.REACT_APP_FIREBASE_VAPID_KEY, // From Firebase > Cloud Messaging tab
   
      // vapidKey: "BNlMjTdPBDohBDzxJ2Vujcxvr7Rf9RN9Q3aWdhO267sx5cd6bbFM-Z6Ihtxv_j7kOuqzEkuJSCuDmPk6EyyaSKc", // From Firebase > Cloud Messaging tab
      // vapidKey: "YOUR_PUBLIC_VAPID_KEY", // From Firebase > Cloud Messaging tab
    });

    if (token) {
      console.log("FCM Web Token:", token);
      // Send this token to your backend just like mobile token
    }
    axios.post(addToken ,{token}).then((response)=>{
      console.log(response,"response");
    }).catch((Err)=>{
      console.log(Err);
      
    })
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};


// Listen for foreground messages
// onMessage(messaging, (payload) => {
//   console.log("Message received in foreground:", payload);
//   // You can show a custom notification here if needed
//   // <ToastContainer />
//   // alert(payload.notification?.title);
//   // toast()
  
  
// });   


onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  
  const title = payload?.notification?.title || 'New Notification';
  notify(title);
});

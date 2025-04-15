// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png", // Optional: adjust based on your public assets
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// // public/firebase-messaging-sw.js
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js"
// );

// firebase.initializeApp({
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/logo192.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// /* firebase-messaging-sw.js */
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
// );

// // firebase.initializeApp({
// //   apiKey: "AIzaSyAAxzK29bYT1V-DWBU_jCrclegWCbSjqZM",
// //   authDomain: "art-of-living-1b75a.firebaseapp.com",
// //   projectId: "art-of-living-1b75a",
// //   storageBucket: "art-of-living-1b75a.firebasestorage.app",
// //   messagingSenderId: "977417645515",
// //   appId: "1:977417645515:web:a7b36ae35f6cd485841a4e",
// //   measurementId: "G-F7XKVV9G2M",
// // });

// firebase.initializeApp({
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Background message received: ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     // icon: "/logo192.png", // Optional icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

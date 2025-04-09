/* firebase-messaging-sw.js */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAAxzK29bYT1V-DWBU_jCrclegWCbSjqZM",
  authDomain: "art-of-living-1b75a.firebaseapp.com",
  projectId: "art-of-living-1b75a",
  storageBucket: "art-of-living-1b75a.firebasestorage.app",
  messagingSenderId: "977417645515",
  appId: "1:977417645515:web:a7b36ae35f6cd485841a4e",
  measurementId: "G-F7XKVV9G2M",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/logo192.png", // Optional icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

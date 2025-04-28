import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// Tailwind css
import "./tailwind.css";

// i18n (needs to be bundled)
import "./i18n";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";
import { LanguageProvider } from "./context/LanguageContext";

// Service Worker registration
// navigator.serviceWorker
//   .register("/firebase-messaging-sw.js")
//   .then((registration) => {
//     // Service worker registered successfully
//     console.log("Service Worker registered:", registration);
//   })
//   .catch((error) => {
//     console.error("Service Worker registration failed:", error);
//   });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("🔥 Service Worker registered:", registration);
    })
    .catch((err) => console.error("SW registration failed:", err));
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Suspense>
    <Provider store={store}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </Suspense>
  // {/* </React.StrictMode> */}
);

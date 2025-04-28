import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Internal from "../pages/internal/Internal";
import Internal2 from "../pages/internal/Internal2";
import LiveVideo from "../pages/LiveVideo";
import SearchPage from "../components/search/SearchPage";
import Login from "../pages/auth/Login";
// import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import Profile from "../pages/profile/Profile";

const Home = lazy(() => import("../pages/Home"));

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    layout: "default",
  },
  {
    path: "/internal",
    element: (
      // <PrivateRoute
      //   element={
      <Suspense fallback={<div>Loading...</div>}>
        <Internal />
      </Suspense>
      //   }
      // />
    ),
  },
  {
    path: "/internal2",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Internal2 />
      </Suspense>
    ),
  },
  {
    path: "/live_link",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LiveVideo />
      </Suspense>
    ),
  },
  {
    path: "/searchPage",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPage />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect unknown routes to Home
  },
];

export { routes };

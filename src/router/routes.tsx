import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/Profile";
import Direction from "../pages/direction/Direction";
import ChooseDirection from "../pages/direction/ChooseDirection";
import Register from "../pages/auth/Register";
import Favourite from "../pages/favourite/Favourite";
import Otp from "../pages/auth/Otp";

const Home = lazy(() => import("../pages/Home"));
const Internal = lazy(() => import("../pages/internal/Internal"));
const Internal2 = lazy(() => import("../pages/internal/Internal2"));
const LiveVideo = lazy(() => import("../pages/LiveVideo"));
const SearchPage = lazy(() => import("../components/search/SearchPage"));

const routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
    {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </PrivateRoute>
    ),
    layout: "default",
  },
  {
    path: "/internal",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Internal />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/internal2",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Internal2 />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/live_link",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <LiveVideo />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/searchPage",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchPage />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/choose_direction",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ChooseDirection />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/display_direction",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Direction />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/direction_details",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: "/favourite",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Favourite />
        </Suspense>
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export { routes };

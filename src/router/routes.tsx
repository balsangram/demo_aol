import path from "path";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
// import CreateCard from "../pages/CreateCard";
// import Advertisement from '../pages/Advertisement';
// import Update from '../pages/Update';
// import UpdateDetails from "../pages/UpdateDetails";
// import Events from '../pages/Events';
// import Popup from '../pages/Popup';
import Internal from "../pages/internal/Internal";
// import SisterTrust from "../pages/SisterTrust/SisterTrust";
// import AdvertisementBar from "../../ex/Slide/AdvertisementBar";
import Internal2 from "../pages/internal/Internal2";
import LiveVideo from "../pages/LiveVideo";
import SearchPage from "../components/search/SearchPage";

const Home = lazy(() => import("../pages/Home"));
// const Login = lazy(() => import("../../ex/Login"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    layout: "default", // Ensure this is actually used somewhere
  },
  {
    path: "/internal",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Internal />
      </Suspense>
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
    path: "*",
    element: <Navigate to="/" />, // Redirect unknown routes to Home
  },
];

export { routes };

// import React from "react";
// import { Route, Navigate, RouteProps } from "react-router-dom";

// // Define the PrivateRoute component props
// interface PrivateRouteProps extends RouteProps {
//   element: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
//   const isAuthenticated = localStorage.getItem("userLoggedIn"); // Check if the user is logged in

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? element : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;

// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("userLoggedIn") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;


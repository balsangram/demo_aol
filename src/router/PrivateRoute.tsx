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

import React from "react";

function PrivateRoute() {
  return <div>PrivateRoute</div>;
}

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Your auth context file

const PrivateRoute = ({ children, allowedRoles=[] }) => {
  const { user } = useAuth();

  console.log("Auth User", user);
  console.log("Allowed roles", allowedRoles);

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Unauthorized, user role is:", user.role);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};


export default PrivateRoute;

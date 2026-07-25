import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default Protected;

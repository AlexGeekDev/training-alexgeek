import React from "react";
import { useUiDataContext } from "../context/uiContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { active } = useUiDataContext();
  return active ? children : <Navigate to="/login" />;
};

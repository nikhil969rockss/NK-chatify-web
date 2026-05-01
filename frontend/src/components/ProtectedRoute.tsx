import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  return children;
};

export default ProtectedRoute;

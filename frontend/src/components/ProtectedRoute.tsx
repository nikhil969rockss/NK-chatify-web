import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import LoadingPage from "../pages/LoadingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth, isAuthenticated, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  if (isCheckingAuth) {
    return (
      <Layout>
        <LoadingPage />
      </Layout>
    );
  }

  return children;
};

export default ProtectedRoute;

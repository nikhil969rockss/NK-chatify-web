import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedAuthRoute;

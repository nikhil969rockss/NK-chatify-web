import { createBrowserRouter } from "react-router";
// import App from "./App.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProtectedAuthRoute from "./components/ProtectedAuthRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <ChatPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedAuthRoute>
        <Layout>
          <LoginPage />
        </Layout>
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedAuthRoute>
        <Layout>
          <SignupPage />
        </Layout>
      </ProtectedAuthRoute>
    ),
  },
]);

export default router;

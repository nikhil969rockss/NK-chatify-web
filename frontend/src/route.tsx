import { createBrowserRouter } from "react-router";
// import App from "./App.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

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
      <Layout>
        <LoginPage />,
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignupPage />,
      </Layout>
    ),
  },
]);

export default router;

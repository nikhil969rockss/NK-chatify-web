import { createBrowserRouter } from "react-router";
// import App from "./App.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <ChatPage />
      </Layout>
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

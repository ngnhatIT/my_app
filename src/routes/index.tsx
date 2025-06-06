import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import App from "../App";
import type { RootState } from "../store";

// Component bảo vệ route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

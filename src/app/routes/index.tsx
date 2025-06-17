import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";

import { ProtectedRoute } from "./ProtectedRoute";
import MainLayout from "../../layouts/MainLayout";
import { securityRoutes } from "./securityRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [securityRoutes],
  },
  authRoutes,
]);

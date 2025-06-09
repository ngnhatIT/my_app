import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import WorkspaceList from "../pages/Workspace/WorkspaceList";
import WorkspaceForm from "../pages/Workspace/WorkspaceForm";

import UserList from "../pages/User/UserList";
import UserForm from "../pages/User/UserForm";
import DeviceManagement from "../pages/User/DeviceManagement";
import Profile from "../pages/User/Profile";
import PermissionManagement from "../pages/User/PermissionManagement";
import GoogleSheetList from "../pages/GoogleSheet/GoogleSheetList";
import GoogleSheetForm from "../pages/GoogleSheet/GoogleSheetForm";
import GoogleSheetPermission from "../pages/GoogleSheet/GoogleSheetPermission";
import GoogleSheetView from "../pages/GoogleSheet/GoogleSheetView";
import WorkspaceChangePassword from "../pages/Workspace/WorkspaceChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "workspaces",
        element: (
          <ProtectedRoute>
            <WorkspaceList />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <WorkspaceForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":workspaceId/change-password",
            element: (
              <ProtectedRoute>
                <WorkspaceChangePassword />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":userId/edit",
            element: (
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            ),
          },
          {
            path: "devices",
            element: (
              <ProtectedRoute>
                <DeviceManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "permissions",
            element: (
              <ProtectedRoute>
                <PermissionManagement />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "googlesheets",
        element: (
          <ProtectedRoute>
            <GoogleSheetList />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <GoogleSheetForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":sheetId/edit",
            element: (
              <ProtectedRoute>
                <GoogleSheetForm />
              </ProtectedRoute>
            ),
          },
          {
            path: ":sheetId/permissions",
            element: (
              <ProtectedRoute>
                <GoogleSheetPermission />
              </ProtectedRoute>
            ),
          },
          {
            path: ":sheetId/view",
            element: (
              <ProtectedRoute>
                <GoogleSheetView />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

export default router;

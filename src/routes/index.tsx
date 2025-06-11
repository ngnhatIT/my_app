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
import GoogleSheetList from "../pages/GoogleSheet/GoogleSheetList";
import GoogleSheetForm from "../pages/GoogleSheet/GoogleSheetForm";
import GoogleSheetPermission from "../pages/GoogleSheet/GoogleSheetPermission";
import GoogleSheetView from "../pages/GoogleSheet/GoogleSheetView";
import WorkspaceChangePassword from "../pages/Workspace/WorkspaceChangePassword";
import OtpForm from "../pages/Auth/OtpForm";
import WorkspaceAddUser from "../pages/Workspace/WorkspaceAddUser";

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
        path: "settings",
        children: [{}],
      },
      {
        path: "settings/workspaces",
        element: (
          <ProtectedRoute>
            <WorkspaceList />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/workspaces/new",
        element: (
          <ProtectedRoute>
            <WorkspaceForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/workspaces/:workspaceId/change-password",
        element: (
          <ProtectedRoute>
            <WorkspaceChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings/workspaces/:workspaceId/add-user",
        element: (
          <ProtectedRoute>
            <WorkspaceAddUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/:userId/edit",
        element: (
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/new",
        element: (
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/googlesheets",
        element: (
          <ProtectedRoute>
            <GoogleSheetList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/googlesheets/new",
        element: (
          <ProtectedRoute>
            <GoogleSheetForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/googlesheets/:sheetId/edit",
        element: (
          <ProtectedRoute>
            <GoogleSheetForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/googlesheets/:sheetId/permissions",
        element: (
          <ProtectedRoute>
            <GoogleSheetPermission />
          </ProtectedRoute>
        ),
      },
      {
        path: "/googlesheets/:sheetId/view",
        element: (
          <ProtectedRoute>
            <GoogleSheetView />
          </ProtectedRoute>
        ),
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
      { path: "otp", element: <OtpForm /> },
    ],
  },
]);

export default router;

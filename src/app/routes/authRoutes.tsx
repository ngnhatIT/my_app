import ForgotPassword from "../../features/auth/pages/ForgotPassword";
import Login from "../../features/auth/pages/Login";
import OtpForm from "../../features/auth/pages/OtpForm";
import Register from "../../features/auth/pages/Register";
import ResetPassword from "../../features/auth/pages/ResetPassword";
import { AuthLayout } from "../../layouts/AuthLayout";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "reset-password", element: <ResetPassword /> },
    { path: "verify-otp", element: <OtpForm /> },
  ],
};

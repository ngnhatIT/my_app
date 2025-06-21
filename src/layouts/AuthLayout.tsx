import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import type { RootState } from "../app/store";

import "../css/layout.css";
import  AuthLeftPanel  from "./AuthLeftPanel";

import bgLight from "../assets/bg-light.png"; // ảnh nền sáng

export const AuthLayout = () => {
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const layoutClass = isDark ? "login-dark-mode-EN" : "login-light-mode-EN";

  return (
    <div
      className={layoutClass}
      style={
        !isDark
          ? {
              backgroundImage: `url(${bgLight})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* Ellipse chỉ dùng ở dark mode */}
      {isDark && (
        <>
          <div className="ellipse" />
          <div className="ellipse-2" />
        </>
      )}

      {/* Flex wrapper */}
      <div className="auth-container">
        {/* Left Panel */}
        <div className="flex-[2]">
            <AuthLeftPanel />
        </div>

        {/* Right Panel */}
        <div className="flex-[3]">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

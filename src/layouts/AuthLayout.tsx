// src/layouts/AuthLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Select, theme as antdTheme } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../app/store";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

export default function AuthLayout() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-10">
        <Select
          value={i18n.language}
          onChange={(val) => i18n.changeLanguage(val)}
          options={languageOptions}
          size="small"
          style={{ width: 120 }}
        />
      </div>

      {/* Auth Content */}
      <div className="w-full max-w-md p-6">
        <Outlet />
      </div>
    </div>
  );
}

// src/layouts/AuthLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../store";

const AuthLayout = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="absolute top-4 right-4">
        <Select
          value={i18n.language}
          onChange={(val) => i18n.changeLanguage(val)}
          options={[
            { value: "en", label: "English" },
            { value: "ja", label: "日本語" },
            { value: "vi", label: "Tiếng Việt" },
          ]}
          style={{ width: 120 }}
        />
      </div>
      <div className="w-full max-w-md p-6 bg-white  ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

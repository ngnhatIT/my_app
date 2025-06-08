import { Outlet } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900">
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
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

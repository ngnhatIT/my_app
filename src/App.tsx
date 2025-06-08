import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Slidebar";
import type { RootState } from "./store";



const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // 👉 Các trang xác thực
  const authPages = ["/login", "/register", "/forgot-password", "/reset-password"];
  const isAuthPage = authPages.includes(location.pathname);

  // ⛔ Nếu đã logout mà user bấm back về private route
  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          colorBgLayout: "#f1f5f9",
        },
      }}
    >
      <Layout className="min-h-screen bg-[#f1f5f9]">
        {!isAuthPage && <Header />}
        <Layout hasSider className="min-h-screen">
          {!isAuthPage && <Sidebar />}
          <Layout className="flex-1 bg-[#f1f5f9]">
            <Content
              className="min-h-[calc(100vh-64px)] p-6"
              style={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                color: isDark ? "#ffffff" : "#1f2937",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

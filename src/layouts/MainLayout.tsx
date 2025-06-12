import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Space,
  Button,
  Typography,
  Switch,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/AuthSlice";
import { theme as antdTheme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sidebar from "../components/layout/Slidebar";
import { toggleTheme } from "../features/setting/ThemeSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";

type AppHeaderProps = {
  isDark: boolean;
  handleToggleTheme: () => void;
  menu: React.ReactNode;
  colorBgContainer: string;
  colorTextBase: string;
  user: { username?: string } | null;
};

const AppHeader: React.FC<AppHeaderProps> = ({
  isDark,
  handleToggleTheme,
  menu,
  colorBgContainer,
  colorTextBase,
  user,
}) => {
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  return (
    <Header
      className="px-4 shadow-sm flex items-center justify-between"
      style={{ background: colorBgContainer }}
    >
      <Space>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="bg-transparent border-none"
          style={{ padding: "8px", color: colorTextBase }}
        />
        <Button
          icon={<ArrowRightOutlined />}
          onClick={handleForward}
          className="bg-transparent border-none"
          style={{ padding: "8px", color: colorTextBase }}
        />
      </Space>
      <Typography.Title
        level={5}
        style={{ marginBottom: 0, color: colorTextBase }}
      >
        Google Sheet Manager
      </Typography.Title>
      <Space>
        <Switch
          checked={isDark}
          onChange={handleToggleTheme}
          size="default"
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
        <Dropdown overlay={menu as React.ReactElement} placement="bottomRight">
          <div
            className="flex items-center gap-2 cursor-pointer"
            style={{ color: colorTextBase }}
          >
            <Avatar>{user?.username?.[0]?.toUpperCase() || "U"}</Avatar>
            <span className="text-sm">{user?.username || "Unknown"}</span>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  const location = useLocation();
  const hideHeader =
    location.pathname.includes("/googlesheets/") &&
    location.pathname.includes("/view");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  ) as React.ReactElement;

  return (
    <Layout className="h-screen overflow-hidden">
      <Layout hasSider>
        <Sidebar />
        <Layout className="flex flex-col">
          {!hideHeader && (
            <AppHeader
              isDark={isDark}
              handleToggleTheme={handleToggleTheme}
              menu={menu}
              colorBgContainer={colorBgContainer}
              colorTextBase={colorTextBase}
              user={user}
            />
          )}
          <Content
            className="flex flex-col flex-1 overflow-hidden"
            style={{ background: colorBgContainer }}
          >
            <div
              className={`flex-1 p-4 ${!hideHeader ? "overflow-auto" : ""}`}
              style={{ color: colorTextBase }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

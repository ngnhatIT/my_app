import {
  Layout,
  Avatar,
  Space,
  Button,
  Typography,
  Switch,
  Dropdown,
  Menu,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/AuthSlice";
import { theme as antdTheme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/setting/ThemeSlice";
import type { RootState } from "../app/store";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Slidebar";

const { Content, Header } = Layout;

const AppHeader = ({
  isDark,
  handleToggleTheme,
  colorBgContainer,
  colorTextBase,
  user,
  isMobile,
  setDrawerVisible,
  handleLogout,
}: any) => {
  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="px-4 shadow-sm flex items-center justify-between"
      style={{ background: colorBgContainer }}
    >
      <Space>
        {isMobile && (
          <Button
            icon={<MenuUnfoldOutlined />}
            onClick={() => setDrawerVisible(true)}
            className="lg:hidden"
            type="text"
            style={{ color: colorTextBase }}
          />
        )}
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ color: colorTextBase }}
          type="text"
          onClick={handleBack}
        />
        <Button
          icon={<ArrowRightOutlined />}
          style={{ color: colorTextBase }}
          type="text"
          onClick={handleForward}
        />
      </Space>
      <Typography.Title
        level={5}
        className="hidden sm:block"
        style={{ marginBottom: 0, color: colorTextBase }}
      >
        Google Sheet Manager
      </Typography.Title>
      <Space className="gap-2">
        <Switch
          checked={isDark}
          onChange={handleToggleTheme}
          size="default"
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div
            className="flex items-center gap-2 cursor-pointer"
            style={{ color: colorTextBase }}
          >
            <Avatar size="small">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <span className="text-sm max-sm:hidden">
              {user?.username || "Unknown"}
            </span>
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
  const location = useLocation();

  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setDrawerVisible(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideHeader =
    location.pathname.includes("/googlesheets/") &&
    location.pathname.includes("/view");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login", { replace: true });
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobile={isMobile}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
      <Layout
        style={{
          marginLeft: !isMobile ? (collapsed ? 60 : 240) : 0,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        {!hideHeader && (
          <AppHeader
            isDark={isDark}
            handleToggleTheme={handleToggleTheme}
            colorBgContainer={colorBgContainer}
            colorTextBase={colorTextBase}
            user={user}
            isMobile={isMobile}
            setDrawerVisible={setDrawerVisible}
            handleLogout={handleLogout}
          />
        )}
        <Content style={{ background: colorBgContainer }}>
          <div
            style={{
              padding: 16,
              minHeight: "100%",
              overflow: "auto",
              color: colorTextBase,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

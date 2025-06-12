// components/layout/Slidebar.tsx
import { Layout, Menu } from "antd";
import { theme as antdTheme } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOutlined,
  DesktopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/users", icon: <UserOutlined />, label: "Users" },
    {
      key: "/googlesheets",
      icon: <FileTextOutlined />,
      label: "Google Sheets",
    },
    {
      key: "security",
      icon: <DesktopOutlined />,
      label: "Security",
      children: [
        {
          key: "/security/audit-log",
          icon: <FolderOutlined />,
          label: "Audit Logs",
        },
        {
          key: "/security/statistical",
          icon: <FolderOutlined />,
          label: "Statistical",
        },
        {
          key: "/security/device-ip",
          icon: <FolderOutlined />,
          label: "Device & IP Management",
        },
        {
          key: "/security/ip-whitelist",
          icon: <FolderOutlined />,
          label: "Ip Whitelist",
        },
        {
          key: "/security/security-incidents",
          icon: <FolderOutlined />,
          label: "Security Incidents",
        },
        {
          key: "/security/setting-system",
          icon: <FolderOutlined />,
          label: "Security Incidents",
        },
      ],
    },
    {
      key: "system",
      icon: <SettingOutlined />,
      label: "System",
      children: [
        {
          key: "/settings/workspaces",
          icon: <FolderOutlined />,
          label: "Workspaces",
        },
        {
          key: "/settings/settings",
          icon: <FolderOutlined />,
          label: "Settings",
        },
        {
          key: "/settings/devices",
          icon: <FolderOutlined />,
          label: "Devices & IP",
        },
      ],
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      breakpoint="lg"
      onBreakpoint={(broken) => setCollapsed(broken)}
      collapsedWidth={60}
      style={{
        height: "100%",
        overflow: "auto",
        background: colorBgContainer,
        color: colorTextBase,
      }}
    >
      <div
        className="p-4 flex items-center justify-between"
        style={{ color: colorTextBase }}
      >
        {!collapsed && (
          <span className="font-semibold text-lg">Sheet Manager</span>
        )}
        <span onClick={toggleCollapsed} className="cursor-pointer ml-auto">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={collapsed ? [] : ["security", "system"]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
        style={{ background: colorBgContainer, color: colorTextBase }}
      />
    </Sider>
  );
};

export default Sidebar;

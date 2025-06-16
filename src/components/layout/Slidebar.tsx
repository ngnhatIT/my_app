import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  GlobalOutlined,
  AlertOutlined,
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { theme as antdTheme, Layout, Menu, Drawer, Tooltip } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isMobile: boolean;
  drawerVisible: boolean;
  setDrawerVisible: (v: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  isMobile,
  drawerVisible,
  setDrawerVisible,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

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
      icon: <LockOutlined />,
      label: "Security",
      children: [
        {
          key: "/security/audit-log",
          icon: <FileSearchOutlined />,
          label: "Audit Logs",
        },
        {
          key: "/security/statistical",
          icon: <BarChartOutlined />,
          label: "Statistical",
        },
        {
          key: "/security/device-ip",
          icon: <GlobalOutlined />,
          label: "Device & IP Management",
        },
        {
          key: "/security/ip-whitelist",
          icon: <GlobalOutlined />,
          label: "IP Whitelist",
        },
        {
          key: "/security/security-incidents",
          icon: <AlertOutlined />,
          label: "Security Incidents",
        },
        {
          key: "/security/setting-system",
          icon: <SettingOutlined />,
          label: "System Settings",
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
          icon: <FileTextOutlined />,
          label: "Workspaces",
        },
        {
          key: "/settings/settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        {
          key: "/settings/devices",
          icon: <GlobalOutlined />,
          label: "Devices & IP",
        },
      ],
    },
  ];

  const menuContent = (
    <>
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold text-primary">
          {!collapsed || isMobile ? "Sheet Manager" : "🗂️"}
        </span>
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xl hover:text-primary transition"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={collapsed ? [] : ["security", "system"]}
        onClick={({ key }) => {
          navigate(key);
          if (isMobile) setDrawerVisible(false);
        }}
        items={menuItems}
      />
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={240}
        placement="left"
        closable={false}
        bodyStyle={{ padding: 0 }}
      >
        {menuContent}
      </Drawer>
    );
  }

  return (
    <Sider
      width={240}
      collapsed={collapsed}
      collapsedWidth={60}
      style={{
        height: "100vh",
        overflow: "auto",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        transition: "all 0.2s",
        background: colorBgContainer,
        color: colorTextBase,
      }}
    >
      {menuContent}
    </Sider>
  );
};

export default Sidebar;

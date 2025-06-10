import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/users", icon: <UserOutlined />, label: "User Management" },
    // {
    //   key: "/googlesheets",
    //   icon: <FileTextOutlined />,
    //   label: "Google Sheets Management",
    // },
    {
      key: "Security & Monitoring",
      icon: <DesktopOutlined />,
      label: "Security & Monitoring",
      children: [
        {
          key: "/settings/workspaces",
          icon: <FolderOutlined />,
          label: "Audit Logs",
        },
        {
          key: "/settings/workspaces/change-password",
          icon: <FolderOutlined />,
          label: "Security Incidents",
        },
      ],
    },
    {
      key: "/googlesheets",
      icon: <FileTextOutlined />,
      label: "Statistical",
    },
    {
      key: "System Management",
      label: "System Management",
      icon: <SettingOutlined />,
      children: [
        {
          key: "/settings/workspaces",
          icon: <FolderOutlined />,
          label: "Workspaces",
        },
        {
          key: "/settings/workspaces/change-password",
          icon: <FolderOutlined />,
          label: "System Settings",
        },
        {
          key: "/settings/workspaces/add-user",
          icon: <FolderOutlined />,
          label: "Device & IP",
        },
      ],
    },
  ];

  return (
    <Sider
      className="bg-white dark:bg-gray-900 shadow h-full"
      width={250}
      style={{ height: "100%", overflow: "auto" }}
    >
      <Menu
        theme="light"
        rootClassName="h-full"
        style={{ height: "100%", borderRight: 0 }}
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;

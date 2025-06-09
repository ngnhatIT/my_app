import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Trang chủ" },
    { key: "/users", icon: <UserOutlined />, label: "Người dùng" },
    {
      key: "/googlesheets",
      icon: <FileTextOutlined />,
      label: "Google Sheets",
    },
    { key: "/settings", icon: <SettingOutlined />, label: "Cài đặt" },
    { key: "/workspaces", icon: <FolderOutlined />, label: "Workspaces" },
  ];

  return (
    <Sider
      className="bg-white dark:bg-gray-900 shadow h-full"
      width={220}
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
        className="dark:bg-gray-900 dark:text-white"
      />
    </Sider>
  );
};

export default Sidebar;

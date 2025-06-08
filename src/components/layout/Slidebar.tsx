import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <HomeOutlined />, label: "Trang chủ" },
    { key: "/users", icon: <UserOutlined />, label: "Người dùng" },
    { key: "/sheets", icon: <FileTextOutlined />, label: "Google Sheets" },
    { key: "/settings", icon: <SettingOutlined />, label: "Cài đặt" },
  ];

  return (
    <Sider className="bg-white dark:bg-gray-900 shadow" width={220}>
      <div className="h-16 bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
        AdminPanel
      </div>
      <Menu
        theme="light"
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

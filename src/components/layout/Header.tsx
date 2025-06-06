import { Layout, Button, Input, Avatar, Typography } from "antd";
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/AuthSlice";
import type { RootState } from "../../store";

const { Text } = Typography;
const { Header } = Layout; // Lấy Header từ Ant Design Layout

interface HeaderProps {
  colorBgContainer?: string;
}

const AppHeader: React.FC<HeaderProps> = ({ colorBgContainer = "#fff" }) => {
  const [collapsed, setCollapsed] = useState(false); // Biến này có vẻ không dùng trong Header này?
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Header
      className="flex items-center px-4 py-3 shadow-sm" // Loại bỏ justify-between ở đây
      style={{ background: colorBgContainer }}
    >
      {/* 1. Phần tử bên trái (có thể là logo/menu toggle) */}
      <div className="flex items-center flex-1">
        <Typography.Title level={4} className="m-0 text-gray-800">
          MVP APP
        </Typography.Title>
      </div>

      {/* 2. Phần giữa (Input Search) */}
      <div className="flex-initial mx-4 w-[20rem] flex items-center gap-2">
        {" "}
        {/* Hoặc w-[Xrem] */}
        <Input placeholder="Search..." className="w-full" />
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
      </div>

      {/* 3. Phần tử bên phải (User Info và Logout) */}
      <div className="flex items-center gap-2 justify-end flex-1">
        {" "}
        {/* justify-end để đẩy nội dung về bên phải, flex-1 để nó giãn ra */}
        <Button type="primary" shape="circle" icon={<SettingOutlined />} />
        <Avatar className="ml-2" icon={<UserOutlined />} size="default" />
      </div>
    </Header>
  );
};

export default AppHeader;

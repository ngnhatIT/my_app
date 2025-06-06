import { Layout } from "antd";
import { Button, Input, Avatar, Typography } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/AuthSlice";
import type { RootState } from "../../store";

const { Text } = Typography;
const { Header } = Layout;

interface HeaderProps {
  colorBgContainer?: string;
}

const AppHeader: React.FC<HeaderProps> = ({ colorBgContainer = "#fff" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Header
      className="flex items-center justify-between px-4 py-3 shadow-sm"
      style={{ background: colorBgContainer }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="text-xl hover:bg-gray-100 rounded-full p-2"
      />
      <div className="flex items-center gap-3 flex-1 mx-4">
        <Input placeholder="Search..." className="max-w-md" />
      </div>
      <div className="flex items-center gap-2">
        <Text className="text-base">{user?.name || "Guest"}</Text>
        <Button
          type="text"
          icon={<SettingOutlined className="text-base" />}
          iconPosition="end"
          className="text-base hover:bg-gray-100 rounded-full p-2"
        />
        <Avatar className="ml-2" icon={<UserOutlined />} size="large" />
        {user && (
          <Button
            type="text"
            icon={<LogoutOutlined className="text-base" />}
            onClick={handleLogout}
            className="text-base hover:bg-gray-100 rounded-full p-2"
          />
        )}
      </div>
    </Header>
  );
};

export default AppHeader;

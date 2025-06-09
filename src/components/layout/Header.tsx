import { Layout, Avatar, Dropdown, Menu, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { logout } from "../../features/auth/AuthSlice";

const { Header } = Layout;

const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="bg-white dark:bg-gray-800 px-4 flex items-center justify-between shadow-sm"
      style={{ height: "64px", padding: "0 16px" }}
    >
      <Typography.Title level={4} className="!mb-0 !text-blue-600">
        Quản trị hệ thống
      </Typography.Title>
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>{user?.username?.[0]?.toUpperCase()}</Avatar>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {user?.username}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;

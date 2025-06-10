import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Slidebar";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/auth/AuthSlice";

const { Content } = Layout;

const MainLayout = () => {
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

  const Navbar = () => {
    const handleBack = () => {
      window.history.back();
    };

    const handleForward = () => {
      window.history.forward();
    };

    return (
      <div
        className="p-4 mb-4 shadow-md"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "transparent",
        }}
      >
        <Space className="flex justify-between items-center w-full">
          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 bg-transparent rounded-full border-none"
              style={{ padding: "8px" }}
            />
            <Button
              icon={<ArrowRightOutlined />}
              onClick={handleForward}
              className="text-gray-600 hover:text-gray-800 bg-transparent rounded-full border-none"
              style={{ padding: "8px" }}
            />
          </Space>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>{user?.username?.[0]?.toUpperCase() || "U"}</Avatar>
              <span className="text-sm text-gray-700">
                {user?.username || "Unknown"}
              </span>
            </div>
          </Dropdown>
        </Space>
      </div>
    );
  };

  return (
    <Layout className="h-screen flex flex-col overflow-hidden">
      <Layout hasSider className="flex-1 overflow-hidden">
        <Sidebar />
        <Layout className="bg-white flex-1">
          <Content className="p-0 flex-1" style={{ height: "100%", margin: 0 }}>
            <div className="h-full w-full">
              <Navbar />
              <div
                style={{
                  padding: "16px",
                  overflowY: "auto",
                  height: "calc(100% - 64px)",
                }}
              >
                <Outlet />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

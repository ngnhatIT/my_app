import { Avatar, Dropdown, Layout, Menu, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/auth/AuthSlice";
import Sidebar from "../components/layout/Slidebar"; // Giả sử bạn có component này

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
        className="p-4 shadow-md bg-white" // Đã xóa position sticky, zIndex và backgroundColor transparent
        style={{ flexShrink: 0 }} // Ngăn Navbar bị co lại
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

  // HOÀN TOÀN LOẠI BỎ: useRef, useState, và useEffect để tính chiều cao Navbar

  return (
    <Layout className="h-screen overflow-hidden">
      <Layout hasSider>
        <Sidebar />
        {/* SỬA ĐỔI TẠI ĐÂY */}
        <Layout className="flex flex-col">
          {/* Content sẽ là container chính cho Navbar và Outlet */}
          <Content className="flex flex-col flex-1 overflow-hidden">
            {/* 1. Navbar: chiếm chiều cao cần thiết của nó */}
            <Navbar />

            {/* 2. Outlet container: chiếm toàn bộ không gian còn lại và tự động cuộn */}
            <div className="min-h-height p-4 overflow-auto">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

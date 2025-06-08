import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Slidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout hasSider>
        <Sidebar />
        <Layout className="bg-[#f1f5f9]">
          <Content className="min-h-[calc(100vh-64px)] p-6">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Slidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Layout hasSider className="flex-1 overflow-hidden">
        <Sidebar />
        <Layout className="bg-[#f1f5f9] flex-1 overflow-hidden">
          <Content className="p-0 flex-1" style={{ height: "100%", margin: 0 }}>
            <div style={{ height: "100%", margin: 0, padding: 0 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Slidebar";
import Header from "./components/layout/Header";

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  console.log(location);
  console.log(isLoginPage);

  return (
    <Layout className="min-h-screen">
      {!isLoginPage && <Sidebar />}
      <Layout>
        {!isLoginPage && <Header />}
        <Content className={isLoginPage ? "p-0" : "p-6 bg-gray-100"}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Slidebar";
import Header from "./components/layout/Header";

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const validPaths = ["/", "/settings", "/login"];
  const isValidPage = validPaths.includes(location.pathname.toLowerCase());
  console.log("Location:", location);
  console.log("isValidPage:", isValidPage);

  return (
    <Layout className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      {isValidPage && location.pathname !== "/login" && <Header />}
      <Layout>
        {isValidPage && location.pathname !== "/login" && <Sidebar />}
        <Content
          style={{
            backgroundColor: "#ffffff",
          }}
          className={
            location.pathname === "/login"
              ? "p-0"
              : "p-6 flex-1 flex flex-col overflow-y-auto ligh"
          }
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

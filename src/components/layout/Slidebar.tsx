import { Layout, Menu } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Sider width={200} className="bg-white">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="h-full border-r-0"
        items={
          isAuthenticated
            ? [
                {
                  key: "1",
                  icon: <HomeOutlined />,
                  label: <NavLink to="/">Home</NavLink>,
                },
                {
                  key: "2",
                  icon: <SettingOutlined />,
                  label: <NavLink to="/settings">Settings</NavLink>,
                },
              ]
            : []
        }
      />
    </Sider>
  );
};

export default Sidebar;

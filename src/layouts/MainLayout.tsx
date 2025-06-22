import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/AuthSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/setting/ThemeSlice";
import type { RootState } from "../app/store";
import SiderMenu, { menuItems } from "./sideMenu";
import PageHeader from "./headerMenu";
import SubMenuPanel from "./subMenuPanel";
import { useEffect, useState } from "react";
import "../css/main_layout.css";

const { Footer, Sider, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<string>("");
  const [submenusMap, setSubmenusMap] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveGroup(`/${path}`);
  }, [location.pathname]);

  useEffect(() => {
    const map: Record<string, any[]> = {};
    for (const item of menuItems) {
      if (item.isGroup && item.submenus) {
        map[item.key] = item.submenus;
      }
    }
    setSubmenusMap(map);
  }, []);

  const backgroundClass = isDark
    ? "bg-gradient-238 text-white"
    : "bg-gradient-to-b from-[#e0eafc] to-[#cfdef3] text-black";

  return (
    <div className={`h-screen w-screen overflow-hidden ${backgroundClass}`}>
      <Layout className="h-full w-full bg-transparent">
        <Sider width={151} className="!bg-transparent !text-white">
          <SiderMenu onSelectGroup={(groupKey) => setActiveGroup(groupKey)} />
        </Sider>

        <Layout className="flex flex-col flex-1 bg-transparent">
          <PageHeader />

          <Content className="flex-1 overflow-auto p-3 !bg-transparent">
            <div className="content-glass h-full w-full p-3 rounded-[32px] shadow-xl backdrop-blur-lg flex">
              {activeGroup && submenusMap[activeGroup] && (
                <div className="w-1/4 min-w-[244px] pr-4">

                  <SubMenuPanel group={activeGroup} submenus={submenusMap} />
                </div>
              )}
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </Content>

          <Footer className="text-center text-sm !bg-transparent text-white">
            Copyright © 2025. All Rights Reserved.
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;

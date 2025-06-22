// SidebarLayout.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  LockOutlined,
  SettingOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const menuItems = [
  { key: '/', label: 'Dashboard', icon: <HomeOutlined /> },
  { key: '/users', label: 'Users', icon: <UserOutlined /> },
  { key: '/workspaces', label: 'Workspace', icon: <FileTextOutlined /> },
  { key: '/security', label: 'Security & Monitoring', icon: <LockOutlined /> },
  { key: '/system', label: 'System', icon: <SettingOutlined /> },
  { key: '/statistical', label: 'Statistical', icon: <BarChartOutlined /> },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-full w-24 bg-[#0D0418] flex flex-col items-center pt-6 gap-2 z-50">
      <div className="flex flex-col items-center gap-2 flex-grow">
        {menuItems.map(({ key, label, icon }) => {
          const isActive = location.pathname.startsWith(key);
          return (
            <div
              key={key}
              onClick={() => navigate(key)}
              className={`relative flex flex-col items-center justify-center gap-1 p-3 w-[5.375rem] rounded-2xl cursor-pointer transition-all duration-200
                ${isActive ? 'bg-white/60 text-[#b991f9]' : 'text-[#adb5bd] hover:bg-white/10'}`}
            >
              {isActive && (
                <div className="absolute left-0 top-6 w-1 h-5 bg-[#6610f2] rounded-tr-lg rounded-br-lg" />
              )}
              <div className="text-xs text-center font-poppins leading-normal">{label}</div>
              <div className="text-lg">{icon}</div>
            </div>
          );
        })}
      </div>

      {/* Logout button fixed near bottom */}
      <div
        onClick={() => console.log('Logout')}
        className="mb-20 flex flex-col items-center justify-center gap-1 p-3 w-[5.375rem] rounded-2xl cursor-pointer text-[#adb5bd] hover:bg-white/10 transition-all duration-200"
      >
        <div className="text-xs text-center font-poppins leading-normal">Logout</div>
        <div className="text-lg">
          <LogoutOutlined />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

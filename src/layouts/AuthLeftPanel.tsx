import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import type { RootState } from "../app/store";
import { toggleTheme } from "../features/setting/ThemeSlice";
import logo from "../assets/logo.svg"; // Đường dẫn logo SVG của bạn

const { Option } = Select;

export const AuthLeftPanel = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const currentTheme = isDark ? "dark" : "light";

  return (
    <div className="w-full h-full flex flex-col ">
      {/* ==== Top: Logo + Title ==== */}
      <div className="flex flex-col ">
        {/* Logo lớn */}
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 md:w-28 md:h-28 mb-6 drop-shadow-xl"
        />

        {/* Tiêu đề */}
        <h1 className="text-[32px] md:text-[36px] font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Google Sheet
        </h1>
        <p className="text-3xl text-white/80 mt-1">Work Space</p>
      </div>

      {/* ==== Middle: Description ==== */}
      <div className="mt-8 text-sm text-white/60 leading-relaxed ">
        <p>Product by Cloud.com Group Inc.</p>
        <p>Welcome to the workspace, please log in to continue.</p>
      </div>

      {/* ==== Bottom: Theme Switch + Footer ==== */}
      <div className="mt-10 flex flex-col  gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2e1b49]/40 border border-white/10 text-sm text-white shadow-md backdrop-blur">
          <span className="text-lg">🌙</span>
          <span className="opacity-50">|</span>

          <Select
            value={currentTheme}
            bordered={false}
            dropdownStyle={{ backgroundColor: "#1a0030", color: "#fff" }}
            style={{
              background: "transparent",
              color: "#fff",
              fontWeight: 500,
              width: 80,
            }}
            //className="theme-select"
            onChange={() => dispatch(toggleTheme())}
          >
            <Option value="dark">Dark</Option>
            <Option value="light">Light</Option>
          </Select>
        </div>

        <p className="text-[10px] text-gray-500 text-center">
          © Cloud.com Group Inc. 2025. All rights reserved
        </p>
      </div>
    </div>
  );
};

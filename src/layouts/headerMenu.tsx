import { Breadcrumb, Avatar, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleTheme } from "../features/setting/ThemeSlice";
import type { RootState } from "../app/store";

// format segment: system-settings -> System Settings
const formatSegment = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// generate breadcrumb array
const generateBreadcrumbItems = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  return [
    { title: <span className="text-white">Home</span> },
    ...segments.map((segment, idx) => {
      const isLast = idx === segments.length - 1;
      return {
        title: (
          <span className={isLast ? "text-gray-400" : "text-white"}>
            {formatSegment(segment)}
          </span>
        ),
      };
    }),
  ];
};

const PageHeader = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.darkMode);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);
  const title = formatSegment(segments[segments.length - 1] || "Home");
  const breadcrumbItems = generateBreadcrumbItems(location.pathname);

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-transparent">
      {/* LEFT: Title + Breadcrumb */}
      <div className="flex flex-col">
        <h1 className="text-[24px] font-bold text-white leading-tight">{title}</h1>
        <Breadcrumb separator="–" className="text-sm mt-1" items={breadcrumbItems} />
      </div>

      {/* RIGHT: Dark mode + Avatar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-[#1C1C2E] border border-[#333] px-3 py-1 rounded-full gap-2">
          <span className="text-white text-sm">Dark</span>
          <label className="inline-flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDark}
              onChange={() => dispatch(toggleTheme())}
            />
            <div className="w-10 h-5 bg-[#9013FE] rounded-full peer-checked:bg-[#9013FE] transition"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full border-2 border-yellow-400 peer-checked:translate-x-5 transition-transform" />
          </label>
        </div>

        <Dropdown overlay={<div className="p-2 text-white">Dropdown here</div>}>
          <Avatar
            className="cursor-pointer"
            size={40}
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7)",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {user?.username?.[0]?.toUpperCase() || "U"}
          </Avatar>
        </Dropdown>
      </div>
    </header>
  );
};

export default PageHeader;

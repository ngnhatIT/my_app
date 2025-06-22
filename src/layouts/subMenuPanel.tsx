import { useNavigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface SubMenuItem {
  key: string;
  icon: ReactNode;
  title: string;
  link: string;
}

interface SubMenuPanelProps {
  group: string;
  submenus?: Record<string, SubMenuItem[]>;
  onClosePanel?: () => void;
}

const SubMenuPanel = ({ group, submenus = {}, onClosePanel }: SubMenuPanelProps) => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ để biết current path
  const items = submenus[group] || [];
  const groupTitle = group.replace("/", "").replace(/-/g, " ");

  const handleNavigate = (link: string) => {
    navigate(link);
    onClosePanel?.();
  };

  return (
    <div
      className="w-full h-full px-2 py-4 flex flex-col gap-4"
      style={{
        borderRadius: 24,
        border: "1px solid #212529",
        background:
          "linear-gradient(238deg, rgba(13, 4, 24, 0.54) 30.62%, rgba(22, 3, 53, 0.54) 100%)",
        boxShadow: "6px 6px 12px 0px rgba(72, 11, 172, 0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <h2 className="text-white text-lg font-semibold px-2 capitalize">
        {groupTitle}
      </h2>

      <div className="grid grid-cols-2 gap-3 w-full">
        {items.map((item) => {
          const isActive = location.pathname === item.key; // ✅ check active
          return (
            <div
              key={item.key}
              onClick={() => handleNavigate(item.key)}
              className={`flex flex-col items-center justify-center text-center px-2 py-3 rounded-xl transition cursor-pointer
                ${isActive ? "bg-[#5b21b6]/30 text-[#a855f7]" : "bg-[#1E1E2D] hover:bg-[#5b21b6]/30 text-white"}
              `}
            >
              <div className={`mb-1 ${isActive ? "text-[#a855f7]" : "text-white"}`}>
                {item.icon}
              </div>
              <div className="text-xs font-medium leading-tight">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubMenuPanel;

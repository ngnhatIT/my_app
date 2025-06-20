import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // ✅ Thêm dòng này
}

export function AuthCard({ children, className = "", style }: AuthCardProps) {
  return (
    <div
      className={`h-full flex flex-col backdrop-blur-2xl px-10 py-14 text-white rounded-[40px] shadow-lg ${className}`}
      style={style} // ✅ áp dụng style nếu có
    >
      {children}
    </div>
  );
}

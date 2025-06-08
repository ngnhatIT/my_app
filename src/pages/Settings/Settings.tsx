// src/pages/Settings.tsx
import React from "react";
import { Card, Typography } from "antd"; // Giả sử bạn dùng Card và Typography

const { Title } = Typography;

const Settings: React.FC = () => {
  return (
    // Thêm các class Tailwind CSS để làm cho div này và Card con của nó giãn nở
    // `flex-1` để div này chiếm hết chiều cao của cha nó (là Content)
    // `flex items-center justify-center` để căn giữa Card theo cả chiều ngang và dọc nếu muốn
    <div className="flex-1 flex items-center justify-center">
      <Card className="max-w-md w-full">
        {" "}
        {/* Card thường có chiều rộng cố định, nên thêm w-full */}
        <Title level={2}>Cài đặt</Title>
        <p className="text-lg mb-4">Đây là trang cài đặt.</p>
        {/* Thêm các nội dung cài đặt của bạn tại đây */}
      </Card>
    </div>
  );
};

export default Settings;

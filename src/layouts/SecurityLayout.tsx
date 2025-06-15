import { Outlet } from "react-router-dom";
import { Breadcrumb, Typography } from "antd";

const { Title } = Typography;

export default function SecurityLayout() {
  return (
    <div className="p-4 space-y-4">
      <Breadcrumb items={[{ title: "Bảo mật" }]} />
      
      <Outlet />
    </div>
  );
}

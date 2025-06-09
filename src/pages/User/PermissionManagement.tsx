import { Table, Button, Space, Typography, Checkbox, message } from "antd";
import { useState } from "react";

const { Title } = Typography;

interface Permission {
  id: number;
  role: string;
  menu: string;
  access: boolean;
}

const mockData: Permission[] = [
  { id: 1, role: "Admin", menu: "Dashboard", access: true },
  { id: 2, role: "Admin", menu: "Users", access: true },
  { id: 3, role: "Moderator", menu: "Users", access: false },
  { id: 4, role: "User", menu: "Profile", access: true },
];

const PermissionManagement: React.FC = () => {
  const [data, setData] = useState<Permission[]>(mockData);

  const handleToggleAccess = (id: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, access: !item.access } : item
      )
    );
    message.success("Quyền truy cập đã được cập nhật!");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Menu", dataIndex: "menu", key: "menu" },
    {
      title: "Truy cập",
      key: "access",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.access}
          onChange={() => handleToggleAccess(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900">
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900 dark:text-gray-100">
          Phân quyền Hệ thống
        </Title>
      </div>
      <div className="flex-1 overflow-auto">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          bordered
          pagination={false}
          scroll={{ y: "calc(100vh - 100px)" }}
          className="custom-table"
          style={{ margin: 0, padding: 0 }}
        />
      </div>
    </div>
  );
};

export default PermissionManagement;

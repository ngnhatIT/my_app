import { Table, Button, Space, Typography, Checkbox, message } from "antd";
import { useState } from "react";

const { Title } = Typography;

interface Permission {
  id: number;
  role: string;
  menu: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

const mockData: Permission[] = [
  {
    id: 1,
    role: "Admin",
    menu: "Dashboard",
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  {
    id: 2,
    role: "Admin",
    menu: "Users",
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  {
    id: 3,
    role: "Owner",
    menu: "Users",
    create: false,
    read: true,
    update: false,
    delete: false,
  },
  {
    id: 4,
    role: "User",
    menu: "Profile",
    create: false,
    read: true,
    update: true,
    delete: false,
  },
];

const PermissionManagement: React.FC = () => {
  const [data, setData] = useState<Permission[]>(mockData);

  const handleTogglePermission = (
    id: number,
    field: keyof Omit<Permission, "id" | "role" | "menu">
  ) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item
      )
    );
    message.success(
      `Quyền "${field}" đã được cập nhật cho vai trò ${
        data.find((item) => item.id === id)?.role
      }!`
    );
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Menu", dataIndex: "menu", key: "menu" },
    {
      title: "Tạo",
      key: "create",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.create}
          onChange={() => handleTogglePermission(record.id, "create")}
        />
      ),
    },
    {
      title: "Xem",
      key: "read",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.read}
          onChange={() => handleTogglePermission(record.id, "read")}
        />
      ),
    },
    {
      title: "Sửa",
      key: "update",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.update}
          onChange={() => handleTogglePermission(record.id, "update")}
        />
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.delete}
          onChange={() => handleTogglePermission(record.id, "delete")}
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

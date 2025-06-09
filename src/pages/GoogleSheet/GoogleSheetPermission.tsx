import { Table, Button, Space, Typography, Checkbox, message } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const { Title } = Typography;

interface Permission {
  id: number;
  user: string;
  canView: boolean;
  canEdit: boolean;
}

const mockPermissions: { [key: number]: Permission[] } = {
  1: [
    { id: 1, user: "Nguyen Van A", canView: true, canEdit: true },
    { id: 2, user: "Tran Thi B", canView: true, canEdit: false },
  ],
  2: [{ id: 3, user: "Le Van C", canView: true, canEdit: false }],
  3: [{ id: 4, user: "Nguyen Van A", canView: true, canEdit: true }],
};

const GoogleSheetPermission: React.FC = () => {
  const { sheetId } = useParams<{ sheetId?: string }>();
  const [data, setData] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sheetId) {
      const id = Number(sheetId);
      setData(mockPermissions[id] || []);
      setLoading(false);
    }
  }, [sheetId]);

  const handleTogglePermission = (id: number, field: "canView" | "canEdit") => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, [field]: !item[field] } : item
      )
    );
    message.success("Quyền đã được cập nhật!");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Người dùng", dataIndex: "user", key: "user" },
    {
      title: "Xem",
      key: "canView",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.canView}
          onChange={() => handleTogglePermission(record.id, "canView")}
        />
      ),
    },
    {
      title: "Sửa",
      key: "canEdit",
      render: (_: any, record: Permission) => (
        <Checkbox
          checked={record.canEdit}
          onChange={() => handleTogglePermission(record.id, "canEdit")}
        />
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900">
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900 dark:text-gray-100">
          Phân quyền Google Sheet
        </Title>
      </div>
      <div className="flex-1 overflow-auto">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          bordered
          loading={loading}
          pagination={false}
          scroll={{ y: "calc(100vh - 100px)" }}
          className="custom-table"
          style={{ margin: 0, padding: 0 }}
        />
      </div>
    </div>
  );
};

export default GoogleSheetPermission;

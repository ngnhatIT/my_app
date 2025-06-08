import { Table, Button, Space, Typography, Modal, message } from "antd";
import { useState } from "react";
import { EditOutlined, KeyOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;


interface Workspace {
  id: number;
  name: string;
  owner: string;
  createdAt: string;
}

const mockData: Workspace[] = [
  { id: 1, name: "Marketing Team", owner: "alice@example.com", createdAt: "2024-01-10" },
  { id: 2, name: "DevOps Workspace", owner: "bob@example.com", createdAt: "2024-03-02" },
  { id: 3, name: "Design Group", owner: "carol@example.com", createdAt: "2024-05-18" },
];

const WorkspaceList: React.FC = () => {
    const navigate = useNavigate();
  const [data, setData] = useState<Workspace[]>(mockData);
  const [loading, setLoading] = useState(false);

  const handleEdit = (record: Workspace) => {
    Modal.info({
      title: "Sửa Workspace",
      content: `Tính năng chỉnh sửa '${record.name}' đang được phát triển.`,
    });
  };

  const handleChangePassword = (record: Workspace) => {
    Modal.confirm({
      title: `Đổi mật khẩu cho ${record.name}`,
      content: "Bạn có chắc muốn đổi mật khẩu?",
      onOk: () => {
        message.success("Mật khẩu đã được cập nhật!");
      },
    });
  };

  const columns = [
    {
      title: "Tên Workspace",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Người tạo",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Workspace) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Button icon={<KeyOutlined />} onClick={() => handleChangePassword(record)}>
            Đổi mật khẩu
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Title level={3} className="!mb-0">Quản lý Workspace</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/workspaces/new")} block>
          Thêm Workspace
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default WorkspaceList;

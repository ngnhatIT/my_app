import { Table, Button, Space, Typography, Input } from "antd"; // Loại Outlet khỏi antd
import { useState } from "react";
import {
  EditOutlined,
  KeyOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom"; // Import Outlet từ react-router-dom

const { Title } = Typography;
const { Search } = Input;

interface Workspace {
  id: number;
  name: string;
  owner: string;
  createdAt: string;
}

const mockData: Workspace[] = [
  {
    id: 1,
    name: "Marketing Team",
    owner: "alice@example.com",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "DevOps Workspace",
    owner: "bob@example.com",
    createdAt: "2024-03-02",
  },
  {
    id: 3,
    name: "Design Group",
    owner: "carol@example.com",
    createdAt: "2024-05-18",
  },
];

const WorkspaceList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Workspace[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (record: Workspace) => {
    navigate(`/workspaces/${record.id}/edit`);
  };

  const handleChangePassword = (record: Workspace) => {
    console.log("Navigating to change password for ID:", record.id); // Debug log
    navigate(`/workspaces/${record.id}/change-password`);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value) {
      const filteredData = mockData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockData);
    }
  };

  const columns = [
    {
      title: "Tên Workspace",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "owner",
      key: "owner",
      render: (text: string) => <span className="text-gray-600 ">{text}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Workspace) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 "
            style={{ border: "none" }}
          >
            Sửa
          </Button>
          <Button
            icon={<KeyOutlined />}
            onClick={() => handleChangePassword(record)}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 "
            style={{ border: "none" }}
          >
            Đổi mật khẩu
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white ">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900">
          Quản lý Workspace
        </Title>
        <div className="flex items-center gap-4">
          <Search
            placeholder="Tìm kiếm Workspace..."
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ width: 200 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/workspaces/new")}
            className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            style={{ border: "none", padding: "6px 16px" }}
          >
            Thêm Workspace
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          bordered
          loading={loading}
          pagination={false}
          scroll={{ y: "calc(100vh - 140px)" }}
          className="custom-table"
          style={{ margin: 0, padding: 0 }}
        />
      </div>
      <Outlet />{" "}
      {/* Đặt <Outlet /> ở đây để render route con như /workspaces/:workspaceId/change-password */}
    </div>
  );
};

export default WorkspaceList;

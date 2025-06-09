import { Table, Button, Space, Typography, Modal, message, Input } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom"; // Thêm Outlet từ react-router-dom

const { Title } = Typography;
const { Search } = Input;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const mockData: User[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "a@example.com",
    role: "Admin",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "b@example.com",
    role: "User",
    createdAt: "2024-03-02",
  },
  {
    id: 3,
    name: "Le Van C",
    email: "c@example.com",
    role: "Moderator",
    createdAt: "2024-05-18",
  },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value) {
      const filteredData = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockData);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xóa người dùng",
      content: "Bạn có chắc muốn xóa người dùng này?",
      onOk: () => {
        setData(data.filter((user) => user.id !== id));
        message.success("Người dùng đã được xóa!");
      },
      onCancel: () => {},
      style: { top: 20 },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            style={{ border: "none" }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="bg-red-100 text-red-600 hover:bg-red-200"
            style={{ border: "none" }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900 dark:text-gray-100">
          Quản lý Người dùng
        </Title>
        <div className="flex items-center gap-4">
          <Search
            placeholder="Tìm kiếm theo tên hoặc email..."
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/users/new")}
            className="bg-blue-600 text-white hover:bg-blue-700"
            style={{ border: "none", padding: "6px 16px" }}
          >
            Thêm Người dùng
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
      {/* Thêm Outlet để render route con như /users/new hoặc /users/:userId/edit */}
    </div>
  );
};

export default UserList;

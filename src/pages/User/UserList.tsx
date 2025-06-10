import { Table, Button, Space, Typography, Input, Breadcrumb } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const mockData: User[] = [
  {
    id: 1,
    name: "Nguyễn Khánh Nhật",
    email: "nhat@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Nguyễn Khánh Nhật",
    email: "nhat@gmail.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Nguyễn Khánh Nhật",
    email: "nhat@gmail.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Nguyễn Khánh Nhật",
    email: "nhat@gmail.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Nguyễn Khánh Nhật",
    email: "nhat@gmail.com",
    role: "User",
    status: "Inactive",
  },
];

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (record: User) => {
    navigate(`/users/${record.id}/edit`);
  };

  const handleDelete = (record: User) => {
    console.log("Delete user with ID:", record.id);
    setData(data.filter((item) => item.id !== record.id));
  };

  const handleAddUser = () => {
    navigate("/users/new");
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
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: User) => (
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600">
            {text[0].toUpperCase()}
          </span>
          <span className="text-gray-800">{text}</span>
          <span className="text-gray-500 ml-2 hidden md:block">
            ({record.email})
          </span>
        </div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (text: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            text === "Admin"
              ? "bg-blue-100 text-blue-800"
              : text === "Manager"
              ? "bg-gray-100 text-gray-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={`text-sm ${
            text === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {text === "Active" ? "• Active" : "• Inactive"}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="middle" className="flex flex-col md:flex-row">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="text-blue-600 hover:text-blue-800 mb-2 md:mb-0"
            style={{ border: "none", padding: 0 }}
          >
            Edit
          </Button>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => handleDelete(record)}
            className="text-red-600 hover:text-red-800"
            style={{ border: "none", padding: 0 }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 p-4">
      <Breadcrumb
        className="mb-4"
        items={[
          { title: <HomeOutlined />, href: "/" },
          { title: <Link to="/users">User Management</Link> },
        ]}
      />
      <div className="mb-6 mt-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <Search
              placeholder="Search users..."
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              className="w-full sm:w-72 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
              allowClear
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddUser}
            className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200 rounded-lg shadow-md w-full sm:w-auto px-6 py-2"
          >
            Add New User
          </Button>
        </div>
      </div>
      <div className="overflow-auto sm:overflow-hidden ">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          bordered={false}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: 127,
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total}`,
          }}
          scroll={{ x: "max-content", y: 400 }} // Tự động cuộn ngang dựa trên nội dung
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default UserList;

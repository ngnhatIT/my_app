import { Table, Button, Space, Typography, Modal, message, Input } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

interface GoogleSheet {
  id: number;
  name: string;
  owner: string;
  createdAt: string;
}

const mockData: GoogleSheet[] = [
  {
    id: 1,
    name: "Budget 2024",
    owner: "Nguyen Van A",
    createdAt: "2024-01-10",
  },
  { id: 2, name: "Project Plan", owner: "Tran Thi B", createdAt: "2024-03-02" },
  { id: 3, name: "Sales Data", owner: "Le Van C", createdAt: "2024-05-18" },
];

const GoogleSheetList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GoogleSheet[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value) {
      const filteredData = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.owner.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockData);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/googlesheets/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xóa Google Sheet",
      content: "Bạn có chắc muốn xóa Google Sheet này?",
      onOk: () => {
        setData(data.filter((sheet) => sheet.id !== id));
        message.success("Google Sheet đã được xóa!");
      },
      onCancel: () => {},
      style: { top: 20 },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const handleView = (id: number) => {
    navigate(`/googlesheets/${id}/view`);
  };

  const handlePermission = (id: number) => {
    navigate(`/googlesheets/${id}/permissions`);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Chủ sở hữu", dataIndex: "owner", key: "owner" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: GoogleSheet) => (
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
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
            className="bg-blue-100 text-blue-600 hover:bg-blue-200"
            style={{ border: "none" }}
          >
            Xem
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="bg-red-100 text-red-600 hover:bg-red-200"
            style={{ border: "none" }}
          >
            Xóa
          </Button>
          <Button
            onClick={() => handlePermission(record.id)}
            className="bg-green-100 text-green-600 hover:bg-green-200"
            style={{ border: "none" }}
          >
            Phân quyền
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900 dark:text-gray-100">
          Quản lý Google Sheets
        </Title>
        <div className="flex items-center gap-4">
          <Search
            placeholder="Tìm kiếm theo tên hoặc chủ sở hữu..."
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
            style={{ width: 250 }}
            allowClear
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/googlesheets/new")}
            className="bg-blue-600 text-white hover:bg-blue-700"
            style={{ border: "none", padding: "6px 16px" }}
          >
            Thêm Google Sheet
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
    </div>
  );
};

export default GoogleSheetList;

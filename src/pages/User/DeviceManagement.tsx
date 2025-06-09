import { Table, Button, Space, Typography, Modal, message, Input } from "antd";
import { useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

interface Device {
  id: number;
  userId: number;
  deviceName: string;
  status: string;
  lastActive: string;
}

const mockData: Device[] = [
  {
    id: 1,
    userId: 1,
    deviceName: "Laptop Office",
    status: "Active",
    lastActive: "2024-06-01",
  },
  {
    id: 2,
    userId: 2,
    deviceName: "Mobile Phone",
    status: "Inactive",
    lastActive: "2024-05-20",
  },
];

const DeviceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Device[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value) {
      const filteredData = mockData.filter((item) =>
        item.deviceName.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockData);
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xóa thiết bị",
      content: "Bạn có chắc muốn xóa thiết bị này?",
      onOk: () => {
        setData(data.filter((device) => device.id !== id));
        message.success("Thiết bị đã được xóa!");
      },
      onCancel: () => {},
      style: { top: 20 },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên thiết bị", dataIndex: "deviceName", key: "deviceName" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "Lần hoạt động cuối", dataIndex: "lastActive", key: "lastActive" },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Device) => (
        <Space size="middle">
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
          Quản lý Thiết bị
        </Title>
        <Search
          placeholder="Tìm kiếm theo tên thiết bị..."
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          style={{ width: 250 }}
          allowClear
        />
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

export default DeviceManagement;

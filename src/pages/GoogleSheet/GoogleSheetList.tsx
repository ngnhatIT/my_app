import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Space,
  Button,
  Tooltip,
  theme as antdTheme,
  Typography,
  Spin,
} from "antd";
import { EyeOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import PageHeader from "../../layouts/PageHeader";
import { useFakeApi } from "../../hooks/useFakeApi";

const { Text } = Typography;

interface GoogleSheet {
  id: number;
  name: string;
  createdAt: string;
  owner: string;
  googleSheetUrl: string;
}

const GoogleSheetList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const {
    token: { colorBgContainer, colorTextBase },
  } = antdTheme.useToken();

  const { data: sheets, loading } = useFakeApi<GoogleSheet>("googlesheets");

  const filteredData = sheets.filter((sheet: any) =>
    sheet.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Tên Sheet",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: GoogleSheet) => (
        <a
          href={record.googleSheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {record.name}
        </a>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: GoogleSheet) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/googlesheets/${record.id}/view`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/googlesheets/${record.id}/edit`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div
      className="p-4"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      {/* Page Header with breadcrumb + search + add */}
      <PageHeader
        searchPlaceholder="Tìm kiếm theo tên sheet"
        onSearch={(value: string) => setSearchText(value)}
        addButtonLabel="Thêm Google Sheet"
        addButtonAction={() => navigate("/googlesheets/new")}
        breadcrumbPaths={[{ label: "Quản lý Google Sheets" }]}
      />

      {/* Table content */}
      {loading ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          className="rounded-md"
        />
      )}
    </div>
  );
};

export default GoogleSheetList;

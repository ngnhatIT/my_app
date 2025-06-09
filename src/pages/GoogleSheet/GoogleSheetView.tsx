import { Table, Button, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface SheetData {
  id: number;
  row: number;
  column: string;
  value: string;
}

const mockSheetData: { [key: number]: SheetData[] } = {
  1: [
    { id: 1, row: 1, column: "A", value: "Revenue" },
    { id: 2, row: 1, column: "B", value: "1000" },
    { id: 3, row: 2, column: "A", value: "Cost" },
    { id: 4, row: 2, column: "B", value: "500" },
  ],
  2: [
    { id: 5, row: 1, column: "A", value: "Task" },
    { id: 6, row: 1, column: "B", value: "Design" },
    { id: 7, row: 2, column: "A", value: "Status" },
    { id: 8, row: 2, column: "B", value: "Done" },
  ],
};

const GoogleSheetView: React.FC = () => {
  const { sheetId } = useParams<{ sheetId?: string }>();
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (sheetId) {
      const id = Number(sheetId);
      setData(mockSheetData[id] || []);
      setLoading(false);
    }
  }, [sheetId]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Dòng", dataIndex: "row", key: "row" },
    { title: "Cột", dataIndex: "column", key: "column" },
    { title: "Giá trị", dataIndex: "value", key: "value" },
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-gray-900">
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Title level={3} className="!mb-0 text-gray-900 dark:text-gray-100">
          Xem Google Sheet
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
          scroll={{ y: "calc(100vh - 140px)" }}
          className="custom-table"
          style={{ margin: 0, padding: 0 }}
        />
      </div>
      <div className="mt-6">
        <Button
          type="default"
          size="large"
          block
          onClick={() => navigate("/googlesheets")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
        >
          <ArrowLeftOutlined className="mr-2" /> Quay lại
        </Button>
      </div>
    </div>
  );
};

export default GoogleSheetView;

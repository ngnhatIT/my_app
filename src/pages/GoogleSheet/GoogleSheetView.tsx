import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Typography, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useFakeApi } from "../../hooks/useFakeApi";

const { Title } = Typography;

interface GoogleSheet {
  id: number;
  name: string;
  googleSheetUrl: string;
  owner: string;
  createdAt: string;
}

const GoogleSheetView = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<GoogleSheet | null>(null);
  const [loading, setLoading] = useState(true);

  const { data, loading: apiLoading } = useFakeApi<GoogleSheet>("googlesheets");

  useEffect(() => {
    if (sheetId && data.length > 0) {
      const target = data.find((s) => s.id === Number(sheetId));
      setSheet(target || null);
      setLoading(false);
    }
  }, [sheetId, data]);

  if (loading || apiLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {sheet?.googleSheetUrl ? (
        <iframe
          title="Google Sheet Preview"
          src={sheet.googleSheetUrl}
          className="w-full mb-4"
          style={{ height: "calc(100vh)", marginTop: "-20px" }} // 64px = chiều cao header
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <p className="text-red-500 p-4">Không tìm thấy Google Sheet.</p>
      )}
    </div>
  );
};

export default GoogleSheetView;

// src/pages/Dashboard.tsx
import { Card, Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";


const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);


  const cardStyle =
    { backgroundColor: "#fff", color: "#1f2937" };

  return (
    <div
      className="p-6 min-h-screen flex flex-col"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <Title level={2} className="!mb-4" style={{ color: cardStyle.color }}>
        {t("dashboard.welcome")}, {user?.username || "Guest"}!
      </Title>

      <Row gutter={[16, 16]} className="flex-1">
        <Col xs={24} md={12} lg={8}>
          <Card variant="outlined" hoverable className="shadow-md h-full" style={cardStyle}>
            <Text strong style={{ color: cardStyle.color }}>{t("dashboard.stats.users")}</Text>
            <div className="text-2xl mt-2" style={{ color: cardStyle.color }}>42</div>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Card variant="outlined" hoverable className="shadow-md h-full" style={cardStyle}>
            <Text strong style={{ color: cardStyle.color }}>{t("dashboard.stats.workspaces")}</Text>
            <div className="text-2xl mt-2" style={{ color: cardStyle.color }}>7</div>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Card variant="outlined" hoverable className="shadow-md h-full" style={cardStyle}>
            <Text strong style={{ color: cardStyle.color }}>{t("dashboard.stats.sheets")}</Text>
            <div className="text-2xl mt-2" style={{ color: cardStyle.color }}>128</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

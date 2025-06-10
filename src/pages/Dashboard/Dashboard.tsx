import { Card, Typography, Row, Col, Statistic } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons"; // Thêm icon

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  const cardStyle = {
    background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    height: "100%",
  };

  return (
    <div
      className="p-6 min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)",
      }}
    >
      <Title level={2} className="mb-6 text-gray-800 font-semibold">
        {t("dashboard.welcome")}, {user?.username || "Guest"}!
      </Title>

      <Row gutter={[24, 24]} className="flex-1">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full transform hover:-translate-y-2"
            style={cardStyle}
            cover={
              <div className="p-4">
                <UserOutlined style={{ fontSize: "24px", color: "#3b82f6" }} />
              </div>
            }
          >
            <Statistic
              title={
                <Text strong style={{ color: "#1f2937" }}>
                  {t("dashboard.stats.users")}
                </Text>
              }
              value={42}
              valueStyle={{ color: "#1f2937", fontSize: "24px" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full transform hover:-translate-y-2"
            style={cardStyle}
            cover={
              <div className="p-4">
                <TeamOutlined style={{ fontSize: "24px", color: "#10b981" }} />
              </div>
            }
          >
            <Statistic
              title={
                <Text strong style={{ color: "#1f2937" }}>
                  {t("dashboard.stats.workspaces")}
                </Text>
              }
              value={7}
              valueStyle={{ color: "#1f2937", fontSize: "24px" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            className="h-full transform hover:-translate-y-2"
            style={cardStyle}
            cover={
              <div className="p-4">
                <FileTextOutlined
                  style={{ fontSize: "24px", color: "#f59e0b" }}
                />
              </div>
            }
          >
            <Statistic
              title={
                <Text strong style={{ color: "#1f2937" }}>
                  {t("dashboard.stats.sheets")}
                </Text>
              }
              value={128}
              valueStyle={{ color: "#1f2937", fontSize: "24px" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

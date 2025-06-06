import { Card, Typography } from "antd";

const { Title } = Typography;

const Settings: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <Title level={2}>Settings</Title>
      <p className="text-base">This is the settings page.</p>
    </Card>
  );
};

export default Settings;

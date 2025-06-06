import { Card, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const NotFound: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <Title level={2}>404 - Page Not Found</Title>
      <p className="text-base">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </Card>
  );
};

export default NotFound;

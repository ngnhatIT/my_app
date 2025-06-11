import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, theme } from "antd";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text, Link } = Typography;


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(
      loginSuccess({
        id: "1",
        email: values.email,
        username: values.email.split("@")[0],
      })
    );
  };

  return (
    <Card
      className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      <Title level={3} className="text-center">
        Đăng nhập
      </Title>
      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between mt-4">
        <Link onClick={() => navigate("/auth/register")}>Đăng ký tài khoản</Link>
        <Link onClick={() => navigate("/auth/forgot-password")}>
          Quên mật khẩu?
        </Link>
      </div>
    </Card>
  );
};

export default Login;

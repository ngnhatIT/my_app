import { Form, Input, Button, Typography, message, theme, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  const handleSubmit = (values: { email: string }) => {
    console.log("Reset email sent to:", values.email);
    message.success("Link đặt lại mật khẩu đã được gửi!");
  };

  return (
    <Card
      className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      <Title level={3} className="text-center">
        Quên mật khẩu
      </Title>
      <p className="text-center mb-4">
        Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
      </p>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Vui lòng nhập email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi liên kết đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ForgotPassword;

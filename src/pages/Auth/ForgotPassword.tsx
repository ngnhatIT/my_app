import { Form, Input, Button, Typography, message, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: { email: string }) => {
    console.log("Reset email sent to:", values.email);
    message.success("Link đặt lại mật khẩu đã được gửi!");
  };

  return (
    <Card className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white ">
      <Title level={3} className="text-center text-blue-600">
        Quên mật khẩu
      </Title>
      <p className="text-center text-gray-500 mb-4">
        Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
      </p>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email hợp lệ!",
              type: "email",
            },
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

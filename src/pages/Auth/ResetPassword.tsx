import { Form, Input, Button, Typography, message, theme } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  const handleReset = (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }
    message.success("Đặt lại mật khẩu thành công!");
  };

  return (
    <div
      className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      <Title level={3} className="text-center">
        Đặt lại mật khẩu
      </Title>
      <Form form={form} layout="vertical" onFinish={handleReset}>
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Hai mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;

import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();

  const handleReset = (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }
    console.log("Mật khẩu mới:", values.password);
    message.success("Đặt lại mật khẩu thành công!");
  };

  return (
    <div>
      <Title level={3} className="text-center text-blue-600">
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
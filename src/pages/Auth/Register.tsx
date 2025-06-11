import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography, message, theme } from "antd";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../features/auth/AuthSlice";


const { Title } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  
const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();


  const handleRegister = (values: { email: string; username: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }
    console.log("Đăng ký:", values);
    dispatch(registerSuccess({
      id: "2",
      username: values.username,
      email: values.email,
    }));
    message.success("Đăng ký thành công!");
  };

  return (
   <Card
    className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
    style={{ background: colorBgContainer, color: colorTextBase }}
  >
      <Title level={3} className="text-center text-blue-600">
        Đăng ký tài khoản
      </Title>
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="johndoe" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
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
        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
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
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default Register;

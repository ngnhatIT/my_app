import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, message } from "antd";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginSuccess } from "../../features/auth/AuthSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (values: { email: string; username: string; password: string }) => {
    dispatch(loginSuccess({
      id: "1",
      username: values.username,
      email: values.email,
    }));
    message.success(t("login.success"));
    navigate("/");
  };

  return (
    <div>
      <Title level={3} className="text-center text-blue-600">
        {t("login.title")}
      </Title>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="username"
          label={t("login.username")}
          rules={[{ required: true, message: t("login.username_required") }]}
        >
          <Input prefix={<UserOutlined />} placeholder="johndoe" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: t("login.email_required"), type: "email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("login.password")}
          rules={[{ required: true, message: t("login.password_required") }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("login.button")}
          </Button>
        </Form.Item>
        <div className="flex justify-between mt-2">
          <Button type="link" onClick={() => navigate("/auth/register")}>{t("login.register")}</Button>
          <Button type="link" onClick={() => navigate("/auth/forgot-password")}>{t("login.forgot")}</Button>
        </div>
      </Form>
    </div>
  );
};
export default Login;
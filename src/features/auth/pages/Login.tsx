import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  message,
  theme,
  Spin,
  type InputRef,
} from "antd";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFakeApi } from "../../../hooks/useFakeApi";
import { loginSuccess } from "../AuthSlice";

const { Title, Link } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("auth");
  const usernameInputRef = useRef<InputRef>(null);

  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  const { login } = useFakeApi("users");

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    if (loading) return;
    setLoading(true);

    try {
      const { access_token, user } = await login(values);
      dispatch(loginSuccess({ user, token: access_token }));
      navigate("/");
    } catch (err: any) {
      if (err?.response?.status === 401) {
        message.error(t("invalidCredentials"));
      } else {
        message.error(t("loginFailed"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip={t("loggingIn") || "Đang đăng nhập..."}>
      <div className="px-4 sm:px-0">
        <Card
          className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
          style={{ background: colorBgContainer, color: colorTextBase }}
        >
          <Title level={3} className="text-center">
            {t("loginTitle")}
          </Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleLogin}
            disabled={loading}
          >
            <Form.Item
              name="username"
              label={t("username")}
              rules={[{ required: true, message: t("usernameRequired") }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="admin"
                ref={usernameInputRef}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("password")}
              rules={[{ required: true, message: t("passwordRequired") }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="••••••••"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {t("loginButton")}
              </Button>
            </Form.Item>
          </Form>

          <div className="flex justify-between mt-4">
            <Link onClick={() => navigate("/auth/register")}>
              {t("registerLink")}
            </Link>
            <Link onClick={() => navigate("/auth/forgot-password")}>
              {t("forgotPasswordLink")}
            </Link>
          </div>
        </Card>
      </div>
    </Spin>
  );
}

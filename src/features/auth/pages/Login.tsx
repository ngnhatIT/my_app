import { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  theme,
  notification,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAuthService } from "../services/AuthService";
import type { AppDispatch, RootState } from "../../../app/store";
import type { LoginRequestDTO } from "../dto/LoginRequestDTO";
import { loginSuccess, setAuthStatus } from "../AuthSlice";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loginUser } = useAuthService();
  const status = useSelector((state: RootState) => state.auth.status);
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  useEffect(() => {
    if (status === "succeeded") {
      notification.success({
        message: t("login.successTitle"),
        description: t("login.success"),
        placement: "topRight",
      });
      navigate("/");
    }
  }, [status, navigate, t]);

  const onFinish = async (values: Omit<LoginRequestDTO, "captchaToken">) => {
    if (status === "loading") return;
    dispatch(setAuthStatus("loading"));

    try {
      const { access_token, user } = await loginUser(values);
      dispatch(loginSuccess({ user, token: access_token }));
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("login.failedTitle"),
        description:
          err?.response?.status === 401
            ? t("login.invalidCredentials")
            : err?.response?.data?.message || t("login.networkError"),
        placement: "topRight",
      });
    }
  };

  return (
    <div className="px-4 sm:px-0">
      <Card
        className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
        style={{ background: colorBgContainer, color: colorTextBase }}
      >
        <Typography.Title level={3} className="text-center">
          {t("login.title")}
        </Typography.Title>

        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t("login.usernameRequired") }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("login.username")}
              disabled={status === "loading"}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t("login.passwordRequired") }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("login.password")}
              disabled={status === "loading"}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={status === "loading"}
              disabled={status === "loading"}
            >
              {t("login.submit")}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-between mt-2">
          <Button type="link" onClick={() => navigate("/auth/register")}>
            {t("login.register")}
          </Button>
          <Button type="link" onClick={() => navigate("/auth/forgot-password")}>
            {t("login.forgotPassword")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;

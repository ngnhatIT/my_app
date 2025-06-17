import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  notification,
  theme,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setAuthStatus } from "../AuthSlice";
import { useAuthService } from "../services/AuthService";
import type { RootState } from "../../../app/store";

const { Title, Text } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { sendOtp } = useAuthService(t);
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  const handleRegister = async (values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: t("register.failedTitle"),
        description: t("register.passwordsMismatch"),
        placement: "topRight",
      });
      return;
    }

    try {
      dispatch(setAuthStatus("loading"));
      await sendOtp(values.email);
      notification.success({
        message: t("register.otpSentTitle"),
        description: t("register.otpSent"),
        placement: "topRight",
      });
      navigate("/auth/verify-otp", {
        state: {
          user: {
            email: values.email,
            username: values.username,
            password: values.password,
          },
          otpCountdownStart: Date.now(),
          flowType: "register",
        },
      });
    } catch (err: any) {
      notification.error({
        message: t("register.failedTitle"),
        description: err?.response?.data?.message ?? t("register.failed"),
        placement: "topRight",
      });
      dispatch(setAuthStatus("failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        className="p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{
          background: colorBgContainer,
          color: colorTextBase,
          border: `1px solid ${colorPrimary}20`,
        }}
      >
        <Title
          level={3}
          className="text-center"
          style={{ color: colorPrimary }}
        >
          {t("register.title")}
        </Title>
        <Text
          className="text-center block mb-6"
          style={{ color: colorTextBase }}
        >
          {t("register.description")}
        </Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label={t("register.username")}
            rules={[
              { required: true, message: t("register.usernameRequired") },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="johndoe"
              size="large"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={t("register.email")}
            rules={[
              {
                required: true,
                type: "email",
                message: t("register.emailRequired"),
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="you@example.com"
              size="large"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("register.password")}
            rules={[
              { required: true, message: t("register.passwordRequired") },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              size="large"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={t("register.confirmPassword")}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("register.confirmPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("register.passwordsMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              size="large"
              className="rounded-md"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={
                useSelector((state: RootState) => state.auth.status) ===
                "loading"
              }
              className="mt-4 rounded-md"
            >
              {t("register.submit")}
            </Button>
          </Form.Item>
          <div className="flex justify-center mt-4">
            <Button
              type="link"
              onClick={() => navigate("/auth/login")}
              style={{ color: colorPrimary }}
            >
              {t("register.toLogin")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;

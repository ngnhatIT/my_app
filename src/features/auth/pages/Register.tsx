import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  theme,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerSuccess, setAuthStatus } from "../AuthSlice";
import { useAuthService } from "../services/AuthService";
import type { RegisterRequestDTO } from "../dto/RegisterRequestDTO";

const { Title, Link } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerUser } = useAuthService();
  const { t } = useTranslation();

  const {
    token: { colorBgContainer, colorTextBase },
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
      const payload: RegisterRequestDTO = {
        email: values.email,
        username: values.username,
        password: values.password,
      };
      const response = await registerUser(payload);
      dispatch(registerSuccess(response));
      notification.success({
        message: t("register.successTitle"),
        description: t("register.success"),
        placement: "topRight",
      });
      navigate("/auth/verify-otp", {
        state: {
          email: values.email,
          otpCountdownStart: Date.now(),
        },
      });
    } catch (err: any) {
      notification.error({
        message: t("register.failedTitle"),
        description:
          err?.response?.data?.message || t("register.failed"),
        placement: "topRight",
      });
      dispatch(setAuthStatus("failed"));
    }
  };

  return (
    <Card
      className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      <Title level={3} className="text-center text-blue-600">
        {t("register.title")}
      </Title>
      <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
        <Form.Item
          name="username"
          label={t("register.username")}
          rules={[{ required: true, message: t("register.usernameRequired") }]}
        >
          <Input prefix={<UserOutlined />} placeholder="johndoe" />
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
          <Input prefix={<MailOutlined />} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label={t("register.password")}
          rules={[{ required: true, message: t("register.passwordRequired") }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={t("register.confirmPassword")}
          dependencies={["password"]}
          rules={[
            { required: true, message: t("register.confirmPasswordRequired") },
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
          <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("register.submit")}
          </Button>
        </Form.Item>
        <div className="flex justify-between mt-4">
          <Link onClick={() => navigate("/auth/login")}>
            {t("register.toLogin")}
          </Link>
        </div>
      </Form>
    </Card>
  );
};

export default Register;

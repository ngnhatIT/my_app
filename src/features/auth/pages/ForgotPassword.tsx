import {
  Form,
  Input,
  Button,
  Typography,
  notification,
  theme,
  Card,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../AuthService";
import { setAuthStatus } from "../AuthSlice";
import type { RootState, AppDispatch } from "../../../app/store";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { sendOtp } = useAuthService(t);
  const [form] = Form.useForm();
  const status = useSelector((state: RootState) => state.auth.status);

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  const handleSubmit = async (values: { email: string }) => {
    try {
      dispatch(setAuthStatus("loading"));
      await sendOtp(values.email);
      notification.success({
        message: t("forgotPassword.otpSentTitle"),
        description: t("forgotPassword.otpSent"),
        placement: "topRight",
      });
      navigate("/auth/verify-otp", {
        state: {
          user: { email: values.email },
          otpCountdownStart: Date.now(),
          flowType: "forgot-password",
        },
      });
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("forgotPassword.failedTitle"),
        description: err?.response?.data?.message ?? t("forgotPassword.failed"),
        placement: "topRight",
      });
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
          {t("forgotPassword.title")}
        </Title>
        <Text
          className="text-center block mb-6"
          style={{ color: colorTextBase }}
        >
          {t("forgotPassword.description")}
        </Text>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={t("forgotPassword.email")}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: t("forgotPassword.emailRequired"),
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={status === "loading"}
              disabled={status === "loading"}
              className="rounded-md"
            >
              {t("forgotPassword.submit")}
            </Button>
          </Form.Item>
          <div className="flex justify-center mt-4">
            <Button
              type="link"
              onClick={() => navigate("/auth/login")}
              style={{ color: colorPrimary }}
            >
              {t("forgotPassword.toLogin")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;

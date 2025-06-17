import {
  Form,
  Input,
  Button,
  Typography,
  notification,
  theme,
  Card,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthService } from "../services/AuthService";
import { setAuthStatus } from "../AuthSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { useEffect } from "react";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { changePassword } = useAuthService(t);
  const [form] = Form.useForm();
  const status = useSelector((state: RootState) => state.auth.status);

  const email: string = state?.email ?? "";
  const otp: string = state?.otp ?? "";

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (!email || !otp) {
      notification.error({
        message: t("resetPassword.noDataTitle"),
        description: t("resetPassword.noData"),
        placement: "topRight",
      });
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [email, otp, navigate, t]);

  const handleReset = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: t("resetPassword.failedTitle"),
        description: t("resetPassword.passwordsMismatch"),
        placement: "topRight",
      });
      return;
    }

    try {
      dispatch(setAuthStatus("loading"));
      await changePassword({
        newPassword: values.password,
        otp: "",
        user_id: "",
      });
      notification.success({
        message: t("resetPassword.successTitle"),
        description: t("resetPassword.success"),
        placement: "topRight",
      });
      navigate("/auth/login", { replace: true });
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("resetPassword.failedTitle"),
        description: err?.response?.data?.message ?? t("resetPassword.failed"),
        placement: "topRight",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
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
          {t("resetPassword.title")}
        </Title>
        <Text
          className="text-center block mb-6"
          style={{ color: colorTextBase }}
        >
          {t("resetPassword.description")}
        </Text>
        <Form form={form} layout="vertical" onFinish={handleReset}>
          <Form.Item
            label={t("resetPassword.newPassword")}
            name="password"
            rules={[
              {
                required: true,
                message: t("resetPassword.newPasswordRequired"),
              },
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
            label={t("resetPassword.confirmPassword")}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("resetPassword.confirmPasswordRequired"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("resetPassword.passwordsMismatch"))
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
              loading={status === "loading"}
              disabled={status === "loading"}
              className="rounded-md"
            >
              {t("resetPassword.submit")}
            </Button>
          </Form.Item>
          <div className="flex justify-center mt-4">
            <Button
              type="link"
              onClick={() => navigate("/auth/login")}
              style={{ color: colorPrimary }}
            >
              {t("resetPassword.toLogin")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form, Input, Typography, theme } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../../app/store";
import { resetPasswordThunk } from "../AuthSlice";

const { Title, Text } = Typography;

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const status = useSelector((state: RootState) => state.auth.status);
  const [form] = Form.useForm();

  const email = state?.email;
  const otp = state?.otp;

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (!email || !otp) {
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  const handleSubmit = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: [t("reset.passwordsMismatch")],
        },
      ]);
      return;
    }

    dispatch(
      resetPasswordThunk(
        t,
        {
          otp,
          newPassword: values.newPassword,
          email,
        },

        () => navigate("/auth/login", { replace: true })
      )
    );
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
          {t("reset.title")}
        </Title>
        <Text className="text-center block mb-6">
          {t("reset.description", { email })}
        </Text>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="newPassword"
            label={t("reset.newPassword")}
            rules={[{ required: true, message: t("reset.passwordRequired") }]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={t("reset.confirmPassword")}
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: t("reset.confirmPasswordRequired") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("reset.passwordsMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={status === "loading"}
            >
              {t("reset.submit")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;

import { useEffect } from "react";
import { Button, Card, Form, Input, Typography, theme } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import type { LoginRequestDTO } from "../dto/LoginRequestDTO";
import { loginThunk } from "../AuthSlice";
import { setNavigate } from "../../../api/AxiosIntance";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  useEffect(() => {
    setNavigate(navigate);
    return () => {
      setNavigate(() => {});
    };
  }, [navigate]);

  const onFinish = async (values: LoginRequestDTO) => {
    if (status === "loading") return;
    dispatch(loginThunk(values));
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

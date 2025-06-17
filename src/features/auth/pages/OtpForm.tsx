import { useState, useEffect } from "react";
import {
  Flex,
  Typography,
  Button,
  Card,
  Form,
  notification,
  theme,
} from "antd";
import Otp from "antd/es/input/OTP";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../app/store";

import { sendOtp, setAuthStatus, verifyOtpThunk } from "../AuthSlice";
import type { UserRegisterDTO } from "../dto/VerifyOtpRequestDTO";

const { Title, Text } = Typography;
const OTP_COUNTDOWN_SECONDS = 60;

const OtpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const status = useSelector((s: RootState) => s.auth.status);
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_SECONDS);
  const [otp, setOtp] = useState("");

  const user: UserRegisterDTO | undefined = state?.user;
  const email: string = user?.email ?? "";
  const flowType = state?.flowType ?? "register";
  const otpCountdownStart = state?.otpCountdownStart ?? Date.now();

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (!user || !email) {
      notification.error({
        message: t("otp.noEmailTitle"),
        description: t("otp.noEmail"),
      });
      navigate("/auth/register", { replace: true });
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - otpCountdownStart) / 1000);
      const remaining = OTP_COUNTDOWN_SECONDS - elapsed;
      setCountdown(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [user, email, otpCountdownStart, navigate, t]);

  const handleSubmit = () => {
    if (status === "loading" || otp.length !== 6 || !user) return;

    dispatch(
      verifyOtpThunk(
        { user, otp },
        t,
        flowType,
        (access_token, verifiedUser) => {
          if (flowType === "register") {
            navigate("/", { replace: true });
          } else {
            navigate("/auth/reset-password", {
              replace: true,
              state: { email, otp },
            });
          }
        }
      )
    );
  };

  const handleResendOtp = async () => {
    if (status === "loading" || countdown > 0 || !email) return;

    try {
      dispatch(setAuthStatus("loading"));
      dispatch(sendOtp(t,email));
      notification.success({
        message: t("otp.resendSuccessTitle"),
        description: t("otp.resendSuccess"),
      });
      setCountdown(OTP_COUNTDOWN_SECONDS);
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("otp.resendFailedTitle"),
        description: t("otp.resendFailed"),
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
          {t(
            flowType === "register"
              ? "otp.titleRegister"
              : "otp.titleForgotPassword"
          )}
        </Title>
        <Text className="text-center block mb-6">
          {t("otp.description", { email })}
        </Text>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="otp"
            rules={[{ required: true, message: t("otp.required") }]}
            style={{ marginBottom: 24 }}
          >
            <Flex justify="center">
              <Otp
                onChange={(val) => setOtp(val.toUpperCase())}
                value={otp}
                length={6}
                disabled={status === "loading"}
                formatter={(str) => str.toUpperCase()}
                style={{ display: "flex", gap: 8 }}
              />
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={status === "loading"}
              disabled={status === "loading" || otp.length !== 6}
              className="rounded-md"
            >
              {t("otp.submit")}
            </Button>
          </Form.Item>
          <Flex justify="center" style={{ marginTop: 16 }}>
            <Button
              type="link"
              onClick={handleResendOtp}
              disabled={countdown > 0 || status === "loading"}
              style={{
                color: countdown > 0 ? colorTextBase : colorPrimary,
                fontWeight: countdown > 0 ? 400 : 500,
              }}
            >
              {countdown > 0
                ? t("otp.resendCountdown", { seconds: countdown })
                : t("otp.resend")}
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default OtpForm;

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
import Otp, { type OTPProps } from "antd/es/input/OTP";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthService } from "../services/AuthService";
import { registerSuccess, setAuthStatus } from "../AuthSlice";
import type { RootState, AppDispatch } from "../../../app/store";
import { getErrorMessage } from "../../../utils/errorUtil";
import type { UserRegisterDTO } from "../dto/VerifyRequestDTO";

const { Title, Text } = Typography;

const OTP_COUNTDOWN_SECONDS = 60;

const OtpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { verifyOtp, sendOtp, registerUser } = useAuthService(t);
  const status = useSelector((state: RootState) => state.auth.status);
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_SECONDS);
  const [otp, setOtp] = useState("");

  const user: UserRegisterDTO | undefined = state?.user;
  const email: string = user?.email ?? "";
  const flowType: string = state?.flowType ?? "register";
  const otpCountdownStart = state?.otpCountdownStart ?? Date.now();

  const {
    token: { colorBgContainer, colorTextBase, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (!user || !email) {
      notification.error({
        message: t("otp.noEmailTitle"),
        description: t("otp.noEmail"),
        placement: "topLeft",
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

  const onChange: OTPProps["onChange"] = (text) => {
    setOtp(text.toUpperCase());
  };

  const handleSubmit = async () => {
    if (status === "loading" || !user || !otp || otp.length !== 6) return;

    try {
      dispatch(setAuthStatus("loading"));
      const payload = { user, otp };
      const { success } = await verifyOtp(payload);

      if (success) {
        if (flowType === "register") {
          const registerPayload = {
            email: user.email,
            username: user.username,
            password: user.password,
          };
          const { access_token, user: registeredUser } = await registerUser(
            registerPayload
          );
          dispatch(
            registerSuccess({ user: registeredUser, token: access_token })
          );
          notification.success({
            message: t("otp.successTitle"),
            description: t("otp.successRegister"),
            placement: "topRight",
          });
          navigate("/", { replace: true });
        } else if (flowType === "forgot-password") {
          notification.success({
            message: t("otp.successTitle"),
            description: t("otp.successForgotPassword"),
            placement: "topRight",
          });
          navigate("/auth/reset-password", {
            state: { email, otp },
            replace: true,
          });
        }
      }
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("otp.failedTitle"),
        description: getErrorMessage(err, t),
        placement: "topRight",
      });
    }
  };

  const handleResendOtp = async () => {
    if (status === "loading" || countdown > 0) return;

    try {
      dispatch(setAuthStatus("loading"));
      if (!email) {
        throw new Error(t("otp.noEmail"));
      }
      await sendOtp(email);
      notification.success({
        message: t("otp.resendSuccessTitle"),
        description: t("otp.resendSuccess"),
        placement: "topRight",
      });
      setCountdown(OTP_COUNTDOWN_SECONDS);
      navigate("/auth/verify-otp", {
        state: {
          user,
          otpCountdownStart: Date.now(),
          flowType,
        },
        replace: true,
      });
    } catch (err: any) {
      dispatch(setAuthStatus("failed"));
      notification.error({
        message: t("otp.resendFailedTitle"),
        description: getErrorMessage(err, t),
        placement: "topLeft",
      });
    }
  };

  const sharedProps: OTPProps = {
    onChange,
    length: 6,
    value: otp,
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
        <Text
          className="text-center block mb-6"
          style={{ color: colorTextBase }}
        >
          {t("otp.description", { email })}
        </Text>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="otp"
            rules={[{ required: true, message: t("otp.required") }]}
            style={{ marginBottom: 24 }}
          >
            <Flex justify="center" align="center">
              <Otp
                {...sharedProps}
                formatter={(str) => str.toUpperCase()}
                disabled={status === "loading"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                }}
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
          <Flex justify="center" align="center" style={{ marginTop: 16 }}>
            <Button
              type="link"
              onClick={handleResendOtp}
              disabled={countdown > 0 || status === "loading"}
              style={{
                color: countdown > 0 ? colorTextBase : colorPrimary,
                fontWeight: countdown > 0 ? 400 : 500,
                transition: "all 0.3s",
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

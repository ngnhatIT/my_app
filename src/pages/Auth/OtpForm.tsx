import { Flex, Typography, Button } from "antd";
import Otp, { type OTPProps } from "antd/es/input/OTP";

const { Title } = Typography;

const OtpForm = () => {
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("OTP entered:", text);
  };

  const handleSubmit = () => {
    console.log("Submitting OTP...");
  };

  const sharedProps: OTPProps = {
    onChange,
    length: 6,
  };

  return (
    <form
      aria-label="OTP input form for password reset"
      style={{
        backgroundColor: "#1a1a2e",
        padding: "20px",
        borderRadius: "8px",
        color: "#fff",
      }}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        handleSubmit();
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#fff" }}>
        Quên mật khẩu
      </Title>
      <p style={{ textAlign: "center", color: "#ccc", marginBottom: "20px" }}>
        Nhập OTP đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
      </p>
      <Flex justify="center" align="center" vertical>
        <Otp
          {...sharedProps}
          formatter={(str) => str.toUpperCase()}
          style={{ marginBottom: "20px" }}
        />
        <Button
          type="primary"
          style={{
            width: "100%",
            backgroundColor: "#3a86ff",
            borderColor: "#3a86ff",
          }}
          onClick={handleSubmit}
        >
          Gửi OTP
        </Button>
      </Flex>
    </form>
  );
};

export default OtpForm;

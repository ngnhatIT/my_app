import { Flex, Typography, Button, theme } from "antd";
import Otp, { type OTPProps } from "antd/es/input/OTP";

const { Title } = Typography;

const OtpForm = () => {
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

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
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="p-6 rounded-md shadow-md max-w-md w-full mx-auto mt-10"
      style={{ background: colorBgContainer, color: colorTextBase }}
    >
      <Title level={3} className="text-center">
        Nhập mã OTP
      </Title>
      <p className="text-center mb-4">
        Vui lòng nhập mã OTP bạn đã nhận được.
      </p>
      <Flex justify="center" align="center" vertical>
        <Otp
          {...sharedProps}
          formatter={(str) => str.toUpperCase()}
          style={{ marginBottom: "20px" }}
        />
        <Button type="primary" htmlType="submit" block>
          Gửi mã xác nhận
        </Button>
      </Flex>
    </form>
  );
};

export default OtpForm;

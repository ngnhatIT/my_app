import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import store, { type RootState } from "../store";
import { useEffect } from "react";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: { name: string };
}

const Login: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const fakeResponseData: LoginResponse = {
        token: "fake_jwt_token_12345",
        user: { name: values.username || "Test User" }, // Tên user có thể lấy từ username đã nhập
      };

      const { token, user } = fakeResponseData;
      dispatch(login({ token, user }));
      message.success("Login successful!");
      console.log("After dispatch(login): isAuthenticated should be true");
      console.log(
        "After dispatch(login): isAuthenticated should be true, current state:",
        store.getState()
      );
    } catch (error: any) {
      message.error(
        "Login failed: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

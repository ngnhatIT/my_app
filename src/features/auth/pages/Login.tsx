import React from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import "../../../css/button.css"; // Bạn đã có class "button-primary"

export const Login = () => {
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-2 text-white">Login</h2>
      <p className="text-sm mb-8 text-pink-300">
        Don’t have an account?{" "}
        <a href="#" className="text-pink-400 font-medium">
          Register
        </a>
      </p>

      <Form layout="vertical" onFinish={(v) => console.log(v)}>
        <Form.Item
          label={<span className="text-white">Username *</span>}
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            className="rounded-xl text-white placeholder:text-white/40"
            style={{
              background: "rgba(26,0,48,0.7)",
              border: "1px solid #a855f7",
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white">Password *</span>}
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="rounded-xl text-white placeholder:text-white/40"
            style={{
              background: "rgba(26,0,48,0.7)",
              border: "1px solid #a855f7",
            }}
          />
        </Form.Item>

        <div className="text-sm mb-5 text-right">
          <a href="#" className="text-blue-400 hover:text-blue-500">
            Forgot password?
          </a>
        </div>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            className="w-full h-12 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg border-none hover:opacity-90"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

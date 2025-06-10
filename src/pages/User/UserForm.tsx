import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Select,
  Breadcrumb,
} from "antd";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface User {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  password?: string;
  confirmPassword?: string;
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const roles = ["Admin", "Manager", "User"];

  useEffect(() => {
    if (userId) {
      setIsEditing(true);
      const user = {
        id: Number(userId),
        firstname: "Nguyễn",
        lastname: "Khánh Nhật",
        username: "nhat123",
        email: "nhat@gmail.com",
        role: "Admin",
      };
      form.setFieldsValue(user);
    } else {
      setIsNewUser(true);
      form.setFieldsValue({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        role: "",
      });
    }
  }, [userId, form]);

  const onFinish = (values: User) => {
    if (isNewUser && values.password !== values.confirmPassword) {
      message.error("Mật khẩu không khớp!");
      return;
    }
    const currentDate = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    console.log("Submit user:", {
      ...values,
      createdAt: isNewUser ? currentDate : undefined,
      updatedAt: isEditing ? currentDate : undefined,
    });
    message.success(
      `${isEditing ? "Cập nhật" : "Thêm"} người dùng thành công!`
    );
    navigate("/users");
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Vui lòng kiểm tra lại các trường nhập liệu!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Breadcrumb
        className="mb-4"
        items={[
          { title: <HomeOutlined />, href: "/" },
          { title: <Link to="/users">User Management</Link> },
          { title: isEditing ? "Edit User" : "Add User" },
        ]}
      />
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 justify-center mt-4">
        <Title level={3} className="text-center mb-6 text-gray-900">
          {isEditing ? "Chỉnh sửa Người dùng" : "Thêm Người dùng"}
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              label="Họ"
              name="lastname"
              rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
            >
              <Input placeholder="Nhập họ" size="large" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="firstname"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Nhập tên" size="large" className="w-full" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới!",
                },
                { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
              ]}
            >
              <Input
                placeholder="Nhập tên đăng nhập"
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Nhập email" size="large" className="w-full" />
            </Form.Item>
          </div>
          <Form.Item
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
            className="col-span-full"
          >
            <Select placeholder="Chọn vai trò" size="large" className="w-full">
              {roles.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {isNewUser && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  size="large"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  className="w-full"
                />
              </Form.Item>
            </div>
          )}
          <Form.Item className="col-span-full">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;

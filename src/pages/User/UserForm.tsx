import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
}

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const [isEditing, setIsEditing] = useState(false);

  // Mock roles
  const roles = ["Admin", "Moderator", "User"];

  useEffect(() => {
    if (userId) {
      setIsEditing(true);
      // Mock data cho chỉnh sửa (thay bằng API trong thực tế)
      const user = {
        id: Number(userId),
        name: "Nguyen Van A",
        email: "a@example.com",
        role: "Admin",
      };
      form.setFieldsValue(user);
    }
  }, [userId, form]);

  const onFinish = (values: User) => {
    console.log("Submit user:", values);
    message.success(
      `${isEditing ? "Cập nhật" : "Thêm"} người dùng thành công!`
    );
    navigate("/users");
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Vui lòng kiểm tra lại các trường nhập liệu!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800">
        <Title
          level={3}
          className="text-center mb-6 text-gray-900 dark:text-gray-100"
        >
          {isEditing ? "Chỉnh sửa Người dùng" : "Thêm Người dùng"}
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ name: "", email: "", role: "" }}
          className="space-y-4"
        >
          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Tên <span className="text-red-500">*</span>
              </span>
            }
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Nhập tên" size="large" className="w-full" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Email <span className="text-red-500">*</span>
              </span>
            }
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

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Vai trò <span className="text-red-500">*</span>
              </span>
            }
            name="role"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò" size="large" className="w-full">
              {roles.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
            >
              {isEditing ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>

          <Button
            type="default"
            size="large"
            block
            onClick={() => navigate("/users")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
          >
            <ArrowLeftOutlined className="mr-2" /> Quay lại
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;

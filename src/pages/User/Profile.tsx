import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Mock data cho người dùng hiện tại
  const initialValues = { name: "Nguyen Van A", email: "a@example.com" };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form]);

  const onFinish = (values: any) => {
    console.log("Update profile:", values);
    message.success("Cập nhật hồ sơ thành công!");
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
          Hồ sơ Cá nhân
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initialValues}
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
            <Input
              placeholder="Nhập email"
              size="large"
              className="w-full"
              disabled
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
            >
              Cập nhật
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

export default Profile;

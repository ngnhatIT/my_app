import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const WorkspaceChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId?: string }>();

  const onFinish = (values: any) => {
    console.log(`Change password for workspace ${workspaceId}:`, values);
    message.success("Đổi mật khẩu thành công!");
    navigate("/workspaces");
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
          Đổi mật khẩu Workspace
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Mật khẩu cũ <span className="text-red-500">*</span>
              </span>
            }
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu cũ" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Mật khẩu mới <span className="text-red-500">*</span>
              </span>
            }
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </span>
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>

          <Button
            type="default"
            size="large"
            block
            onClick={() => navigate("/workspaces")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
          >
            <ArrowLeftOutlined className="mr-2" /> Quay lại
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default WorkspaceChangePassword;

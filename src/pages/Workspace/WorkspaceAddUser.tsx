import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Select,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";

const { Title } = Typography;

interface UserOption {
  label: string;
  value: string;
}

const WorkspaceAddUser: React.FC = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId?: string }>();
  const [form] = Form.useForm();
  const [userOptions, setUserOptions] = useState<UserOption[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearchUser = useMemo(
    () =>
      debounce((value: string) => {
        setLoadingUsers(true);
        setTimeout(() => {
          const mockResults = [
            "david@example.com",
            "eve@example.com",
            "frank@example.com",
          ]
            .filter((email) =>
              email.toLowerCase().includes(value.toLowerCase())
            )
            .map((email) => ({ label: email, value: email }));
          setUserOptions(mockResults);
          setLoadingUsers(false);
        }, 500);
      }, 300),
    []
  );

  const handleSearchUser = useCallback(
    (value: string) => {
      if (value) {
        debouncedSearchUser(value);
      } else {
        setUserOptions([]);
      }
    },
    [debouncedSearchUser]
  );

  const onFinish = (values: any) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(
        `Adding user ${values.userEmail} to workspace ${workspaceId}`
      );
      message.success("Thêm người dùng thành công!");
      setIsSubmitting(false);
      navigate("/workspaces");
    }, 1000); // Giả lập API call
  };

  const onFinishFailed = () => {
    message.error("Vui lòng kiểm tra lại các trường nhập liệu!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white dark:bg-gray-800">
        <Title
          level={3}
          className="text-center mb-6 text-gray-900 dark:text-gray-100"
        >
          Thêm người dùng vào Workspace
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label={
              <span className="text-gray-700 dark:text-gray-300">
                Email người dùng <span className="text-red-500">*</span>
              </span>
            }
            name="userEmail"
            rules={[{ required: true, message: "Vui lòng chọn người dùng!" }]}
          >
            <Select
              showSearch
              placeholder="Tìm người dùng..."
              onSearch={handleSearchUser}
              filterOption={false}
              notFoundContent={
                loadingUsers ? <Spin size="small" /> : "Không tìm thấy"
              }
              options={userOptions}
              size="large"
              className="w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
              icon={isSubmitting ? <LoadingOutlined /> : null}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang thêm..." : "Thêm người dùng"}
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

export default WorkspaceAddUser;


import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface UserOption {
  label: string;
  value: string;
}

const WorkspaceForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [ownerOptions, setOwnerOptions] = useState<UserOption[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Mock API search users
  const handleSearchUser = (value: string) => {
    setLoadingUsers(true);
    setTimeout(() => {
      const mockResults = ["alice@example.com", "bob@example.com", "carol@example.com"]
        .filter((email) => email.includes(value.toLowerCase()))
        .map((email) => ({ label: email, value: email }));
      setOwnerOptions(mockResults);
      setLoadingUsers(false);
    }, 500);
  };

  const onFinish = (values: any) => {
    console.log("Submit workspace:", values);
    message.success("Đã thêm Workspace thành công!");
    navigate("/workspaces");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-md rounded-lg">
        <Title level={3} className="text-center mb-6">Tạo Workspace mới</Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ name: "", description: "" }}
        >
          <Form.Item
            label="Tên Workspace"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên workspace!" }]}
          >
            <Input placeholder="VD: Nhóm thiết kế UX" size="large" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ max: 200, message: "Mô tả không quá 200 ký tự!" }]}
          >
            <Input.TextArea placeholder="Nhập mô tả (tuỳ chọn)" autoSize={{ minRows: 3 }} />
          </Form.Item>

          <Form.Item
            label="Người tạo (Owner)"
            name="owner"
            rules={[{ required: true, message: "Vui lòng chọn người tạo!" }]}
          >
            <Select
              showSearch
              placeholder="Tìm theo email..."
              onSearch={handleSearchUser}
              filterOption={false}
              notFoundContent={loadingUsers ? <Spin size="small" /> : "Không tìm thấy"}
              options={ownerOptions}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu Workspace"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu bảo vệ" />
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
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Tạo Workspace
            </Button>
          </Form.Item>

          <Button type="link" onClick={() => navigate("/workspaces")} block>
            ← Quay lại danh sách
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default WorkspaceForm;
